import { useState } from "react";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import OilSelector from "@/components/OilSelector";
import OilList from "@/components/OilList";
import RecipeConfig from "@/components/RecipeConfig";
import ResultsDashboard from "@/components/ResultsDashboard";
import AttributesPanel from "@/components/AttributesPanel";
import {
  Oleo,
  AtributosSabonete,
  Gerar_Receita_Saponificacao,
  ResultadosCalculadora,
} from "@/lib/soapLogic";

export default function Calculator() {
  const { toast } = useToast();
  const [selectedOils, setSelectedOils] = useState<Oleo[]>([]);
  const [baseType, setBaseType] = useState<"NaOH" | "KOH">("NaOH");
  const [superfat, setSuperfat] = useState(5);
  const [basePurity, setBasePurity] = useState(99);
  const [waterRatio, setWaterRatio] = useState(0.3);
  const [results, setResults] = useState<ResultadosCalculadora | null>(null);

  const handleAddOil = (oil: Oleo) => {
    setSelectedOils((prev) => [...prev, oil]);
    setResults(null);
    toast({
      title: "Óleo adicionado",
      description: `${oil.Nome} (${oil.Peso_gramas}g) foi adicionado à receita.`,
    });
  };

  const handleRemoveOil = (oilName: string) => {
    setSelectedOils((prev) => prev.filter((o) => o.Nome !== oilName));
    setResults(null);
    toast({
      title: "Óleo removido",
      description: `${oilName} foi removido da receita.`,
    });
  };

  const handleCalculate = () => {
    if (selectedOils.length === 0) {
      toast({
        title: "Nenhum óleo selecionado",
        description: "Adicione pelo menos um óleo para calcular a receita.",
        variant: "destructive",
      });
      return;
    }

    try {
      const calculatedResults = Gerar_Receita_Saponificacao(
        selectedOils,
        baseType,
        superfat,
        basePurity,
        waterRatio
      );
      setResults(calculatedResults);
      toast({
        title: "Receita calculada",
        description: "Confira os resultados abaixo!",
      });
    } catch (error) {
      toast({
        title: "Erro no cálculo",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  const totalOilWeight = selectedOils.reduce((sum, oil) => sum + oil.Peso_gramas, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Selecionar Óleos</h2>
              <OilSelector
                onAddOil={handleAddOil}
                selectedOilNames={selectedOils.map((o) => o.Nome)}
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Óleos da Receita</h2>
              <OilList oils={selectedOils} onRemoveOil={handleRemoveOil} />
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Configurações</h2>
              <RecipeConfig
                baseType={baseType}
                onBaseTypeChange={setBaseType}
                superfat={superfat}
                onSuperfatChange={setSuperfat}
                basePurity={basePurity}
                onBasePurityChange={setBasePurity}
                waterRatio={waterRatio}
                onWaterRatioChange={setWaterRatio}
              />
            </Card>

            <Button
              size="lg"
              onClick={handleCalculate}
              disabled={selectedOils.length === 0}
              className="w-full text-lg py-6"
              data-testid="button-calculate"
            >
              <CalculatorIcon className="w-5 h-5 mr-2" />
              Calcular Receita
            </Button>
          </div>

          <div className="space-y-8">
            {results ? (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Resultados</h2>
                  <ResultsDashboard
                    baseAmount={results.quantidade_base}
                    waterAmount={results.quantidade_agua}
                    totalOilWeight={totalOilWeight}
                    baseType={baseType}
                  />
                </div>

                <AttributesPanel attributes={results.atributos_finais} />
              </>
            ) : (
              <Card className="p-12 text-center">
                <CalculatorIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Pronto para calcular</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Adicione os óleos desejados, configure os parâmetros e clique em
                  "Calcular Receita" para ver os resultados.
                </p>
              </Card>
            )}

            {!results && selectedOils.length > 0 && (
              <AttributesPanel
                attributes={
                  new AtributosSabonete(
                    selectedOils.reduce(
                      (sum, o) =>
                        sum +
                        (o.Valores_Atributos.hidratacao * o.Peso_gramas) / totalOilWeight,
                      0
                    ),
                    selectedOils.reduce(
                      (sum, o) =>
                        sum +
                        (o.Valores_Atributos.limpeza * o.Peso_gramas) / totalOilWeight,
                      0
                    ),
                    selectedOils.reduce(
                      (sum, o) =>
                        sum +
                        (o.Valores_Atributos.bolha * o.Peso_gramas) / totalOilWeight,
                      0
                    ),
                    selectedOils.reduce(
                      (sum, o) =>
                        sum +
                        (o.Valores_Atributos.persistencia * o.Peso_gramas) / totalOilWeight,
                      0
                    ),
                    selectedOils.reduce(
                      (sum, o) =>
                        sum +
                        (o.Valores_Atributos.dureza * o.Peso_gramas) / totalOilWeight,
                      0
                    ),
                    selectedOils.reduce(
                      (sum, o) =>
                        sum +
                        (o.Valores_Atributos.solubilidade * o.Peso_gramas) / totalOilWeight,
                      0
                    ),
                    selectedOils.reduce(
                      (sum, o) =>
                        sum +
                        (o.Valores_Atributos.secagem * o.Peso_gramas) / totalOilWeight,
                      0
                    )
                  )
                }
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
