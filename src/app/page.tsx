import { UrlForm } from '@/components/UrlForm';
import { Logo } from '@/components/Logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto mb-8 w-fit">
          <Logo />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
          Zyntra Scan
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Analisador de sites e links suspeitos. Insira uma URL abaixo para iniciar uma análise passiva e segura.
        </p>
        <div className="mt-12">
          <UrlForm />
        </div>
      </div>
       <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        Serviço público e experimental. Use por sua conta e risco.
      </footer>
    </main>
  );
}
