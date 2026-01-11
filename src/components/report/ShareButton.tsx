"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import type { SiteAnalysisResult } from "@/lib/analysis";

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

  const generateReportText = () => {
    const analysisId = `ZS-${new Date().getTime()}`;
    const analysisDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const { impact, probability } = getImpactAndProbability(reportData.risk);

    let report = `**DOSSIÊ DE ANÁLISE DE RISCO — ZYNTRA SCAN**\n\n`;
    report += `--- \n\n`;
    report += `**ID da Análise:** ${analysisId}\n`;
    report += `**Data/Hora da Análise:** ${analysisDate} (Horário de Brasília, GMT-3)\n`;
    report += `**Motor de Análise:** Zyntra Scan Engine v1.0 (Heurístico)\n`;
    report += `**URL Alvo:** ${reportData.url}\n\n`;

    report += `### AVALIAÇÃO DE SEGURANÇA\n\n`;
    report += `*   **Nível de Risco Avaliado:** ${reportData.risk}\n`;
    report += `*   **Impacto Potencial:** ${impact}\n`;
    report += `*   **Probabilidade de Risco:** ${probability}\n`;
    report += `*   **Pontuação Heurística:** ${reportData.score}/10\n`;
    report += `*   **Zyntra Trust Indicator:** Estável\n`;
    report += `*   **Histórico de Análise:** Não disponível para esta análise.\n\n`;
    
    report += `**Conclusão:** Baseado em análise passiva e heurística, a URL apresenta um nível de risco **${reportData.risk.toUpperCase()}**. As evidências que sustentam esta avaliação estão detalhadas abaixo.\n\n`;

    if(reportData.risk !== 'Baixo' && reportData.reasons.length > 0) {
        report += `**Fatores de Risco (Avaliação Heurística):**\n`;
        reportData.reasons.forEach(reason => {
            report += `*   ${reason}\n`;
        });
        report += `\n`;
    } else {
        report += `**Fatores de Risco (Avaliação Heurística):**\n*   Nenhum indicador de risco significativo foi encontrado.\n\n`;
    }

    report += `### DETECÇÕES TÉCNICAS (Dados Brutos Coletados)\n\n`;
    if(reportData.siteAnalysis.status) {
        report += `*   **Status do Servidor:** ${reportData.siteAnalysis.status}\n`;
        report += `*   **Tempo de Resposta:** ${reportData.siteAnalysis.responseTime} ms\n`;
        report += `*   **Conexão Segura (HTTPS):** ${reportData.siteAnalysis.isHttps ? 'Sim' : 'Não'}\n`;
        report += `*   **Validade do Certificado SSL:** ${reportData.siteAnalysis.isSslValid === null ? 'Não verificado (conexão HTTP)' : reportData.siteAnalysis.isSslValid ? 'Válido' : 'Inválido ou Expirado'}\n`;
        report += `*   **Redirecionamento Detectado:** ${reportData.siteAnalysis.redirected ? `Sim, para ${reportData.siteAnalysis.finalUrl}` : 'Não'}\n\n`;
        
        report += `**Cabeçalhos de Segurança HTTP:**\n`;
        report += `*   **Content-Security-Policy:** ${reportData.siteAnalysis.securityHeaders.csp ? 'Presente' : 'Ausente'}\n`;
        report += `*   **X-Frame-Options:** ${reportData.siteAnalysis.securityHeaders.xfo ? 'Presente' : 'Ausente'}\n`;
        report += `*   **X-Content-Type-Options:** ${reportData.siteAnalysis.securityHeaders.xcto ? 'Presente' : 'Ausente'}\n\n`;
    } else {
        report += `*   **Status do Servidor:** Falha na conexão. ${reportData.siteAnalysis.error}\n\n`;
    }

    report += `--- \n\n`;
    report += `**ESCOPO DA ANÁLISE:**\nEste relatório é fruto de uma análise passiva de conectividade, configuração HTTPS, cabeçalhos HTTP e resposta do servidor. Nenhuma interação ativa, varredura de portas ou exploração de vulnerabilidades foi realizada.\n\n`;

    report += `**AVISO LEGAL:** Este relatório foi gerado pelo Zyntra Scan (https://zyntra-scan.onrender.com) e reflete os dados coletados de forma passiva no momento da análise. A avaliação de risco é baseada em heurísticas e não constitui um veredito final sobre a natureza do site. Este documento serve como um conjunto de evidências para apoiar uma decisão informada e pode ser usado como parte de uma denúncia formal a autoridades competentes.`;

    return report;
  };

  const handleShare = async () => {
    const reportText = generateReportText();
    try {
      await navigator.clipboard.writeText(reportText);
      toast({
        title: "Dossiê Copiado!",
        description: "O dossiê de análise foi copiado para sua área de transferência.",
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
        <Download className="mr-2 h-4 w-4" />
        Exportar Dossiê (Texto)
      </Button>
    </div>
  );
}
