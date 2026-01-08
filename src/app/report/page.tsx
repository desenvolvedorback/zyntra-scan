import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { analyzeSite, analyzeLink, SiteAnalysisResult, LinkAnalysisResult } from '@/lib/analysis';
import { ReportSummary } from '@/components/report/ReportSummary';
import { LinkAnalysisCard } from '@/components/report/LinkAnalysisCard';
import { SiteAnalysisCard } from '@/components/report/SiteAnalysisCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  
  try {
    // This is redundant as we do it on the client, but good for direct access resilience
    new URL(url); 
    siteAnalysisResult = await analyzeSite(url);
    linkAnalysisResult = analyzeLink(url, siteAnalysisResult);
  } catch (e) {
    validationError = "A URL fornecida é inválida.";
    // Provide dummy data for children components to prevent crashing
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
      <div className="lg:col-span-3 mb-6">
        <ShareButton reportData={reportData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <ReportSummary url={url} risk={linkAnalysisResult.risk} siteStatus={siteAnalysisResult.status} />
        </div>
        <div className="lg:col-span-1">
          <LinkAnalysisCard result={linkAnalysisResult} />
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
                 <Skeleton className="h-64 w-full" />
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
