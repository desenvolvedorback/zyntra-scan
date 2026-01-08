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
  reasons: string[];
};

const SUSPICIOUS_KEYWORDS = ['pix', 'resgatar', 'confirmar', 'login', 'senha', 'banco', 'credencial', 'gratis', 'premio', 'urgente'];
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
    return { risk: 'Alto', reasons: ['URL com formato inválido.']};
  }

  const reasons: string[] = [];
  let score = 0;

  // Check for direct IP usage
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(urlObj.hostname)) {
    reasons.push("Uso de endereço IP direto em vez de um domínio.");
    score += 3;
  }

  // Check for missing HTTPS
  if (!siteAnalysis.isHttps) {
    reasons.push("Conexão não segura (HTTP). Informações podem ser interceptadas.");
    score += 2;
  }

  // Check for invalid SSL cert from site analysis
  if (siteAnalysis.isSslValid === false) {
    reasons.push("O certificado SSL do site é inválido, o que é um grande sinal de alerta.");
    score += 4;
  }
  
  // Check for shortened URL
  if (SHORTENER_DOMAINS.some(domain => urlObj.hostname.includes(domain))) {
    reasons.push("URL encurtada, o que pode mascarar o destino real do link.");
    score += 2;
  }

  // Check for suspicious keywords
  const pathAndQuery = (urlObj.pathname + urlObj.search).toLowerCase();
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter(keyword => pathAndQuery.includes(keyword));
  if (foundKeywords.length > 0) {
    reasons.push(`Contém palavras suspeitas: ${foundKeywords.join(', ')}.`);
    score += foundKeywords.length;
  }
  
  // Check for redirects from site analysis
  if (siteAnalysis.redirected) {
      reasons.push("O site redireciona para outra URL, o que pode ser usado para ofuscação.");
      score += 1;
  }

  let risk: 'Baixo' | 'Médio' | 'Alto';
  if (score === 0) {
      risk = 'Baixo';
      reasons.push("Nenhum indicador de risco óbvio encontrado.");
  } else if (score <= 3) {
      risk = 'Médio';
  } else {
      risk = 'Alto';
  }

  return { risk, reasons };
}
