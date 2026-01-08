import { UrlForm } from '@/components/UrlForm';
import { Logo } from '@/components/Logo';
import { ShieldCheck, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background flex-grow">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-8 w-fit">
          <Logo />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
          Tome decisões mais seguras na web.
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Zyntra Scan é uma ferramenta de análise passiva que ajuda você a identificar riscos técnicos e heurísticos em URLs antes que um clique se torne um problema.
        </p>

        <div className="mt-12">
          <UrlForm />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Ou <Link href="/how-to-protect" className="underline hover:text-primary">aprenda a identificar os sinais de um golpe</Link>.</p>
        </div>

        <div className="mt-16 text-left grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
                <Zap className="w-6 h-6 text-blue-400" />
                <h3 className="font-semibold text-lg">Análise Instantânea</h3>
                <p className="text-muted-foreground">Verifique status do servidor, certificado SSL e cabeçalhos de segurança em segundos, sem instalações.</p>
            </div>
             <div className="flex flex-col gap-2">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <h3 className="font-semibold text-lg">Análise Heurística de Risco</h3>
                <p className="text-muted-foreground">Detecte padrões suspeitos na URL, como uso de encurtadores, domínios genéricos e palavras-chave comuns em golpes.</p>
            </div>
             <div className="flex flex-col gap-2">
                <BookOpen className="w-6 h-6 text-amber-400" />
                <h3 className="font-semibold text-lg">Relatórios Educacionais</h3>
                <p className="text-muted-foreground">Entenda o porquê de cada risco. Nossos relatórios são projetados para educar, não apenas para julgar.</p>
            </div>
        </div>

        <div className="mt-16 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-xl font-bold text-center text-primary">Confiança através da Transparência</h3>
            <p className="text-center text-muted-foreground mt-2 mb-6">Nossa análise é 100% passiva e sua privacidade é nossa prioridade.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span>✔️ Análise 100% passiva</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>✔️ Sem armazenamento de dados pessoais</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>✔️ Sem downloads ou execução de código</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
