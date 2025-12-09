import { CheckCircle, AlertCircle } from "lucide-react";
import { Cor_Oleo_Atributo } from "@/lib/soapLogic";

interface AttributeBarProps {
  name: string;
  value: number;
}

export default function AttributeBar({ name, value }: AttributeBarProps) {
  const clampedValue = Math.max(0, Math.min(20, value));
  const percentage = (clampedValue / 20) * 100;
  
  let color: "verde" | "amarelo" | "vermelho";
  try {
    color = Cor_Oleo_Atributo(Math.round(clampedValue));
  } catch {
    color = "vermelho";
  }

  const colorClasses = {
    verde: "bg-emerald-500",
    amarelo: "bg-amber-500",
    vermelho: "bg-red-500",
  };

  const textColorClasses = {
    verde: "text-emerald-600 dark:text-emerald-400",
    amarelo: "text-amber-600 dark:text-amber-400",
    vermelho: "text-red-600 dark:text-red-400",
  };

  const Icon = color === "verde" ? CheckCircle : AlertCircle;

  return (
    <div className="space-y-1.5" data-testid={`attribute-${name.toLowerCase()}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${textColorClasses[color]}`} />
          <span className="text-sm font-medium">{name}</span>
        </div>
        <span className={`text-sm font-bold font-mono ${textColorClasses[color]}`}>
          {clampedValue.toFixed(1)}
        </span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
