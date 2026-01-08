import { UrlForm } from '@/components/UrlForm';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

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
          Analisador de sites e links suspeitos. Insira uma URL abaixo para iniciar uma análise passiva e segura.
        </p>
        <div className="mt-12">
          <UrlForm />
        </div>
      </div>
    </div>
  );
}
