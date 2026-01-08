"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import type { SiteAnalysisResult, LinkAnalysisResult } from "@/lib/analysis";

interface ShareButtonProps {
  reportData: {
    url: string;
    risk: 'Baixo' | 'Médio' | 'Alto';
    score: number;
    reasons: string[];
    siteAnalysis: SiteAnalysisResult;
  };
}

export function ShareButton({ reportData }: ShareButtonProps) {
  const { toast } = useToast();

  const generateReportText = () => {
    let report = `🚨 Relatório de Análise Zyntra Scan 🚨\n\n`;
    report += `URL Analisada: ${reportData.url}\n`;
    report += `Nível de Risco: ${reportData.risk} (Pontuação: ${reportData.score})\n\n`;
    
    if(reportData.risk !== 'Baixo') {
        report += `🔍 Fatores de Risco Identificados:\n`;
        reportData.reasons.forEach(reason => {
            report += `- ${reason}\n`;
        });
        report += `\n`;
    }

    if(reportData.siteAnalysis.status) {
        report += `ℹ️ Detalhes Técnicos:\n`
        report += `- Status: ${reportData.siteAnalysis.status}\n`
        report += `- HTTPS: ${reportData.siteAnalysis.isHttps ? 'Sim' : 'Não'}\n`
        report += `- Redirecionamento: ${reportData.siteAnalysis.redirected ? 'Sim' : 'Não'}\n`;
    }

    report += `\nPara uma análise detalhada, acesse o relatório completo:\n`;
    report += `${window.location.href}\n\n`;
    report += `Zyntra Scan — Analise links antes de clicar.`;

    return report;
  };

  const handleShare = async () => {
    const reportText = generateReportText();
    try {
      await navigator.clipboard.writeText(reportText);
      toast({
        title: "Relatório Copiado!",
        description: "O resumo da análise foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o relatório. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleShare} variant="outline">
        <Share2 className="mr-2 h-4 w-4" />
        Compartilhar Análise
      </Button>
    </div>
  );
}
