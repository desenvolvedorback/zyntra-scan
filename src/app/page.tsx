import { UrlForm } from '@/components/UrlForm';
import { Logo } from '@/components/Logo';
import { Lock, Settings, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background flex-grow">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-8 w-fit">
          <Logo />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
          Zyntra Scan
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Descubra riscos ocultos em sites e links antes de clicar.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Análise técnica e heurística baseada em requisições HTTP passivas — sem downloads, sem invasão.
        </p>
        <div className="mt-12">
          <UrlForm />
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
                <Lock className="w-3 h-3" />
                <span>Nenhum dado é armazenado</span>
            </div>
            <div className="flex items-center gap-2">
                <Settings className="w-3 h-3" />
                <span>Análise de informações públicas</span>
            </div>
            <div className="flex items-center gap-2">
                <Shield className="w-3 h-3" />
                <span>Não acessamos logins</span>
            </div>
        </div>
      </div>
    </div>
  );
}
