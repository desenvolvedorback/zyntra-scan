import { ShieldCheck } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-lg">
      <ShieldCheck className="w-12 h-12 text-primary-foreground" />
    </div>
  );
}
