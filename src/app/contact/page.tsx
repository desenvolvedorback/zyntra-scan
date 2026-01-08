import Link from 'next/link';
import { ArrowLeft, Mail, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Contato e Denúncia</h1>
          <p className="text-lg text-muted-foreground">
            Agradecemos seu interesse e contribuição para tornar a web um lugar mais seguro.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Mail className="text-blue-400" />
                  Contato Institucional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <p>
                  Para parcerias, sugestões ou questões gerais sobre o projeto Zyntra, entre em contato conosco pelo e-mail abaixo.
                </p>
                <Button asChild>
                  <a href="mailto:contact@zyntra.com">contact@zyntra.com</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <ShieldAlert className="text-red-400" />
                  Reportar Link Suspeito
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <p>
                  Encontrou um link que a Zyntra classificou incorretamente ou quer nos alertar sobre um novo tipo de golpe? Use o Zyntra Scan primeiro e, se necessário, nos envie o relatório.
                </p>
                <Button asChild variant="secondary">
                   <Link href="/">Analisar um Link</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
            <p className="font-semibold text-lg text-muted-foreground">
              Aviso Importante: Não analisamos ou armazenamos links privados ou que exijam autenticação. Todo o nosso processo é focado em URLs públicas e acessíveis.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
