import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HowToProtectPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Como identificar links falsos e se proteger de golpes online</h1>
          <p className="text-lg text-muted-foreground">
            A internet está cheia de armadilhas, mas com um pouco de conhecimento, você pode navegar com muito mais segurança. Use nosso scanner e siga estas dicas para se proteger.
          </p>

          <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-foreground">
            A maioria dos golpes modernos passa despercebida porque não depende mais de falhas técnicas, mas de engenharia social.
          </blockquote>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <ShieldCheck className="text-green-500" />
                Por que HTTPS e um "cadeado verde" não são mais garantia de segurança?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <p>
                Antigamente, o cadeado verde (conexão HTTPS) era um sinal de que um site era seguro. Hoje, isso mudou. O HTTPS apenas garante que a comunicação entre você e o site é criptografada, impedindo que intermediários espionem os dados.
              </p>
              <p>
                No entanto, <strong className="text-primary-foreground">isso não diz nada sobre as intenções do dono do site</strong>. Golpistas podem obter certificados SSL válidos facilmente (e de graça) para seus sites de phishing. Eles usam o cadeado para criar uma falsa sensação de segurança e enganar as vítimas para que insiram dados sensíveis.
              </p>
              <p className="font-semibold text-amber-400">
                Resumindo: um site com HTTPS pode perfeitamente ser um site de golpe. É por isso que ferramentas como a Zyntra Scan analisam outros fatores além do certificado.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Zap className="text-blue-400" />
                Dicas práticas para identificar links falsos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-base">
              <div>
                <h3 className="font-semibold text-lg text-primary-foreground">1. Verifique o Domínio com Atenção</h3>
                <p>
                  Sempre olhe para o endereço do site antes de clicar. Golpistas registram domínios parecidos com os originais, trocando letras ou adicionando palavras.
                </p>
                <div className="mt-4 space-y-3">
                  <div className="bg-destructive/10 border border-destructive/30 text-destructive-foreground p-3 rounded-lg font-mono text-center text-sm">
                    ❌ banco-itau<span className="bg-destructive/30 px-1 rounded">.xyz</span>
                  </div>
                  <div className="bg-destructive/10 border border-destructive/30 text-destructive-foreground p-3 rounded-lg font-mono text-center text-sm">
                    ❌ faceb<span className="bg-destructive/30 px-1 rounded">oo</span>ok.com
                  </div>
                  <div className="bg-destructive/10 border border-destructive/30 text-destructive-foreground p-3 rounded-lg font-mono text-center text-sm">
                    ❌ apple.com<span className="bg-destructive/30 px-1 rounded">.seguranca.info</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-primary-foreground">2. Desconfie de Ofertas Urgentes e Exageradas</h3>
                <p>
                  "Sua conta será bloqueada!", "Você ganhou um prêmio incrível!", "Clique aqui para resgatar seu PIX!". Mensagens com senso de urgência ou promessas boas demais para ser verdade são táticas comuns para fazer você agir sem pensar.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-primary-foreground">3. Cuidado com Encurtadores de URL</h3>
                <p>
                  Links encurtados (como bit.ly, t.co) escondem o endereço final. Antes de clicar, use um expansor de URL ou o nosso scanner para ver para onde o link realmente leva.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-primary-foreground">4. Use o Zyntra Scan</h3>
                <p>
                  Na dúvida, sempre use nossa ferramenta. Ela foi projetada para pegar os sinais que a maioria das pessoas não vê, combinando análise técnica com análise de padrões suspeitos.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-12 text-center">
            <p className="text-2xl font-bold text-primary">Na dúvida, não clique. Analise.</p>
          </div>
        </article>
      </div>
    </div>
  );
}
