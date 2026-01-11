import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookLock, BarChart3, Clock } from 'lucide-react';
import { analyzeSite, analyzeLink, SiteAnalysisResult, LinkAnalysisResult } from '@/lib/analysis';
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

interface ReportPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function ReportGenerator({ url }: { url: string }) {
  let siteAnalysisResult: SiteAnalysisResult;
  let linkAnalysisResult: LinkAnalysisResult;
  let validationError: string | null = null;
  let analysisDate: string = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  
  try {
    new URL(url); 
    siteAnalysisResult = await analyzeSite(url);
    linkAnalysisResult = analyzeLink(url, siteAnalysisResult);
  } catch (e) {
    validationError = "A URL fornecida é inválida.";
    siteAnalysisResult = { status: null, responseTime: null, isHttps: false, isSslValid: null, securityHeaders: { csp: false, xfo: false, xcto: false }, redirected: false, finalUrl: '', error: validationError };
    linkAnalysisResult = { risk: 'Alto', score: 10, reasons: [validationError] };
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
  
  const reportData = {
    url,
    risk: linkAnalysisResult.risk,
    score: linkAnalysisResult.score,
    reasons: linkAnalysisResult.reasons,
    siteAnalysis: siteAnalysisResult,
  };


  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-sm text-muted-foreground">
          Relatório gerado em: {analysisDate} (Horário de Brasília)
        </p>
        <ShareButton reportData={reportData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <ReportSummary url={url} risk={linkAnalysisResult.risk} siteStatus={siteAnalysisResult.status} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <LinkAnalysisCard result={linkAnalysisResult} risk={linkAnalysisResult.risk} />
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      Zyntra Trust Indicator
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="font-semibold text-lg">Estável</p>
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
                   <p className="font-semibold text-lg">Não disponível</p>
                  <p className="text-xs text-muted-foreground mt-1">O monitoramento contínuo não está habilitado para esta URL.</p>
              </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <SiteAnalysisCard result={siteAnalysisResult} />
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
