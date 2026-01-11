export type SiteAnalysisResult = {
  status: number | null;
  responseTime: number | null;
  isHttps: boolean;
  isSslValid: boolean | null; // null if request fails for other reasons
  securityHeaders: {
    csp: string | boolean;
    xfo: string | boolean;
    xcto: string | boolean;
  };
  redirected: boolean;
  finalUrl: string;
  error?: string;
};

export type LinkAnalysisResult = {
  risk: 'Baixo' | 'Médio' | 'Alto';
  score: number;
  reasons: string[];
};

export const getImpactAndProbability = (riskLevel: 'Baixo' | 'Médio' | 'Alto') => {
    switch (riskLevel) {
        case 'Alto':
            return { impact: "Alto", probability: "Alta" };
        case 'Médio':
            return { impact: "Médio", probability: "Média" };
        case 'Baixo':
        default:
            return { impact: "Baixo", probability: "Baixa" };
    }
};

const SUSPICIOUS_TLDS = ['.site', '.xyz', '.online', '.top', '.click', '.shop'];
const PAID_TRAFFIC_PARAMS = ['utm_', 'ttclid', 'fbclid', 'adid', 'adset', 'placement', 'campaign'];
const SUSPICIOUS_PATH_KEYWORDS = ['/of/', '/back/', '/promo/', '/confirmar/', '/pix/', '/resgatar/', '/ganhe/'];
const SHORTENER_DOMAINS = ['bit.ly', 't.co', 'goo.gl', 'tinyurl.com', 'is.gd', 'buff.ly', 'adf.ly', 'ow.ly'];

export async function analyzeSite(url: string): Promise<SiteAnalysisResult> {
  const startTime = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'ZyntraScan/1.0' }
    });
    clearTimeout(timeoutId);
    const endTime = Date.now();
    const headers = response.headers;

    return {
      status: response.status,
      responseTime: endTime - startTime,
      isHttps: new URL(response.url).protocol === 'https:',
      isSslValid: true, // If fetch succeeds with HTTPS, cert is trusted by the runtime
      securityHeaders: {
        csp: headers.get('Content-Security-Policy') || false,
        xfo: headers.get('X-Frame-Options') || false,
        xcto: headers.get('X-Content-Type-Options') || false,
      },
      redirected: response.redirected,
      finalUrl: response.url,
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    let isSslValid: boolean | null = null;
    let isHttps = false;
    try {
        isHttps = new URL(url).protocol === 'https:';
    } catch {}

    let errorMessage = "Não foi possível conectar ao site. Pode estar offline ou bloqueando análises.";
    
    if (error.name === 'AbortError') {
      errorMessage = "A requisição excedeu o tempo limite (5 segundos).";
    } else if (isHttps && error.cause?.code?.includes('CERT')) {
      isSslValid = false;
      errorMessage = "O certificado SSL é inválido ou expirado.";
    }

    return {
      status: null,
      responseTime: Date.now() - startTime,
      isHttps,
      isSslValid,
      securityHeaders: { csp: false, xfo: false, xcto: false },
      redirected: false,
      finalUrl: url,
      error: errorMessage,
    };
  }
}

export function analyzeLink(url: string, siteAnalysis: SiteAnalysisResult): LinkAnalysisResult {
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch {
    return { risk: 'Alto', score: 10, reasons: ['URL com formato inválido.']};
  }

  const reasons: string[] = [];
  let score = 0;

  // 1. TLD check
  if (SUSPICIOUS_TLDS.some(tld => urlObj.hostname.endsWith(tld))) {
    reasons.push("Uso de um domínio genérico (.site, .xyz, etc.) que é frequentemente abusado.");
    score += 2;
  }

  // 2. URL Length
  if (url.length > 200) {
    reasons.push("A URL é excessivamente longa, o que pode ser uma tática para ofuscar o link real.");
    score += 2;
  }

  // 3. Paid traffic params
  if (PAID_TRAFFIC_PARAMS.some(param => urlObj.search.includes(param))) {
    reasons.push("Presença de parâmetros de rastreamento de anúncios, comum em campanhas de phishing.");
    score += 2;
  }
  
  // 4. Missing Security Headers from siteAnalysis
  if (!siteAnalysis.securityHeaders.xfo) {
    // This is now just a minor factor, as its impact is contextualized elsewhere
    score += 0.5;
  }
  if (!siteAnalysis.securityHeaders.xcto) {
    // This is now just a minor factor, as its impact is contextualized elsewhere
    score += 0.5;
  }

  // 5. Suspicious path keywords
  const pathAndQuery = (urlObj.pathname + urlObj.search).toLowerCase();
  const foundKeywords = SUSPICIOUS_PATH_KEYWORDS.filter(keyword => pathAndQuery.includes(keyword));
  if (foundKeywords.length > 0) {
    reasons.push(`Contém palavras suspeitas no caminho da URL: ${foundKeywords.map(k=>k.replace(/\//g, '')).join(', ')}.`);
    score += 1;
  }
  
  // Previous checks
  if (siteAnalysis.redirected) {
      reasons.push("O site redireciona para outra URL, o que pode ser usado para ofuscação.");
      score += 1;
  }

  if (!siteAnalysis.isHttps) {
    reasons.push("Conexão não segura (HTTP). Informações podem ser interceptadas.");
    score += 3;
  }

  if (siteAnalysis.isSslValid === false) {
    reasons.push("O certificado SSL do site é inválido, o que é um grande sinal de alerta.");
    score += 4;
  }
  
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(urlObj.hostname)) {
    reasons.push("Uso de endereço IP direto em vez de um domínio, dificultando a identificação da fonte.");
    score += 3;
  }

  if (SHORTENER_DOMAINS.some(domain => urlObj.hostname.includes(domain))) {
    reasons.push("URL encurtada, o que pode mascarar o destino real do link.");
    score += 2;
  }

  let risk: 'Baixo' | 'Médio' | 'Alto';
  if (score <= 2) {
      risk = 'Baixo';
      if (reasons.length === 0) {
        reasons.push("Nenhum indicador de risco óbvio encontrado na análise heurística.");
      }
  } else if (score <= 5) {
      risk = 'Médio';
  } else {
      risk = 'Alto';
  }

  // Round score to avoid decimals from header checks
  const finalScore = Math.round(score);

  return { risk, score: finalScore > 10 ? 10 : finalScore, reasons };
}
