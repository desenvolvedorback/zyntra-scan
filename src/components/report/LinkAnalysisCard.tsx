import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LinkAnalysisResult } from "@/lib/analysis";
import { ShieldCheck, Info } from "lucide-react";
import { RiskIndicator } from "./RiskIndicator";

interface LinkAnalysisCardProps {
  result: LinkAnalysisResult;
  risk: 'Baixo' | 'Médio' | 'Alto';
}

export function LinkAnalysisCard({ result, risk }: LinkAnalysisCardProps) {
    const getImpactAndProbability = (riskLevel: 'Baixo' | 'Médio' | 'Alto') => {
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
    
    const { impact, probability } = getImpactAndProbability(risk);

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
            <RiskIndicator risk={risk} size="lg" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Impacto Potencial</p>
                <p className="font-semibold text-base">{impact}</p>
            </div>
             <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Probabilidade de Risco</p>
                <p className="font-semibold text-base">{probability}</p>
            </div>
        </div>
        <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">Fatores de Risco Detectados</p>
            {result.reasons.length === 0 || (result.reasons.length === 1 && risk === 'Baixo') ? (
                 <div className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-lg bg-green-500/10">
                    <Info className="h-4 w-4 shrink-0 mt-0.5 text-green-500" />
                    <p>Nenhum indicador de risco significativo foi encontrado na análise heurística. A pontuação baixa sugere conformidade com as boas práticas básicas.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                {result.reasons.map((reason, index) => (
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
