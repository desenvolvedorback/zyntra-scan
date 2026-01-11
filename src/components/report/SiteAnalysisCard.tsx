import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteAnalysisResult } from "@/lib/analysis";
import { Server } from "lucide-react";
import { AnalysisDetailRow } from "./AnalysisDetailRow";

interface SiteAnalysisCardProps {
    result: {
        serverStatus: number | null;
        responseTime: number | null;
        isHttps: boolean;
        isSslValid: boolean | null;
        isRedirected: boolean;
        finalUrl: string;
        securityHeaders: {
            csp: string | boolean;
            xfo: string | boolean;
            xcto: string | boolean;
        };
        error?: string;
    };
}


function renderHeaderValue(value: string | boolean) {
    if (typeof value === 'boolean') {
        return value ? 'Presente' : 'Ausente';
    }
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
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Server className="h-5 w-5 text-primary" />
                    Detecções Técnicas
                </CardTitle>
                <CardDescription>
                    Estes são os dados brutos coletados da conexão com o servidor.
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
        <CardTitle className="flex items-center gap-2 text-xl">
          <Server className="h-5 w-5 text-primary" />
          Detecções Técnicas
        </CardTitle>
        <CardDescription>
          Estes são os dados brutos coletados da conexão com o servidor.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <AnalysisDetailRow 
          label="Status HTTP" 
          value={result.serverStatus ? `${result.serverStatus}` : 'N/A'}
          status={result.serverStatus ? (result.serverStatus >= 200 && result.serverStatus < 400 ? 'good' : 'bad') : 'bad'}
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
          value={result.isSslValid === null ? 'Não verificado (HTTP)' : result.isSslValid ? 'Sim' : 'Inválido/Expirado'}
          status={result.isSslValid === null ? 'neutral' : result.isSslValid ? 'good' : 'bad'}
        />
        <AnalysisDetailRow 
          label="Houve Redirecionamento" 
          value={result.isRedirected ? `Sim, para ${result.finalUrl}` : 'Não'}
          status={result.isRedirected ? 'neutral' : 'good'}
        />
        <div className="px-1 pt-6 pb-2">
            <h3 className="text-md font-semibold">Cabeçalhos de Segurança HTTP</h3>
             <p className="text-xs text-muted-foreground mt-1 italic">
                Nota: A ausência destes cabeçalhos representa uma oportunidade de melhoria na postura defensiva do site, não sendo, por si só, indicativo de comportamento malicioso.
            </p>
        </div>
        <AnalysisDetailRow 
          label="Content-Security-Policy" 
          value={renderHeaderValue(result.securityHeaders.csp)}
          status={!!result.securityHeaders.csp ? 'good' : 'info'}
        />
        <AnalysisDetailRow 
          label="X-Frame-Options" 
          value={renderHeaderValue(result.securityHeaders.xfo)}
          status={!!result.securityHeaders.xfo ? 'good' : 'info'}
        />
        <AnalysisDetailRow 
          label="X-Content-Type-Options" 
          value={renderHeaderValue(result.securityHeaders.xcto)}
          status={!!result.securityHeaders.xcto ? 'good' : 'info'}
        />
      </CardContent>
    </Card>
  );
}
