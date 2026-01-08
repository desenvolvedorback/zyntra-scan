
import Link from 'next/link';
import { ArrowLeft, Code, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ZyntraWidget } from '@/components/ZyntraWidget';

export default function WidgetPage() {
  const widgetCode = `<div id="zyntra-widget-container"></div>
<script src="https://zyntra-scan-ai.web.app/widget.js" defer></script>`;

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
          <h1 className="text-4xl font-bold text-primary mb-4">Widget Zyntra Scan</h1>
          <p className="text-lg text-muted-foreground">
            Integre a análise de segurança da Zyntra diretamente no seu site, blog ou aplicação com nosso widget simples e leve.
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Puzzle className="text-blue-400" />
                Como Funciona
              </CardTitle>
              <CardDescription>
                Basta copiar e colar uma linha de código no seu HTML. O widget é projetado para ser assíncrono e não impactar o carregamento da sua página.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>
                    O widget renderiza um formulário de análise simples. Quando um usuário insere uma URL e clica em "Verificar", ele é direcionado para a página de relatório completa do Zyntra Scan em uma nova aba.
                </p>
                 <p className="font-semibold">
                    É seguro, rápido e não requer nenhuma configuração complexa da sua parte.
                </p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Exemplo ao Vivo</CardTitle>
              <CardDescription>Veja o widget em ação abaixo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-muted/50 rounded-lg">
                <ZyntraWidget />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Code className="text-green-400" />
                Código de Instalação
              </CardTitle>
               <CardDescription>
                Copie o código abaixo e cole-o no local do seu site onde você deseja que o widget apareça.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono">{widgetCode}</code>
              </pre>
            </CardContent>
          </Card>
          
        </article>
      </div>
    </div>
  );
}
