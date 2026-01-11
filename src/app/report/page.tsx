import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookLock, BarChart3, Clock, FileText } from 'lucide-react';
import { analyzeSite, analyzeLink, SiteAnalysisResult, LinkAnalysisResult, getImpactAndProbability } from '@/lib/analysis';
import { ReportSummary } from '@/components/report/ReportSummary';
import { LinkAnalysisCard } from '@/components/report/LinkAnalysisCard';
import { SiteAnalysisCard } from '@/components/report/SiteAnalysisCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShareButton } from '@/components/report/ShareButton';

export const metadata: Metadata = {
  title: 'Relatório de Análise - Zyntra Scan',
};

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


interface ReportPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function ReportGenerator({ url }: { url: string }) {
  const now = new Date();
  let reportData: ApiReport;
  let validationError: string | null = null;
  
  try {
    new URL(url); 
    const siteAnalysisResult = await analyzeSite(url);
    const linkAnalysisResult = analyzeLink(url, siteAnalysisResult);
    const { impact, probability } = getImpactAndProbability(linkAnalysisResult.risk);

    reportData = {
        meta: {
            analysisId: `ZS-${now.getTime()}`,
            reportVersion: "1.0",
            analysisEngine: "Zyntra Scan Engine v1.0 (Heurístico, Passivo)",
            analysisTimestamp: now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            targetUrl: url
        },
        evaluation: {
            riskLevel: linkAnalysisResult.risk,
            potentialImpact: impact,
            riskProbability: probability,
            heuristicScore: linkAnalysisResult.score,
            trustIndicator: "Estável",
            analysisHistory: "Não disponível para esta análise"
        },
        heuristicAnalysis: {
            riskFactors: linkAnalysisResult.reasons
        },
        technicalDetections: {
            serverStatus: siteAnalysisResult.status,
            responseTime: siteAnalysisResult.responseTime,
            isHttps: siteAnalysisResult.isHttps,
            isSslValid: siteAnalysisResult.isSslValid,
            isRedirected: siteAnalysisResult.redirected,
            finalUrl: siteAnalysisResult.finalUrl,
            securityHeaders: siteAnalysisResult.securityHeaders,
            error: siteAnalysisResult.error,
        },
        scope: {
            summary: "Análise passiva de conectividade, configuração HTTPS, cabeçalhos HTTP e resposta do servidor. Nenhuma interação ativa, exploração ou tentativa de intrusão foi realizada.",
            limitations: [
                "A análise reflete o estado do alvo no momento da coleta.",
                "Resultados podem variar conforme alterações no ambiente do alvo.",
                "A avaliação é heurística e não substitui auditorias completas."
            ]
        }
    };

  } catch (e) {
    validationError = "A URL fornecida é inválida.";
    // Create a dummy error report structure
    reportData = {
        meta: { analysisId: `ZS-${now.getTime()}`, reportVersion: "1.0", analysisEngine: "Zyntra Scan Engine v1.0", analysisTimestamp: now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), targetUrl: url },
        evaluation: { riskLevel: 'Alto', potentialImpact: "Alto", riskProbability: "Alta", heuristicScore: 10, trustIndicator: 'Crítico', analysisHistory: 'Não disponível' },
        heuristicAnalysis: { riskFactors: [validationError] },
        technicalDetections: { serverStatus: null, responseTime: null, isHttps: false, isSslValid: null, securityHeaders: { csp: false, xfo: false, xcto: false }, redirected: false, finalUrl: '', error: validationError, isRedirected: false },
        scope: { summary: '', limitations: [] }
    }
  }
  
  if (validationError) {
      return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-destructive">Erro na Análise</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{validationError}</p>
            </CardContent>
        </Card>
      )
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Relatório gerado em: {reportData.meta.analysisTimestamp} (Horário de Brasília)
          </p>
          <p className="text-xs text-muted-foreground">ID da Análise: {reportData.meta.analysisId}</p>
        </div>
        <ShareButton reportData={reportData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <ReportSummary url={reportData.meta.targetUrl} risk={reportData.evaluation.riskLevel} siteStatus={reportData.technicalDetections.serverStatus} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <LinkAnalysisCard evaluation={reportData.evaluation} heuristic={reportData.heuristicAnalysis} />
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      Zyntra Trust Indicator
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="font-semibold text-lg">{reportData.evaluation.trustIndicator}</p>
                  <p className="text-xs text-muted-foreground mt-1">Baseado em heurística e dados coletados no momento da análise.</p>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="h-4 w-4 text-primary" />
                      Histórico de Análise
                  </CardTitle>
              </CardHeader>
              <CardContent>
                   <p className="font-semibold text-lg">{reportData.evaluation.analysisHistory}</p>
                  <p className="text-xs text-muted-foreground mt-1">O monitoramento contínuo não está habilitado para esta URL.</p>
              </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <SiteAnalysisCard result={reportData.technicalDetections} />
           <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                    <FileText className="text-blue-400" />
                    Escopo da Análise
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {reportData.scope.summary}
                  </p>
              </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}

function ReportSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
                <Skeleton className="h-48 w-full" />
            </div>
            <div className="lg:col-span-1">
                 <Skeleton className="h-[40rem] w-full" />
            </div>
            <div className="lg:col-span-2">
                 <Skeleton className="h-96 w-full" />
            </div>
        </div>
    );
}

export default function ReportPage({ searchParams }: ReportPageProps) {
  const url = searchParams?.url as string;

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Analisar outra URL
            </Link>
          </Button>
        </div>
        <Card className="bg-amber-500/10 border-amber-500/30 mb-8">
          <CardHeader className="flex-row items-center gap-4">
             <BookLock className="w-8 h-8 text-amber-400" />
            <div>
              <CardTitle className="text-amber-400">Este é um Relatório de Apoio à Decisão</CardTitle>
              <CardDescription className="text-amber-300/80">
                As informações aqui apresentadas são baseadas em análises passivas e heurísticas. Elas não constituem um veredito final, mas sim um conjunto de evidências para que você tome uma decisão mais informada.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        {!url ? (
          <div className="text-center bg-card text-card-foreground p-8 rounded-lg">
            <h2 className="text-2xl font-bold">Nenhuma URL fornecida</h2>
            <p className="mt-2 text-muted-foreground">Volte para a página inicial e insira uma URL para analisar.</p>
          </div>
        ) : (
          <Suspense fallback={<ReportSkeleton />}>
            <ReportGenerator url={url} />
          </Suspense>
        )}
      </div>
    </main>
  );
}
