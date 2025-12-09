import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RecipeConfigProps {
  baseType: "NaOH" | "KOH";
  onBaseTypeChange: (value: "NaOH" | "KOH") => void;
  superfat: number;
  onSuperfatChange: (value: number) => void;
  basePurity: number;
  onBasePurityChange: (value: number) => void;
  waterRatio: number;
  onWaterRatioChange: (value: number) => void;
}

export default function RecipeConfig({
  baseType,
  onBaseTypeChange,
  superfat,
  onSuperfatChange,
  basePurity,
  onBasePurityChange,
  waterRatio,
  onWaterRatioChange,
}: RecipeConfigProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Tipo de Base</Label>
        <RadioGroup
          value={baseType}
          onValueChange={(v) => onBaseTypeChange(v as "NaOH" | "KOH")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NaOH" id="naoh" data-testid="radio-naoh" />
            <Label htmlFor="naoh" className="cursor-pointer">
              NaOH (Soda Cáustica)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="KOH" id="koh" data-testid="radio-koh" />
            <Label htmlFor="koh" className="cursor-pointer">
              KOH (Potassa)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="superfat" className="text-sm font-medium">
            Sobregordura (%)
          </Label>
          <Input
            id="superfat"
            type="number"
            min="0"
            max="20"
            value={superfat}
            onChange={(e) => onSuperfatChange(parseFloat(e.target.value) || 0)}
            data-testid="input-superfat"
          />
          <p className="text-xs text-muted-foreground">
            Recomendado: 5%
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purity" className="text-sm font-medium">
            Pureza da Base (%)
          </Label>
          <Input
            id="purity"
            type="number"
            min="50"
            max="100"
            value={basePurity}
            onChange={(e) => onBasePurityChange(parseFloat(e.target.value) || 99)}
            data-testid="input-purity"
          />
          <p className="text-xs text-muted-foreground">
            Padrão: 99%
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="water" className="text-sm font-medium">
            Proporção de Água
          </Label>
          <Input
            id="water"
            type="number"
            min="0.1"
            max="1"
            step="0.05"
            value={waterRatio}
            onChange={(e) => onWaterRatioChange(parseFloat(e.target.value) || 0.3)}
            data-testid="input-water-ratio"
          />
          <p className="text-xs text-muted-foreground">
            Ex: 0.3 = 30% da base
          </p>
        </div>
      </div>
    </div>
  );
}
