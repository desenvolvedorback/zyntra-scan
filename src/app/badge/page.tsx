
import Link from 'next/link';
import { ArrowLeft, BadgeCheck, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ZyntraBadge = () => (
    <a 
        href="https://zyntra-scan.onrender.com" 
        target="_blank" 
        rel="noopener noreferrer"
        title="Analisado com Zyntra Scan — Segurança Digital Passiva"
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '12px',
            color: '#a1a1aa',
            backgroundColor: '#18181b',
            padding: '4px 10px',
            borderRadius: '16px',
            textDecoration: 'none',
            border: '1px solid #27272a'
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        Analisado com Zyntra Scan
    </a>
);

export default function BadgePage() {
  const badgeCode = `<a href="https://zyntra-scan.onrender.com" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Analisado%20com-Zyntra%20Scan-0c4a6e?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3ZGQzZmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjJzOC00IDgtMTBWNWwtOC0zLTggM3Y3YzAgNiA4IDEwIDggMTB6Ij48L3BhdGg+PC9zdmc+" alt="Analisado com Zyntra Scan" />
</a>`;

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
          <h1 className="text-4xl font-bold text-primary mb-4">Badge "Powered by Zyntra"</h1>
          <p className="text-lg text-muted-foreground">
            Mostre aos seus usuários que você se preocupa com a segurança deles, exibindo nosso selo de análise.
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BadgeCheck className="text-blue-400" />
                Por que usar o badge?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>
                    Ao exibir o badge "Analisado com Zyntra Scan", você aumenta a confiança do seu público, mostrando que os links em seu site foram verificados por uma ferramenta de segurança passiva.
                </p>
                 <p className="font-semibold">
                    É uma forma simples e gratuita de promover a transparência e ajudar a divulgar a importância da segurança digital.
                </p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Exemplo do Badge</CardTitle>
              <CardDescription>
                Existem várias formas de exibir o badge. Abaixo estão alguns exemplos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Estilo Padrão (Markdown/HTML)</h3>
                    <img 
                        src="https://img.shields.io/badge/Analisado%20com-Zyntra%20Scan-0c4a6e?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3ZGQzZmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjJzOC00IDgtMTBWNWwtOC0zLTggM3Y3YzAgNiA4IDEwIDggMTB6Ij48L3BhdGg+PC9zdmc+" 
                        alt="Analisado com Zyntra Scan" 
                    />
                </div>
                 <div>
                    <h3 className="text-lg font-semibold mb-2">Estilo Customizado (HTML/React)</h3>
                    <ZyntraBadge />
                </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Code className="text-green-400" />
                Código de Instalação (Markdown)
              </CardTitle>
               <CardDescription>
                Copie o código abaixo para usar em arquivos README.md, documentações ou qualquer lugar que suporte Markdown.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono">{badgeCode}</code>
              </pre>
            </CardContent>
          </Card>
          
        </article>
      </div>
    </div>
  );
}
