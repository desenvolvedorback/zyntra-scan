
import Link from 'next/link';
import { ArrowLeft, Terminal, ShieldAlert, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ApiDocsPage() {
  const exampleRequest = `fetch('https://zyntra-scan.onrender.com/api/scan?url=exemplo.com')
  .then(res => res.json())
  .then(data => console.log(data));`;

    const exampleRequestSimple = `fetch('https://zyntra-scan.onrender.com/api/scan/simple?url=exemplo.com')
  .then(res => res.json())
  .then(data => console.log(data));`;

  const exampleResponse = `{
  "meta": {
    "analysisId": "ZS-1768146786734",
    "reportVersion": "1.1",
    "analysisEngine": "Zyntra Scan Engine v1.1 (Heurístico, Passivo)",
    "analysisTimestamp": "11/01/2026, 12:53:06",
    "targetUrl": "https://exemplo.com"
  },
  "evaluation": {
    "riskLevel": "Baixo",
    "riskLevelCode": "LOW",
    "potentialImpact": "Baixo",
    "riskProbability": "Baixa",
    "heuristicScore": 1,
    "trustIndicator": "Estável",
    "analysisHistory": "Não disponível para esta análise"
  },
  "heuristicAnalysis": {
    "riskFactors": [
      "Nenhum indicador de risco óbvio encontrado na análise heurística."
    ]
  },
  "technicalDetections": {
    "serverStatus": 200,
    "responseTime": 100,
    "isHttps": true,
    "isSslValid": true,
    "isRedirected": false,
    "finalUrl": "https://exemplo.com",
    "securityHeaders": {
      "csp": false,
      "xfo": false,
      "xcto": false
    }
  },
  "scope": { ... },
  "integrity": { ... }
}`;
    
    const exampleResponseSimple = `{
    "targetUrl": "https://exemplo.com",
    "riskLevel": "Baixo",
    "riskLevelCode": "LOW",
    "heuristicScore": 1,
    "isHttps": true,
    "serverStatus": 200,
    "error": null
}`;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Scanner
            </Link>
          </Button>
        </div>
        <article className="prose prose-invert max-w-none text-foreground">
          <h1 className="text-4xl font-bold text-primary mb-4">Documentação da API Zyntra Scan</h1>
          <p className="text-lg text-muted-foreground">
            Integre o poder da análise de risco da Zyntra em suas próprias aplicações, plugins de navegador ou widgets com nossos endpoints flexíveis.
          </p>

          <Tabs defaultValue="completa" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="completa">API Completa</TabsTrigger>
                <TabsTrigger value="simples">API Simples</TabsTrigger>
            </TabsList>
            <TabsContent value="completa">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Terminal className="text-blue-400" />
                            Endpoint Principal (Completo)
                        </CardTitle>
                        <CardDescription>
                            Retorna um relatório de análise detalhado. Ideal para integrações que precisam de dados técnicos e heurísticos completos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm space-x-2 mb-6">
                            <Badge variant="secondary">GET</Badge>
                            <span>/api/scan</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Parâmetros</h3>
                        <p className="font-semibold"><code>url</code> (string, obrigatório): A URL a ser analisada.</p>
                        
                         <h3 className="text-lg font-semibold mt-6 mb-2">Exemplo de Requisição</h3>
                         <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                            <code className="text-sm font-mono">{exampleRequest}</code>
                        </pre>

                        <h3 className="text-lg font-semibold mt-6 mb-2">Exemplo de Resposta (v1.1)</h3>
                        <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                            <code className="text-sm font-mono">{exampleResponse}</code>
                        </pre>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="simples">
               <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Zap className="text-green-400" />
                            Endpoint Simples (Resumido)
                        </CardTitle>
                        <CardDescription>
                            Retorna uma resposta leve e rápida, ideal para widgets, previews ou integrações de baixo volume de dados.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm space-x-2 mb-6">
                            <Badge variant="secondary">GET</Badge>
                            <span>/api/scan/simple</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Parâmetros</h3>
                        <p className="font-semibold"><code>url</code> (string, obrigatório): A URL a ser analisada.</p>

                        <h3 className="text-lg font-semibold mt-6 mb-2">Exemplo de Requisição</h3>
                         <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                            <code className="text-sm font-mono">{exampleRequestSimple}</code>
                        </pre>

                        <h3 className="text-lg font-semibold mt-6 mb-2">Exemplo de Resposta</h3>
                        <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                            <code className="text-sm font-mono">{exampleResponseSimple}</code>
                        </pre>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8 bg-amber-500/10 border-amber-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-amber-400">
                <ShieldAlert />
                Limites e Uso Justo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
                <p>
                    A API pública é gratuita e destinada a projetos de baixo volume, experimentação e uso educacional. Para garantir a disponibilidade para todos, aplicamos um limite de <strong>10 requisições por minuto por endereço IP</strong>.
                </p>
                <p className="font-semibold">
                    Para uso comercial ou de alto volume, por favor, entre em contato para discutir planos dedicados. O uso indevido da API pode resultar em bloqueio.
                </p>
            </CardContent>
          </Card>

        </article>
      </div>
    </div>
  );
}
