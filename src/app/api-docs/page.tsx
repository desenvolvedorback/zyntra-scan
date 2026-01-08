import Link from 'next/link';
import { ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ApiDocsPage() {
  const exampleRequest = `fetch('https://zyntra-scan-ai.web.app/api/scan?url=exemplo.com')
  .then(res => res.json())
  .then(data => console.log(data));`;

  const exampleResponse = `{
  "url": "https://exemplo.com",
  "riskAnalysis": {
    "risk": "Baixo",
    "score": 0,
    "reasons": [
      "Nenhum indicador de risco óbvio encontrado na análise heurística."
    ]
  },
  "siteAnalysis": {
    "status": 200,
    "responseTime": 150,
    "isHttps": true,
    "isSslValid": true,
    "securityHeaders": {
      "csp": "default-src 'self'",
      "xfo": "SAMEORIGIN",
      "xcto": "nosniff"
    },
    "redirected": false,
    "finalUrl": "https://exemplo.com/"
  }
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
            Integre o poder da análise de risco da Zyntra em suas próprias aplicações, plugins de navegador ou widgets.
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Terminal className="text-blue-400" />
                Endpoint Principal
              </CardTitle>
              <CardDescription>
                A API possui um único endpoint que recebe uma URL e retorna a análise completa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm space-x-2">
                <Badge variant="secondary">GET</Badge>
                <span>/api/scan</span>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Parâmetros</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold"><code>url</code> (string, obrigatório)</p>
              <p className="text-muted-foreground mt-1">
                A URL que você deseja analisar. O protocolo (http/https) é opcional.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Exemplo de Requisição</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono">{exampleRequest}</code>
              </pre>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Exemplo de Resposta</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono">{exampleResponse}</code>
              </pre>
            </CardContent>
          </Card>
          
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
