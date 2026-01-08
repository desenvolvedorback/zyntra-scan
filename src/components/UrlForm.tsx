'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function UrlForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url) {
      toast({
        title: 'URL Inválida',
        description: 'Por favor, insira uma URL para analisar.',
        variant: 'destructive',
      });
      return;
    }

    let formattedUrl = url.trim();
    if (!/^(https?:\/\/)/i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
    } catch (_) {
      toast({
        title: 'URL Inválida',
        description: 'O formato da URL inserida não é válido.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    router.push(`/report?url=${encodeURIComponent(formattedUrl)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="url"
        placeholder="exemplo.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="text-lg p-6"
        disabled={isLoading}
        aria-label="URL a ser analisada"
      />
      <Button type="submit" size="lg" className="p-6" disabled={isLoading}>
        {isLoading ? (
            <span className="animate-spin h-5 w-5 border-2 border-primary-foreground/50 border-t-primary-foreground rounded-full" />
        ) : (
            <Search className="h-5 w-5" />
        )}
        <span className="ml-2 hidden sm:inline">{isLoading ? 'Analisando...' : 'Analisar'}</span>
      </Button>
    </form>
  );
}
