import Link from 'next/link';
import { ArrowLeft, ShieldCheck, EyeOff, ListChecks, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ExtensionPage() {
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
            <h1 className="text-4xl font-bold text-primary mb-4">Extensão Zyntra Scan para Navegador</h1>
            <p className="text-xl text-muted-foreground">
              Leve a análise de risco da Zyntra diretamente para a sua navegação. <span className="text-primary font-semibold">(Em Breve)</span>
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Objetivo da Extensão</CardTitle>
            </CardHeader>
            <CardContent className="text-base space-y-4">
              <p>
                A extensão do Zyntra Scan tem um único objetivo: tornar a verificação de links um processo rápido, intuitivo e integrado ao seu dia a dia. Em vez de copiar e colar um link em nosso site, você poderá analisá-lo com um único clique, diretamente da página em que está.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-green-400">
                  <ListChecks />
                  O que ela FAZ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Análise sob demanda:</strong> Analisa a URL da página atual ou qualquer link que você clicar com o botão direito.</li>
                  <li><strong>Resumo rápido:</strong> Exibe um resumo do relatório (nível de risco e status) em um pop-up.</li>
                  <li><strong>Acesso ao relatório completo:</strong> Oferece um link direto para o relatório detalhado no site do Zyntra Scan.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-red-400">
                  <EyeOff />
                   O que ela NÃO FAZ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                 <ul className="list-disc list-inside space-y-2">
                  <li><strong>Não monitora sua navegação:</strong> A extensão só é ativada quando você a aciona. Ela não rastreia seu histórico.</li>
                  <li><strong>Não bloqueia sites:</strong> A Zyntra é uma ferramenta de apoio à decisão. Ela informa os riscos, mas nunca impede seu acesso.</li>
                  <li><strong>Não analisa conteúdo:</strong> Assim como o site, a extensão não lê o conteúdo das páginas nem seus dados pessoais.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

           <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Search />
                Fluxo de Uso Básico
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Instale a extensão na loja oficial do seu navegador.</li>
                    <li>Navegue para qualquer site ou encontre um link suspeito.</li>
                    <li>Clique com o botão direito no link (ou no ícone da extensão) e selecione "Analisar com Zyntra Scan".</li>
                    <li>Um pop-up exibirá o resumo do risco.</li>
                    <li>Para mais detalhes, clique em "Ver Relatório Completo".</li>
                </ol>
            </CardContent>
          </Card>
          
          <div className="mt-12 p-6 bg-card rounded-lg border border-primary/20">
            <h3 className="font-semibold text-xl text-center text-primary">Privacidade como Prioridade</h3>
            <p className="text-center text-muted-foreground mt-2">
              A extensão seguirá a mesma política de privacidade rigorosa do nosso site. Nenhuma informação pessoal ou de navegação é coletada ou armazenada. A única informação enviada aos nossos servidores é a URL que você explicitamente escolhe analisar.
            </p>
          </div>

        </article>
      </div>
    </div>
  );
}
