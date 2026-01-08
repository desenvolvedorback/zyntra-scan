import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/Logo';

export default function AboutPage() {
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
          <div className="text-center mb-12">
            <div className="mx-auto mb-6 w-fit">
              <Logo />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">Sobre a Zyntra</h1>
            <p className="text-lg text-muted-foreground">Tornando a internet um lugar mais seguro, uma análise de cada vez.</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">O que é a Zyntra?</CardTitle>
            </CardHeader>
            <CardContent className="text-base space-y-4">
              <p>
                A Zyntra é uma iniciativa de segurança digital focada em dar poder ao usuário. Nosso objetivo é fornecer ferramentas e conhecimento para que qualquer pessoa possa navegar na internet com mais confiança, identificando ameaças antes que elas se tornem um problema.
              </p>
               <blockquote className="mt-0 border-l-4 border-primary pl-4 italic text-foreground">
                Zyntra Scan não diz se um site é seguro. Ela mostra os sinais de risco que a maioria das pessoas não vê.
              </blockquote>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Qual problema resolvemos?</CardTitle>
            </CardHeader>
            <CardContent className="text-base space-y-4">
              <p>
                Hoje, os golpes online são sofisticados. Eles exploram a confiança e a engenharia social, em vez de falhas técnicas. Um cadeado verde (HTTPS) não é mais suficiente para garantir que um site é seguro. A Zyntra nasce para resolver esse problema, oferecendo uma camada extra de verificação que vai além do básico.
              </p>
            </CardContent>
          </Card>
          
           <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Nosso compromisso</CardTitle>
            </CardHeader>
            <CardContent className="text-base space-y-4">
              <p>
                Acreditamos que a melhor defesa é o conhecimento. Nosso compromisso é com a transparência e a educação. Nossas ferramentas são projetadas para serem passivas e seguras, analisando informações públicas sem realizar qualquer tipo de ataque, para que você tenha os dados necessários para tomar uma decisão informada.
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Button asChild>
                <Link href="/how-it-works">
                    Como a análise funciona
                </Link>
            </Button>
          </div>

        </article>
      </div>
    </div>
  );
}
