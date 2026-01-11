import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LinkAnalysisResult } from "@/lib/analysis";
import { AlertTriangle, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { RiskIndicator } from "./RiskIndicator";
import { cn } from "@/lib/utils";

interface LinkAnalysisCardProps {
  result: LinkAnalysisResult;
}

const riskIconConfig = {
    Baixo: { icon: CheckCircle2, color: 'text-green-500' },
    Médio: { icon: AlertTriangle, color: 'text-yellow-500' },
    Alto: { icon: XCircle, color: 'text-red-500' },
}

export function LinkAnalysisCard({ result }: LinkAnalysisCardProps) {
  const Icon = riskIconConfig[result.risk].icon;
  const iconColor = riskIconConfig[result.risk].color;

  if (result.reasons.length === 1 && result.risk === 'Baixo') {
     return (
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              Análise de Risco
            </CardTitle>
             <div className="pt-2">
                <RiskIndicator risk={result.risk} />
            </div>
            <CardDescription>Pontuação de Risco: {result.score} (de 10). Uma pontuação baixa indica a ausência de indicadores de risco comuns encontrados em campanhas maliciosas.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <p>{result.reasons[0]}</p>
            </div>
          </CardContent>
        </Card>
      );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Análise de Risco Heurística
        </CardTitle>
         <div className="pt-2">
            <RiskIndicator risk={result.risk} />
        </div>
        <CardDescription>Pontuação de Risco: {result.score} (de 10). A pontuação aumenta com a quantidade e a severidade dos fatores de risco detectados, baseados em padrões de phishing e golpes.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Fatores que contribuíram para a pontuação:</p>
        <ul className="space-y-3">
          {result.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <Icon className={cn("h-5 w-5", iconColor)} aria-hidden="true" />
              </div>
              <span className="text-sm">{reason}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
