import { X, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Oleo } from "@/lib/soapLogic";

interface OilListProps {
  oils: Oleo[];
  onRemoveOil: (oilName: string) => void;
}

export default function OilList({ oils, onRemoveOil }: OilListProps) {
  const totalWeight = oils.reduce((sum, oil) => sum + oil.Peso_gramas, 0);

  if (oils.length === 0) {
    return (
      <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
        <Droplets className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground text-sm">
          Nenhum óleo adicionado ainda.
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Selecione os óleos acima para começar sua receita.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {oils.map((oil) => {
        const percentage = ((oil.Peso_gramas / totalWeight) * 100).toFixed(1);
        return (
          <Card
            key={oil.Nome}
            className="p-4 hover-elevate"
            data-testid={`card-oil-${oil.Nome.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{oil.Nome}</p>
                <p className="text-sm text-muted-foreground">
                  {percentage}% da receita
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-semibold">
                  {oil.Peso_gramas}g
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onRemoveOil(oil.Nome)}
                  data-testid={`button-remove-${oil.Nome.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}

      <div className="pt-3 border-t flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Total de Óleos
        </span>
        <span className="font-mono text-xl font-bold" data-testid="text-total-oils">
          {totalWeight}g
        </span>
      </div>
    </div>
  );
}
