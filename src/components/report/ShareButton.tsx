"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import type { SiteAnalysisResult, LinkAnalysisResult } from "@/lib/analysis";

interface ApiReport {
    meta: {
        analysisId: string;
        reportVersion: string;
        analysisEngine: string;
        analysisTimestamp: string;
        targetUrl: string;
    };
    evaluation: {
        riskLevel: 'Baixo' | 'Médio' | 'Alto';
        potentialImpact: string;
        riskProbability: string;
        heuristicScore: number;
        trustIndicator: string;
        analysisHistory: string;
    };
    heuristicAnalysis: {
        riskFactors: string[];
    };
    technicalDetections: {
        serverStatus: number | null;
        responseTime: number | null;
        isHttps: boolean;
        isSslValid: boolean | null;
        isRedirected: boolean;
        finalUrl: string;
        securityHeaders: {
            csp: string | boolean;
            xfo: string | boolean;
            xcto: string | boolean;
        };
        error?: string;
    };
    scope: {
        summary: string;
        limitations: string[];
    };
}


interface ShareButtonProps {
  reportData: ApiReport;
}

export function ShareButton({ reportData }: ShareButtonProps) {
  const { toast } = useToast();

  const generateReportText = () => {
    const { meta, evaluation, heuristicAnalysis, technicalDetections, scope } = reportData;

    let report = `**DOSSIÊ DE ANÁLISE DE RISCO — ZYNTRA SCAN v1.0**\n\n`;
    report += `**ID da Análise:** ${meta.analysisId}\n`;
    report += `**Versão do Relatório:** ${meta.reportVersion}\n`;
    report += `**Motor de Análise:** ${meta.analysisEngine}\n`;
    report += `**Data/Hora da Análise:** ${meta.analysisTimestamp}\n`;
    report += `**URL Alvo:** ${meta.targetUrl}\n\n`;

    report += `--- \n`;
    report += `### AVALIAÇÃO DE SEGURANÇA\n\n`;
    report += `*   **Nível de Risco Avaliado:** ${evaluation.riskLevel}\n`;
    report += `*   **Impacto Potencial:** ${evaluation.potentialImpact}\n`;
    report += `*   **Probabilidade de Risco:** ${evaluation.riskProbability}\n`;
    report += `*   **Pontuação Heurística:** ${evaluation.heuristicScore}/10\n`;
    report += `*   **Zyntra Trust Indicator:** ${evaluation.trustIndicator}\n`;
    report += `*   **Histórico de Análise:** ${evaluation.analysisHistory}\n\n`;
    
    report += `**Conclusão:**\nBaseado em análise passiva e heurística, a URL apresenta um nível de risco **${evaluation.riskLevel.toUpperCase()}**. As evidências técnicas que sustentam esta avaliação estão detalhadas nas seções a seguir.\n\n`;

    report += `**Fatores de Risco (Avaliação Heurística):**\n`;
    if(evaluation.riskLevel !== 'Baixo' && heuristicAnalysis.riskFactors.length > 0) {
        heuristicAnalysis.riskFactors.forEach(reason => {
            report += `*   ${reason}\n`;
        });
        report += `\n`;
    } else {
        report += `*   Nenhum indicador de risco significativo foi encontrado.\n\n`;
    }

    report += `### DETECÇÕES TÉCNICAS (Dados Brutos Coletados)\n\n`;
    if(technicalDetections.error) {
        report += `*   **Status do Servidor:** Falha na conexão. ${technicalDetections.error}\n\n`;
    } else {
        report += `*   **Status do Servidor:** ${technicalDetections.serverStatus}\n`;
        report += `*   **Tempo de Resposta:** ${technicalDetections.responseTime} ms\n`;
        report += `*   **Conexão Segura (HTTPS):** ${technicalDetections.isHttps ? 'Sim' : 'Não'}\n`;
        report += `*   **Validade do Certificado SSL:** ${technicalDetections.isSslValid === null ? 'Não aplicável (conexão HTTP)' : technicalDetections.isSslValid ? 'Válido' : 'Inválido ou Expirado'}\n`;
        report += `*   **Redirecionamento Detectado:** ${technicalDetections.isRedirected ? `Sim, para ${technicalDetections.finalUrl}` : 'Não'}\n\n`;
        
        report += `**Cabeçalhos de Segurança HTTP:**\n`;
        report += `*   **Content-Security-Policy (CSP):** ${technicalDetections.securityHeaders.csp ? 'Presente' : 'Ausente'}\n`;
        report += `*   **X-Frame-Options (XFO):** ${technicalDetections.securityHeaders.xfo ? 'Presente' : 'Ausente'}\n`;
        report += `*   **X-Content-Type-Options (XCTO):** ${technicalDetections.securityHeaders.xcto ? 'Presente' : 'Ausente'}\n\n`;
    }
    report += `*Nota: A ausência de cabeçalhos de segurança representa uma oportunidade de melhoria na postura defensiva do site e não indica, por si só, comportamento malicioso.*\n\n`;

    report += `--- \n`;
    report += `### ESCOPO DA ANÁLISE\n\n`;
    report += `${scope.summary}\n\n`;
    report += `**Limitações:**\n`;
    scope.limitations.forEach(limitation => {
        report += `*   ${limitation}\n`;
    });
    report += `\n`;

    report += `--- \n`;
    report += `**AVISO LEGAL:**\nEste relatório foi gerado pelo Zyntra Scan (https://zyntra-scan.onrender.com) e reflete dados coletados de forma passiva no momento da análise. A avaliação de risco é baseada em heurísticas e não constitui veredito final sobre a natureza do site. Este documento serve como conjunto de evidências para apoiar decisões informadas e pode ser utilizado como parte de uma denúncia formal a autoridades competentes.\n\n`;

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
