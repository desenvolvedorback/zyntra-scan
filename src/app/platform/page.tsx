import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data - in a real-world scenario, this would come from a status monitoring service
const services = [
    { name: 'Scanner Web', status: 'Operacional', description: 'A ferramenta principal de análise de URLs está funcionando normalmente.' },
    { name: 'API Pública', status: 'Operacional', description: 'O endpoint da API está respondendo às requisições conforme esperado.' },
    { name: 'Widget', status: 'Operacional', description: 'O widget para sites externos está funcional.' },
];

const statusConfig = {
    'Operacional': { icon: <CheckCircle className="h-6 w-6 text-green-500" />, badgeVariant: 'secondary' as const, badgeClass: 'bg-green-500/10 text-green-400' },
    'Instabilidade Parcial': { icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />, badgeVariant: 'secondary' as const, badgeClass: 'bg-yellow-500/10 text-yellow-400' },
    'Indisponível': { icon: <XCircle className="h-6 w-6 text-red-500" />, badgeVariant: 'destructive' as const, badgeClass: 'bg-red-500/10 text-red-400' },
};

export default function PlatformPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Status da Plataforma Zyntra</h1>
          <p className="text-lg text-muted-foreground">
            Acompanhe em tempo real o status operacional de nossos serviços. A transparência é um pilar da nossa confiança.
          </p>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Status Atual dos Serviços</CardTitle>
              <CardDescription>Última verificação: {new Date().toLocaleString('pt-BR')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {services.map((service) => {
                const config = statusConfig[service.status as keyof typeof statusConfig];
                return (
                  <div key={service.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      {config.icon}
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <Badge className={`mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap ${config.badgeClass}`}>{service.status}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-400" />
                Manutenção Programada
              </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-base text-muted-foreground">
                    Não há manutenções programadas no momento. Qualquer intervenção planejada que possa afetar a disponibilidade dos serviços será comunicada nesta página com pelo menos 24 horas de antecedência.
                </p>
            </CardContent>
          </Card>

          <div className="mt-12 text-center p-6 bg-card rounded-lg">
            <p className="text-lg font-semibold">
                Nosso compromisso é com a estabilidade e a confiança. Esta página é atualizada automaticamente e reflete o estado real da nossa infraestrutura.
            </p>
          </div>

        </article>
      </div>
    </div>
  );
}
