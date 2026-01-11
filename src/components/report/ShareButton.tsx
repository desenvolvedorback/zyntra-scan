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
    const analysisDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    let report = `**DOSSIÊ DE ANÁLISE DE RISCO — ZYNTRA SCAN**\n\n`;
    report += `--- \n\n`;
    report += `**ID da Análise:** ${analysisId}\n`;
    report += `**Data/Hora da Análise:** ${analysisDate} (Horário de Brasília)\n`;
    report += `**URL Alvo:** ${reportData.url}\n\n`;

    report += `**SUMÁRIO EXECUTIVO**\n`;
    report += `- **Nível de Risco Avaliado:** ${reportData.risk}\n`;
    report += `- **Pontuação Heurística:** ${reportData.score}/10\n`;
    report += `- **Conclusão:** Baseado em análise passiva e heurística, a URL apresenta risco **${reportData.risk.toUpperCase()}**. As evidências detalhadas estão listadas abaixo.\n\n`;

    if(reportData.risk !== 'Baixo') {
        report += `**EVIDÊNCIAS HEURÍSTICAS (Padrões de Risco)**\n`;
        reportData.reasons.forEach(reason => {
            report += `- ${reason}\n`;
        });
        report += `\n`;
    }

    if(reportData.siteAnalysis.status) {
        report += `**EVIDÊNCIAS TÉCNICAS (Coleta Passiva)**\n`;
        report += `- **Status do Servidor:** ${reportData.siteAnalysis.status} (Operacional)\n`;
        report += `- **Conexão Segura (HTTPS):** ${reportData.siteAnalysis.isHttps ? 'Sim' : 'Não'}\n`;
        report += `- **Validade do Certificado SSL:** ${reportData.siteAnalysis.isSslValid === null ? 'Indeterminado' : reportData.siteAnalysis.isSslValid ? 'Válido' : 'Inválido ou Expirado'}\n`;
        report += `- **Redirecionamento Detectado:** ${reportData.siteAnalysis.redirected ? `Sim, para ${reportData.siteAnalysis.finalUrl}` : 'Não'}\n`;
        report += `- **Cabeçalho CSP (Content-Security-Policy):** ${reportData.siteAnalysis.securityHeaders.csp ? 'Presente' : 'Ausente'}\n`;
        report += `- **Cabeçalho XFO (X-Frame-Options):** ${reportData.siteAnalysis.securityHeaders.xfo ? 'Presente' : 'Ausente'}\n`;
        report += `- **Cabeçalho XCTO (X-Content-Type-Options):** ${reportData.siteAnalysis.securityHeaders.xcto ? 'Presente' : 'Ausente'}\n\n`;
    } else {
        report += `**EVIDÊNCIAS TÉCNICAS (Coleta Passiva)**\n`;
        report += `- **Status do Servidor:** Falha na conexão (${reportData.siteAnalysis.error})\n\n`;
    }

    report += `--- \n\n`;
    report += `**AVISO LEGAL:** Este relatório foi gerado pelo Zyntra Scan (https://zyntra-scan.onrender.com) e reflete os dados coletados de forma passiva no momento da análise. A avaliação de risco é baseada em heurísticas e não constitui um veredito final sobre a natureza do site. Este documento serve como um conjunto de evidências para apoiar uma decisão informada e pode ser usado como parte de uma denúncia formal a autoridades competentes.`;

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
