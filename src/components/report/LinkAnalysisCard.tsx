import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LinkAnalysisResult } from "@/lib/analysis";
import { ShieldCheck, Info } from "lucide-react";
import { RiskIndicator } from "./RiskIndicator";

interface LinkAnalysisCardProps {
    evaluation: {
        riskLevel: 'Baixo' | 'Médio' | 'Alto';
        potentialImpact: string;
        riskProbability: string;
        heuristicScore: number;
    };
    heuristic: {
        riskFactors: string[];
    }
}

export function LinkAnalysisCard({ evaluation, heuristic }: LinkAnalysisCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Avaliação de Segurança
        </CardTitle>
        <CardDescription>Esta é a interpretação dos dados coletados, baseada em heurísticas e padrões de risco.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Classificação de Risco</p>
            <RiskIndicator risk={evaluation.riskLevel} size="lg" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Impacto Potencial</p>
                <p className="font-semibold text-base">{evaluation.potentialImpact}</p>
            </div>
             <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Probabilidade de Risco</p>
                <p className="font-semibold text-base">{evaluation.riskProbability}</p>
            </div>
        </div>
        <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Fatores de Risco Detectados</p>
            {heuristic.riskFactors.length === 0 || (heuristic.riskFactors.length === 1 && heuristic.riskFactors[0].includes("Nenhum indicador")) ? (
                 <div className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-lg bg-green-500/10">
                    <Info className="h-4 w-4 shrink-0 mt-0.5 text-green-500" />
                    <p>Nenhum indicador de risco significativo foi encontrado na análise heurística. A pontuação baixa sugere conformidade com as boas práticas básicas.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                {heuristic.riskFactors.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                    <div className="shrink-0 mt-0.5">
                        <Info className="h-4 w-4 text-amber-500" aria-hidden="true" />
                    </div>
                    <span>{reason}</span>
                    </li>
                ))}
                </ul>
            )}
        </div>
        <div className="text-xs text-muted-foreground italic">
            <p>A pontuação de risco (de 0 a 10) reflete a quantidade e a severidade dos fatores de risco detectados. Uma pontuação alta indica a presença de múltiplos padrões comumente associados a atividades maliciosas.</p>
        </div>
      </CardContent>
    </Card>
  );
}
