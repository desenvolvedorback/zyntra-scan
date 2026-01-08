import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, ShoppingCart, MessageSquare, Ticket, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const useCases = [
    {
        title: "Golpe de Loja Falsa",
        icon: <ShoppingCart className="h-6 w-6 text-red-500" />,
        url: "https://promocao-imperdivel-hoje.xyz",
        risk: "Alto",
        riskIcon: <XCircle className="h-5 w-5 text-red-500" />,
        factors: [
            "Domínio .xyz, frequentemente usado em golpes.",
            "URL contém palavras de urgência ('imperdivel', 'hoje').",
            "Ausência de cabeçalhos de segurança essenciais.",
        ],
        explanation: "Lojas falsas costumam usar domínios baratos e nomes que criam um senso de urgência. O Zyntra Scan detecta esses padrões, como o uso do TLD '.xyz' e palavras-chave suspeitas, além de verificar falhas técnicas de segurança, classificando o link como de alto risco."
    },
    {
        title: "Golpe via Anúncios (Redes Sociais)",
        icon: <MessageSquare className="h-6 w-6 text-red-500" />,
        url: "https://bit.ly/oferta-exclusiva-tiktok",
        risk: "Alto",
        riskIcon: <XCircle className="h-5 w-5 text-red-500" />,
        factors: [
            "Uso de encurtador de URL (bit.ly) para mascarar o destino.",
            "Parâmetros de rastreamento de anúncios (comum em campanhas de phishing).",
            "O link redireciona para um domínio diferente do esperado."
        ],
        explanation: "Golpistas usam encurtadores de link em anúncios para esconder o site malicioso. O Zyntra Scan identifica o uso de encurtadores e analisa a URL final após o redirecionamento, expondo o risco real que estaria oculto para o usuário."
    },
    {
        title: "Link Legítimo com Marketing",
        icon: <Ticket className="h-6 w-6 text-yellow-500" />,
        url: "https://lojasegura.com/produto?utm_source=email&utm_campaign=verao",
        risk: "Médio",
        riskIcon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        factors: [
            "Presença de parâmetros de rastreamento (UTMs).",
            "O domínio principal é confiável, mas os parâmetros aumentam a pontuação de risco.",
        ],
        explanation: "Muitos links legítimos usam parâmetros UTM para marketing. Embora não seja inerentemente malicioso, o Zyntra Scan os sinaliza para um risco 'Médio' porque essa é uma tática também usada em phishing. Isso educa o usuário a analisar o contexto: o domínio principal é confiável, mas a presença de muitos parâmetros justifica cautela."
    },
    {
        title: "Site Institucional Confiável",
        icon: <Landmark className="h-6 w-6 text-green-500" />,
        url: "https://www.gov.br",
        risk: "Baixo",
        riskIcon: <CheckCircle className="h-5 w-5 text-green-500" />,
        factors: [
            "Domínio .gov.br, de alta confiança.",
            "Conexão HTTPS com certificado válido.",
            "Presença de cabeçalhos de segurança robustos."
        ],
        explanation: "Sites governamentais e institucionais geralmente seguem boas práticas de segurança. O Zyntra Scan verifica o domínio confiável, a implementação correta de HTTPS e os cabeçalhos de segurança, resultando em uma pontuação de risco 'Baixo' e reforçando a confiança no link."
    }
];

export default function UseCasesPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-4">Casos Reais e Exemplos de Golpes</h1>
          <p className="text-lg text-muted-foreground">
            Veja como o Zyntra Scan analisa diferentes tipos de links e entenda na prática os fatores que indicam um risco.
          </p>

          <Accordion type="single" collapsible className="w-full mt-12 space-y-4">
            {useCases.map((useCase, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card border-border/50 rounded-lg">
                <AccordionTrigger className="p-6 text-xl hover:no-underline">
                  <div className="flex items-center gap-4">
                    {useCase.icon}
                    <span>{useCase.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">URL Analisada</CardTitle>
                            <CardDescription className="font-mono text-sm break-all">{useCase.url}</CardDescription>
                        </CardHeader>
                         <CardContent>
                            <div className="flex items-center gap-2 font-semibold">
                                {useCase.riskIcon}
                                <span>Risco {useCase.risk}</span>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <div>
                        <h3 className="font-semibold mb-2">Fatores que influenciaram o resultado:</h3>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {useCase.factors.map((factor, i) => <li key={i}>{factor}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Explicação Educativa:</h3>
                        <p className="text-muted-foreground">{useCase.explanation}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-xl font-bold text-primary">A Zyntra é um termômetro de risco, não um diagnóstico definitivo.</p>
            <p className="mt-2 text-muted-foreground">Use nosso scanner para tomar decisões mais seguras.</p>
             <Button asChild className="mt-4">
                <Link href="/">Analisar um Link</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
