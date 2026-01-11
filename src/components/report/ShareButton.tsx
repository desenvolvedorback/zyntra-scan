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
    const analysisId = `ZS-${new Date().getTime()}`;
    const analysisDate = new Date().toUTCString();

    let report = `**DOSSIÊ DE ANÁLISE ZYNTRA SCAN**\n\n`;
    report += `--- \n\n`;
    report += `**ID da Análise:** ${analysisId}\n`;
    report += `**Data/Hora da Análise:** ${analysisDate}\n`;
    report += `**URL Alvo:** ${reportData.url}\n\n`;

    report += `**SUMÁRIO EXECUTIVO**\n`;
    report += `- **Nível de Risco:** ${reportData.risk}\n`;
    report += `- **Pontuação:** ${reportData.score}\n`;
    report += `- **Conclusão:** Baseado em análise heurística e técnica, a URL apresenta risco ${reportData.risk.toLowerCase()}.\n\n`;

    if(reportData.risk !== 'Baixo') {
        report += `**EVIDÊNCIAS (HEURÍSTICA)**\n`;
        reportData.reasons.forEach(reason => {
            report += `- ${reason}\n`;
        });
        report += `\n`;
    }

    if(reportData.siteAnalysis.status) {
        report += `**EVIDÊNCIAS (TÉCNICA)**\n`;
        report += `- Status do Servidor: ${reportData.siteAnalysis.status}\n`
        report += `- Conexão Segura (HTTPS): ${reportData.siteAnalysis.isHttps ? 'Sim' : 'Não'}\n`;
        report += `- Validade do Certificado SSL: ${reportData.siteAnalysis.isSslValid ? 'Válido' : 'Inválido ou Indeterminado'}\n`;
        report += `- Redirecionamento: ${reportData.siteAnalysis.redirected ? `Sim, para ${reportData.siteAnalysis.finalUrl}` : 'Não'}\n`;
        report += `- Cabeçalho CSP: ${reportData.siteAnalysis.securityHeaders.csp ? 'Presente' : 'Ausente'}\n`;
        report += `- Cabeçalho XFO: ${reportData.siteAnalysis.securityHeaders.xfo ? 'Presente' : 'Ausente'}\n`;
        report += `- Cabeçalho XCTO: ${reportData.siteAnalysis.securityHeaders.xcto ? 'Presente' : 'Ausente'}\n\n`;
    }

    report += `--- \n\n`;
    report += `**AVISO LEGAL:** Este relatório foi gerado pelo Zyntra Scan (https://zyntra-scan.onrender.com) e reflete os dados coletados de forma passiva no momento da análise. Não constitui um veredito final sobre a natureza do site, mas sim um conjunto de evidências para apoiar uma decisão informada.`;

    return report;
  };

  const handleShare = async () => {
    const reportText = generateReportText();
    try {
      await navigator.clipboard.writeText(reportText);
      toast({
        title: "Dossiê Copiado!",
        description: "O dossiê de análise foi copiado para a área de transferência em formato Markdown.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o dossiê. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleShare} variant="outline">
        <Share2 className="mr-2 h-4 w-4" />
        Exportar Dossiê para Denúncia
      </Button>
    </div>
  );
}
