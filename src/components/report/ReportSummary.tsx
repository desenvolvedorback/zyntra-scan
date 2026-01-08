import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskIndicator } from "./RiskIndicator";
import { Globe, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportSummaryProps {
  url: string;
  risk: 'Baixo' | 'Médio' | 'Alto';
  siteStatus: number | null;
}

const riskDescription = {
    'Baixo': "Este site apresenta baixo risco com base em verificações técnicas básicas.",
    'Médio': "Este site apresenta risco moderado. Prossiga com cautela.",
    'Alto': "Este site apresenta alto risco. É recomendado não prosseguir."
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Resumo da Análise</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg">
          <Globe className="h-6 w-6 text-primary shrink-0" />
          <p className="font-mono text-lg break-all">{url}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center gap-2 p-4 bg-muted/50 rounded-lg">
             <RiskIndicator risk={risk} size="lg" />
             <p className="text-sm text-muted-foreground">{riskDescription[risk]}</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <Server className={cn("h-6 w-6 shrink-0", status.color)} />
            <span className={cn("font-semibold text-lg", status.color)}>{status.message}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
