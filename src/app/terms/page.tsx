
import Link from 'next/link';
import { ArrowLeft, FileText, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Termos de Uso Simplificados</h1>
          <p className="text-lg text-muted-foreground">
            Queremos que você use a Zyntra com confiança. Estes são os nossos compromissos e o que esperamos de você.
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileText className="text-blue-400" />
                Natureza do Serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <p>
                O Zyntra Scan é uma ferramenta de <strong>apoio à decisão</strong>, projetada para fins educacionais e informativos. Nossa análise é <strong>100% passiva</strong>, o que significa que apenas coletamos informações públicas de um site, assim como um navegador faria.
              </p>
              <blockquote className="mt-0 border-l-4 border-primary pl-4 italic text-foreground">
                Nossos relatórios não são um veredito final de "seguro" ou "perigoso", mas um termômetro de risco para que você tome uma decisão mais informada. A responsabilidade final sobre onde clicar é sua.
              </blockquote>
               <p className="text-sm text-muted-foreground">
                A Zyntra não se responsabiliza por perdas financeiras, danos ou consequências decorrentes do uso ou da interpretação dos relatórios.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <ShieldAlert className="text-amber-400" />
                Limitações e Uso Justo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
               <p>
                A API pública e o widget são oferecidos gratuitamente para uso pessoal, educacional e de baixo volume. Para garantir a disponibilidade do serviço para todos, aplicamos um limite de <strong>10 requisições por minuto por endereço IP</strong>.
              </p>
               <p>
                O uso comercial ou de alto volume requer um acordo prévio. O abuso do serviço, como automação excessiva, pode levar ao bloqueio temporário ou permanente do acesso.
              </p>
               <p className="font-semibold">
                Para o uso gratuito do widget, a exibição do selo "Powered by Zyntra Scan" é obrigatória e deve ser mantida como fornecida. Em integrações comerciais, o uso do badge pode ser ajustado mediante acordo.
              </p>
            </CardContent>
          </Card>
          
           <div className="mt-12 text-center p-6 bg-muted/50 rounded-lg">
            <p className="text-xl font-bold text-primary">Confiança através da transparência.</p>
            <p className="text-muted-foreground mt-2">Para mais detalhes, consulte nossa página de <Link href="/transparency" className="underline hover:text-primary">Transparência e Limitações</Link>.</p>
          </div>

        </article>
      </div>
    </div>
  );
}
