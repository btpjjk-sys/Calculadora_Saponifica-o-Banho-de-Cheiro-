import { Beaker, Droplets, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ResultsDashboardProps {
  baseAmount: number;
  waterAmount: number;
  totalOilWeight: number;
  baseType: "NaOH" | "KOH";
}

export default function ResultsDashboard({
  baseAmount,
  waterAmount,
  totalOilWeight,
  baseType,
}: ResultsDashboardProps) {
  const totalMass = baseAmount + waterAmount + totalOilWeight;

  const results = [
    {
      icon: Beaker,
      label: `Quantidade de ${baseType}`,
      value: baseAmount.toFixed(2),
      unit: "g",
      color: "text-chart-1",
    },
    {
      icon: Droplets,
      label: "Quantidade de Água",
      value: waterAmount.toFixed(2),
      unit: "g",
      color: "text-chart-2",
    },
    {
      icon: Scale,
      label: "Peso Total da Massa",
      value: totalMass.toFixed(2),
      unit: "g",
      color: "text-chart-4",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {results.map((result) => (
        <Card
          key={result.label}
          className="p-6 text-center"
          data-testid={`card-result-${result.label.replace(/\s+/g, "-").toLowerCase()}`}
        >
          <result.icon className={`w-8 h-8 mx-auto mb-3 ${result.color}`} />
          <p className="text-sm text-muted-foreground mb-1">{result.label}</p>
          <p className="font-mono text-3xl font-bold" data-testid={`text-value-${result.label.replace(/\s+/g, "-").toLowerCase()}`}>
            {result.value}
            <span className="text-lg font-normal ml-1">{result.unit}</span>
          </p>
        </Card>
      ))}
    </div>
  );
}
