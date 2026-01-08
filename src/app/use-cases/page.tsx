import Link from 'next/link';
import { ArrowLeft, ShoppingCart, MessageSquare, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function UseCasesPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Casos Reais e Exemplos de Golpes</h1>
          <p className="text-lg text-muted-foreground">
            A teoria é importante, mas ver a Zyntra em ação com exemplos reais ajuda a entender seu valor prático. Veja como a análise funciona em cenários comuns.
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-start md:items-center gap-3 text-2xl">
                <ShoppingCart className="text-red-400 shrink-0 mt-1 md:mt-0" />
                <span>Golpe da Falsa Loja Online</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
                <p>
                    Você vê um anúncio no Instagram de um tênis famoso com 80% de desconto. O link te leva para uma loja com um nome parecido com o original, mas com um final diferente.
                </p>
                <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm break-all">
                    https://nike-outlet-brasil.shop
                </div>
                <h3 className="font-semibold text-lg pt-2">Resultado da Análise Zyntra: <span className="text-red-500">RISCO ALTO</span></h3>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Domínio Suspeito:</strong> O uso do TLD ".shop" é comum em lojas de e-commerce de baixa reputação ou temporárias. (+2 pontos)</li>
                    <li><strong>Parâmetros de Anúncio:</strong> A URL provavelmente conteria "fbclid" ou "utm_source=instagram", indicando tráfego pago direcionado. (+2 pontos)</li>
                    <li><strong>Headers Ausentes:</strong> Sites de golpe raramente se preocupam com headers de segurança como X-Frame-Options. (+1 ponto)</li>
                </ul>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-start md:items-center gap-3 text-2xl">
                <MessageSquare className="text-yellow-400 shrink-0 mt-1 md:mt-0" />
                <span>Phishing via SMS: "Sua conta foi limitada"</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
                 <p>
                    Você recebe um SMS do seu banco dizendo que sua conta precisa de verificação urgente. O link parece legítimo, mas usa um encurtador.
                </p>
                <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm break-all">
                    https://bit.ly/Atualiza-Cadastro-Bradesco
                </div>
                <h3 className="font-semibold text-lg pt-2">Resultado da Análise Zyntra: <span className="text-yellow-500">RISCO MÉDIO/ALTO</span></h3>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>URL Encurtada:</strong> O scanner identificaria o uso de um encurtador e analisaria o link final. (+2 pontos)</li>
                     <li><strong>Palavra-Chave Suspeita:</strong> A URL final provavelmente conteria algo como "/confirmar-dados/", acionando a análise heurística. (+1 ponto)</li>
                    <li><strong>Redirecionamento:</strong> Encurtadores, por natureza, redirecionam. Isso adiciona um ponto de cautela. (+1 ponto)</li>
                </ul>
            </CardContent>
          </Card>
          
           <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-start md:items-center gap-3 text-2xl">
                <FileWarning className="text-green-400 shrink-0 mt-1 md:mt-0" />
                <span>Link Legítimo com Marketing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
                 <p>
                    Você clica em um link de uma newsletter de uma grande marca para ver uma promoção. A URL é longa e cheia de parâmetros.
                </p>
                <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm break-all">
                    https://www.magazineluiza.com.br/selecao/ofertas-do-dia/?utm_source=email&utm_campaign=promo-dia-cliente
                </div>
                <h3 className="font-semibold text-lg pt-2">Resultado da Análise Zyntra: <span className="text-green-500">RISCO BAIXO</span></h3>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Domínio Confiável:</strong> O domínio "magazineluiza.com.br" é bem estabelecido e conhecido.</li>
                    <li><strong>Parâmetros de Anúncio:</strong> A presença de UTMs adiciona pontos (+2), mas não é suficiente para um alerta alto.</li>
                    <li><strong>Segurança Robusta:</strong> Grandes sites como este costumam ter todos os headers de segurança e HTTPS configurados corretamente, o que não adiciona pontos de risco.</li>
                </ul>
                 <p className="font-semibold text-sm pt-4">
                   Este é um bom exemplo de como a pontuação ajuda: a presença de UTMs sozinha não classifica o site como perigoso, pois outros fatores (domínio, segurança técnica) compensam.
                </p>
            </CardContent>
          </Card>

        </article>
      </div>
    </div>
  );
}
