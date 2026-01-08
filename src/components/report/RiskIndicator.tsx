import { cn } from "@/lib/utils";

type RiskLevel = 'Baixo' | 'Médio' | 'Alto';

interface RiskIndicatorProps {
  risk: RiskLevel;
  size?: 'sm' | 'lg';
}

const riskConfig = {
  Baixo: {
    color: 'bg-green-500',
    text: 'text-green-400',
  },
  Médio: {
    color: 'bg-yellow-500',
    text: 'text-yellow-400',
  },
  Alto: {
    color: 'bg-red-500',
    text: 'text-red-400',
  },
};

export function RiskIndicator({ risk, size = 'sm' }: RiskIndicatorProps) {
  const config = riskConfig[risk];
  return (
    <div className="flex items-center gap-2">
      <div className={cn('rounded-full', config.color, size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3')} />
      <span className={cn('font-semibold', config.text, size === 'sm' ? 'text-sm' : 'text-lg')}>
        Risco {risk}
      </span>
    </div>
  );
}
