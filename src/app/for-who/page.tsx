import Link from 'next/link';
import { ArrowLeft, User, Building, Code, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForWhoPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Para Quem é o Zyntra Scan?</h1>
          <p className="text-lg text-muted-foreground">
            Segurança digital é para todos. A Zyntra foi projetada para ser útil a diferentes perfis de usuários, cada um com suas necessidades.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <User className="text-blue-400" />
                  Usuários Comuns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <p>
                  Recebeu um link suspeito por WhatsApp, SMS ou e-mail? Use a Zyntra para fazer uma verificação rápida antes de clicar, protegendo seus dados pessoais e financeiros de possíveis golpes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Building className="text-green-400" />
                  Pequenas Empresas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                 <p>
                  Sua equipe precisa de uma ferramenta simples para verificar a legitimidade de links de fornecedores ou clientes? A Zyntra oferece uma primeira camada de defesa, sem a necessidade de um software de segurança complexo.
                </p>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Code className="text-purple-400" />
                  Desenvolvedores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                 <p>
                  Precisa de uma verificação de segurança rápida para uma URL em seu aplicativo ou sistema? A API da Zyntra (em breve) permitirá integrar nossa análise passiva para alertar seus próprios usuários sobre links potencialmente perigosos.
                </p>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <School className="text-amber-400" />
                  Escolas e Educação Digital
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                 <p>
                  Use a Zyntra como uma ferramenta educacional para ensinar alunos e professores a identificar os sinais de um link malicioso. É uma forma prática de promover a alfabetização digital e a segurança online.
                </p>
              </CardContent>
            </Card>
          </div>

        </article>
      </div>
    </div>
  );
}
