import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteAnalysisResult } from "@/lib/analysis";
import { Server } from "lucide-react";
import { AnalysisDetailRow } from "./AnalysisDetailRow";

interface SiteAnalysisCardProps {
  result: SiteAnalysisResult;
}

function renderHeaderValue(value: string | boolean) {
    if (typeof value === 'boolean') {
        return value ? 'Presente' : 'Ausente';
    }
    // Return a snippet for long policies
    if (value.length > 30) {
        return `Presente (${value.substring(0,30)}...)`
    }
    return `Presente (${value})`;
}

export function SiteAnalysisCard({ result }: SiteAnalysisCardProps) {
  if (result.error) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Análise do Site
                </CardTitle>
                <CardDescription>
                    Detalhes técnicos da conexão com o servidor.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center p-8 bg-destructive/10 text-destructive rounded-lg h-full flex items-center justify-center">
                    <p className="font-semibold">{result.error}</p>
                </div>
            </CardContent>
        </Card>
    )
  }
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Análise Técnica do Servidor
        </CardTitle>
        <CardDescription>
          Dados brutos coletados a partir da conexão com o site.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <AnalysisDetailRow 
          label="Status HTTP" 
          value={result.status ? `${result.status}` : 'N/A'}
          status={result.status ? (result.status >= 200 && result.status < 400 ? 'good' : 'bad') : 'bad'}
        />
        <AnalysisDetailRow 
          label="Tempo de Resposta" 
          value={result.responseTime ? `${result.responseTime} ms` : 'N/A'}
          status={result.responseTime ? (result.responseTime < 1000 ? 'good' : 'neutral') : 'bad'}
        />
        <AnalysisDetailRow 
          label="HTTPS Ativo" 
          value={result.isHttps ? 'Sim' : 'Não'}
          status={result.isHttps ? 'good' : 'bad'}
        />
         <AnalysisDetailRow 
          label="Certificado SSL Válido" 
          value={result.isSslValid === null ? 'Indeterminado' : result.isSslValid ? 'Sim' : 'Não'}
          status={result.isSslValid === null ? 'neutral' : result.isSslValid ? 'good' : 'bad'}
        />
        <AnalysisDetailRow 
          label="Houve Redirecionamento" 
          value={result.redirected ? `Sim, para ${result.finalUrl}` : 'Não'}
          status={result.redirected ? 'neutral' : 'good'}
        />
        <div className="px-1 pt-6 pb-2">
            <h3 className="text-md font-semibold">Cabeçalhos de Segurança</h3>
            <p className="text-xs text-muted-foreground mt-1">
                A ausência destes cabeçalhos não é um indicador de fraude, mas representa uma oportunidade de melhoria na segurança do site contra certos tipos de ataque.
            </p>
        </div>
        <AnalysisDetailRow 
          label="Content-Security-Policy" 
          value={renderHeaderValue(result.securityHeaders.csp)}
          status={result.securityHeaders.csp ? 'good' : 'neutral'}
        />
        <AnalysisDetailRow 
          label="X-Frame-Options" 
          value={renderHeaderValue(result.securityHeaders.xfo)}
          status={result.securityHeaders.xfo ? 'good' : 'neutral'}
        />
        <AnalysisDetailRow 
          label="X-Content-Type-Options" 
          value={renderHeaderValue(result.securityHeaders.xcto)}
          status={result.securityHeaders.xcto ? 'good' : 'neutral'}
        />
      </CardContent>
    </Card>
  );
}
