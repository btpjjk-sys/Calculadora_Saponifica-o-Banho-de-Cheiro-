import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OILS_DATA, Oleo } from "@/lib/soapLogic";

interface OilSelectorProps {
  onAddOil: (oil: Oleo) => void;
  selectedOilNames: string[];
}

export default function OilSelector({ onAddOil, selectedOilNames }: OilSelectorProps) {
  const [selectedOilName, setSelectedOilName] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const availableOils = OILS_DATA.filter(
    (oil) => !selectedOilNames.includes(oil.Nome)
  );

  const handleAddOil = () => {
    const oilData = OILS_DATA.find((o) => o.Nome === selectedOilName);
    if (oilData && weight) {
      const newOil = new Oleo(
        oilData.Nome,
        oilData.Indice_saponificaoNaOH,
        oilData.Indice_saponificaoKOH,
        oilData.Valores_Atributos,
        parseFloat(weight)
      );
      onAddOil(newOil);
      setSelectedOilName("");
      setWeight("");
    }
  };

  const isValid = selectedOilName && weight && parseFloat(weight) > 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="oil-select" className="text-sm font-medium">
          Selecione o Óleo
        </Label>
        <Select value={selectedOilName} onValueChange={setSelectedOilName}>
          <SelectTrigger id="oil-select" data-testid="select-oil">
            <SelectValue placeholder="Escolha um óleo..." />
          </SelectTrigger>
          <SelectContent>
            {availableOils.map((oil) => (
              <SelectItem key={oil.Nome} value={oil.Nome}>
                {oil.Nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight-input" className="text-sm font-medium">
          Peso (gramas)
        </Label>
        <Input
          id="weight-input"
          type="number"
          min="1"
          placeholder="Ex: 100"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          data-testid="input-weight"
        />
      </div>

      <Button
        onClick={handleAddOil}
        disabled={!isValid}
        className="w-full"
        data-testid="button-add-oil"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Óleo
      </Button>
    </div>
  );
}
