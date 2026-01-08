import Link from 'next/link';
import { ArrowLeft, Lock, FileText, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Política de Privacidade Simplificada</h1>
          <p className="text-lg text-muted-foreground">
            Sua privacidade é um pilar do nosso projeto. Somos transparentes sobre quais dados coletamos e, mais importante, quais não coletamos.
          </p>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Lock className="text-blue-400" />
                Nosso Compromisso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <p>
                A Zyntra foi criada para ser uma ferramenta segura e privada desde o início. Não temos interesse em seus dados pessoais. Nosso modelo de negócio não é e nunca será baseado na venda ou compartilhamento de informações de usuários.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <FileText className="text-green-400" />
                  O que coletamos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>URLs para Análise:</strong> As URLs que você submete são usadas exclusivamente para realizar a análise passiva e gerar o relatório. Elas não são armazenadas em um banco de dados associado a você.</li>
                    <li><strong>Endereço IP:</strong> Usamos seu endereço IP temporariamente apenas para aplicar o limite de requisições (rate limiting) e proteger nosso serviço contra abusos. Ele não é armazenado a longo prazo.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                    <Share2 className="text-red-400" />
                    O que NÃO coletamos ou compartilhamos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Dados Pessoais:</strong> Não pedimos nem armazenamos seu nome, e-mail, ou qualquer outra informação de identificação pessoal.</li>
                    <li><strong>Cookies de Rastreamento:</strong> Não utilizamos cookies de terceiros para rastrear sua atividade em outros sites.</li>
                    <li><strong>Histórico de Análise:</strong> Não mantemos um histórico das URLs que você analisa.</li>
                    <li><strong>Venda de Dados:</strong> Jamais venderemos ou compartilharemos os dados coletados com terceiros para fins de marketing ou publicidade.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
           <div className="mt-12 text-center p-6 bg-muted/50 rounded-lg">
            <p className="text-xl font-bold text-primary">Privacidade por padrão.</p>
            <p className="text-muted-foreground mt-2">Dúvidas? Entre em <Link href="/contact" className="underline hover:text-primary">contato conosco</Link>.</p>
          </div>

        </article>
      </div>
    </div>
  );
}
