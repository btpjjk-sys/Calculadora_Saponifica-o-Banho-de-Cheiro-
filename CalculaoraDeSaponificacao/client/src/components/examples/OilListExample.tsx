import OilList from "../OilList";
import { Oleo, AtributosSabonete } from "@/lib/soapLogic";

const mockOils: Oleo[] = [
  new Oleo("Azeite de Oliva", 134, 188, new AtributosSabonete(12, 6, 6, 8, 7, 8, 6), 200),
  new Oleo("Óleo de Coco", 178, 250, new AtributosSabonete(4, 17, 18, 6, 16, 14, 15), 100),
];

export default function OilListExample() {
  return (
    <OilList
      oils={mockOils}
      onRemoveOil={(name) => console.log("Remove oil:", name)}
    />
  );
}
