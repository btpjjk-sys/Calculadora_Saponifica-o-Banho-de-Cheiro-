import { Card } from "@/components/ui/card";
import { AtributosSabonete } from "@/lib/soapLogic";
import AttributeBar from "./AttributeBar";

interface AttributesPanelProps {
  attributes: AtributosSabonete;
}

const attributeLabels: Record<keyof AtributosSabonete, string> = {
  dureza: "Dureza",
  limpeza: "Limpeza",
  hidratacao: "Hidratação",
  bolha: "Espuma",
  persistencia: "Persistência",
  solubilidade: "Solubilidade",
  secagem: "Secagem",
};

export default function AttributesPanel({ attributes }: AttributesPanelProps) {
  const attributeEntries = Object.entries(attributeLabels) as [keyof AtributosSabonete, string][];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Atributos do Sabonete</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Verde = Ideal (10) | Amarelo = Aceitável (5-15) | Vermelho = Fora do ideal (0-4 ou 16-20)
      </p>
      <div className="space-y-4">
        {attributeEntries.map(([key, label]) => (
          <AttributeBar
            key={key}
            name={label}
            value={attributes[key]}
          />
        ))}
      </div>
    </Card>
  );
}
