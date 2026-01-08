import Link from 'next/link';
import { ArrowLeft, Check, X, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TransparencyPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Transparência e Limitações</h1>
          <p className="text-lg text-muted-foreground">
            Acreditamos que a confiança se constrói com honestidade. Aqui, explicamos claramente o que a Zyntra faz e, mais importante, o que ela não faz.
          </p>

          <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-foreground">
            A Zyntra é uma ferramenta de auxílio à decisão, não um veredito final. A responsabilidade pela sua segurança online é, em última instância, sua.
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-green-500">
                  <Check />
                  O que a Zyntra FAZ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Análise Passiva:</strong> Fazemos requisições HTTP públicas para obter dados técnicos do site, como um navegador faria.</li>
                  <li><strong>Verificação Técnica:</strong> Checamos certificado SSL, headers de segurança e status do servidor.</li>
                  <li><strong>Análise Heurística:</strong> Aplicamos um sistema de pontuação que busca padrões comuns em golpes, como URLs suspeitas e domínios genéricos.</li>
                  <li><strong>Educação:</strong> Fornecemos contexto para que você entenda os riscos e tome uma decisão mais informada.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-red-500">
                  <X />
                  O que a Zyntra NÃO FAZ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                 <ul className="list-disc list-inside space-y-2">
                  <li><strong>Análise de Conteúdo:</strong> Não lemos o conteúdo do site, não analisamos o código-fonte em busca de malware e não verificamos a reputação da empresa por trás do site.</li>
                  <li><strong>Testes Invasivos:</strong> Não realizamos varreduras de portas, testes de injeção de SQL ou qualquer tipo de ataque.</li>
                  <li><strong>Veredito Final:</strong> Não garantimos que um site com "Risco Baixo" é 100% seguro, nem que um com "Risco Alto" é definitivamente um golpe.</li>
                   <li><strong>Análise de Arquivos:</strong> Não fazemos download nem análise de arquivos, como PDFs ou executáveis.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8 bg-amber-500/10 border-amber-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-amber-400">
                <ShieldAlert />
                A Natureza da Análise Heurística
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
                <p>
                    Nossa análise é baseada em "heurísticas" — um conjunto de regras e padrões que são fortes indicadores de risco, mas não são provas definitivas. Um site pode ter uma pontuação alta por razões legítimas (por exemplo, usar um TLD novo) ou uma pontuação baixa e ainda assim ser malicioso.
                </p>
                <p className="font-semibold">
                    A Zyntra é um termômetro, não um diagnóstico médico completo. Ela indica a "febre" para que você investigue com mais cuidado.
                </p>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
