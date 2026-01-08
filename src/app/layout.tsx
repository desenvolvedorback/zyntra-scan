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
          <footer className="w-full text-center p-4 bg-background">
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
            </p>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
