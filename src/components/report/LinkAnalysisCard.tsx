import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkAnalysisResult } from "@/lib/analysis";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { RiskIndicator } from "./RiskIndicator";

interface LinkAnalysisCardProps {
  result: LinkAnalysisResult;
}

const iconMap = {
    Baixo: <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" aria-hidden="true" />,
    Médio: <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" aria-hidden="true" />,
    Alto: <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" aria-hidden="true" />,
}

export function LinkAnalysisCard({ result }: LinkAnalysisCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Análise de Link
        </CardTitle>
        <div className="pt-2">
            <RiskIndicator risk={result.risk} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Fatores considerados na avaliação de risco:</p>
        <ul className="space-y-3">
          {result.reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="shrink-0">
                {iconMap[result.risk]}
              </div>
              <span className="text-sm">{reason}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
