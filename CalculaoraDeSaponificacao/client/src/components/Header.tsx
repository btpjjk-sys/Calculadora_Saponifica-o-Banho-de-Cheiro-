import { Beaker } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Beaker className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Calculadora de Saponificação</h1>
            <p className="text-sm text-muted-foreground">
              Calcule sua receita de sabão artesanal com precisão
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
