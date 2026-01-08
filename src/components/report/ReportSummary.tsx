import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskIndicator } from "./RiskIndicator";
import { Globe, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportSummaryProps {
  url: string;
  risk: 'Baixo' | 'Médio' | 'Alto';
  siteStatus: number | null;
}

const riskContent = {
    'Baixo': {
        description: "Este site apresenta baixo risco com base em verificações técnicas e heurísticas.",
        className: 'bg-green-500/10'
    },
    'Médio': {
        description: "Este site apresenta risco moderado. Prossiga com cautela e verifique a fonte.",
        className: 'bg-yellow-500/10'
    },
    'Alto': {
        description: "Este site apresenta alto risco. É altamente recomendado não prosseguir ou fornecer informações.",
        className: 'bg-red-500/10'
    }
}

export function ReportSummary({ url, risk, siteStatus }: ReportSummaryProps) {
  const getStatusMessage = () => {
    if (siteStatus === null) {
      return { message: "Offline ou inacessível", color: "text-red-500" };
    }
    if (siteStatus >= 200 && siteStatus < 300) {
      return { message: "Online e operando", color: "text-green-500" };
    }
    if (siteStatus >= 300 && siteStatus < 400) {
        return { message: "Redirecionamento", color: "text-yellow-500" };
    }
    if (siteStatus >= 400 && siteStatus < 500) {
      return { message: "Erro no cliente (ex: não encontrado)", color: "text-yellow-500" };
    }
    if (siteStatus >= 500) {
      return { message: "Erro no servidor", color: "text-red-500" };
    }
    return { message: "Status desconhecido", color: "text-muted-foreground" };
  };

  const status = getStatusMessage();
  const content = riskContent[risk];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Resumo da Análise</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-start sm:items-center gap-4 bg-muted/50 p-4 rounded-lg">
          <Globe className="h-6 w-6 text-primary shrink-0 mt-1 sm:mt-0" />
          <p className="font-mono text-base sm:text-lg break-all">{url}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={cn("flex flex-col justify-center gap-2 p-4 rounded-lg", content.className)}>
             <RiskIndicator risk={risk} size="lg" />
             <p className="text-sm text-foreground/80">{content.description}</p>
             {risk === 'Alto' && (
                <p className="text-xs text-foreground/60 mt-2">
                    Sites de phishing modernos podem usar HTTPS e certificados válidos. Esta análise considera também padrões comportamentais comuns em golpes.
                </p>
             )}
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Server className={cn("h-6 w-6 shrink-0", status.color)} />
            <span className={cn("font-semibold text-base sm:text-lg", status.color)}>{status.message}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
