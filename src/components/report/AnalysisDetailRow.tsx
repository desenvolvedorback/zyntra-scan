import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = 'good' | 'bad' | 'neutral' | 'info';

interface AnalysisDetailRowProps {
  label: string;
  value: React.ReactNode;
  status: Status;
}

const statusConfig = {
  good: { icon: CheckCircle2, color: 'text-green-500' },
  bad: { icon: XCircle, color: 'text-red-500' },
  neutral: { icon: AlertCircle, color: 'text-yellow-500' },
  info: { icon: Info, color: 'text-blue-400'}
};

export function AnalysisDetailRow({ label, value, status }: AnalysisDetailRowProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border-b border-border/50 last:border-b-0">
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        <Icon className={cn("h-5 w-5 shrink-0", config.color)} aria-hidden="true" />
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <div className="text-left sm:text-right text-muted-foreground font-mono text-sm break-all ml-8 sm:ml-0">
        {value}
      </div>
    </div>
  );
}
