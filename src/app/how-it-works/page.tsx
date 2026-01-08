import Link from 'next/link';
import { ArrowLeft, Network, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HowItWorksPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Como o Zyntra Scan Funciona</h1>
          <p className="text-lg text-muted-foreground">
            Nossa análise é projetada para ser rápida, segura e, acima de tudo, passiva. Entenda os bastidores da nossa tecnologia.
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Network className="text-blue-400" />
                Análise 100% Passiva e Segura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <p>
                Quando você insere uma URL no Zyntra Scan, nosso sistema age como um visitante comum. Ele faz uma única requisição HTTP para o endereço, exatamente como seu navegador faria, para coletar informações públicas.
              </p>
              <p className="font-semibold">
                Nós NUNCA realizamos varreduras invasivas, tentativas de login, ataques de força bruta ou qualquer ação que possa ser considerada maliciosa. A análise é segura tanto para você quanto para o site de destino.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Zap className="text-amber-400" />
                O que analisamos?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base">
                <ul className="space-y-4 list-disc list-inside">
                    <li>
                        <strong className="font-semibold">Dados Técnicos:</strong> Verificamos o status do servidor, tempo de resposta, se a conexão é HTTPS e a validade do certificado SSL.
                    </li>
                    <li>
                       <strong className="font-semibold">Cabeçalhos de Segurança:</strong> Procuramos por configurações essenciais (como CSP, X-Frame-Options) que protegem contra ataques comuns.
                    </li>
                    <li>
                        <strong className="font-semibold">Análise Heurística:</strong> Aplicamos um sistema de pontuação que busca por padrões suspeitos na URL, como domínios genéricos, parâmetros de rastreamento e palavras-chave comuns em golpes.
                    </li>
                </ul>
            </CardContent>
          </Card>

           <div className="mt-12 text-center p-6 bg-muted/50 rounded-lg">
            <p className="text-xl font-bold text-primary">Transparência é a nossa prioridade.</p>
            <p className="text-muted-foreground mt-2">A Zyntra existe para trazer clareza à sua navegação, não para tomar decisões por você.</p>
          </div>

        </article>
      </div>
    </div>
  );
}
