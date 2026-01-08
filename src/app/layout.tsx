import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Zyntra Scan',
  description: 'Analisador de sites e links suspeitos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <footer className="w-full text-center p-6 bg-background border-t border-border/50">
            <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground mb-4 flex-wrap">
                <Link href="/how-it-works" className="hover:text-primary hover:underline">Como Funciona</Link>
                <Link href="/transparency" className="hover:text-primary hover:underline">Transparência</Link>
                <Link href="/terms" className="hover:text-primary hover:underline">Termos de Uso</Link>
                <Link href="/privacy" className="hover:text-primary hover:underline">Privacidade</Link>
                <Link href="/how-to-protect" className="hover:text-primary hover:underline">Dicas de Segurança</Link>
                <Link href="/use-cases" className="hover:text-primary hover:underline">Casos Reais</Link>
                <Link href="/for-who" className="hover:text-primary hover:underline">Para Quem é</Link>
                <Link href="/about" className="hover:text-primary hover:underline">Sobre</Link>
                <Link href="/contact" className="hover:text-primary hover:underline">Contato</Link>
                <Link href="/api-docs" className="hover:text-primary hover:underline">API</Link>
                <Link href="/widget" className="hover:text-primary hover:underline">Widget</Link>
                <Link href="/badge" className="hover:text-primary hover:underline">Badge</Link>
            </div>
             <p className="text-xs text-muted-foreground mb-4">
              Análise baseada em requisições HTTP passivas. Não realizamos ataques ou varreduras invasivas.
            </p>
            <p className="text-xs text-muted-foreground">
              Powered by{' '}
              <a
                href="https://zyntra-zy.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Zyntra
              </a>
              {' '}— Segurança Digital Passiva
            </p>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
