import AttributesPanel from "../AttributesPanel";
import { AtributosSabonete } from "@/lib/soapLogic";

const mockAttributes = new AtributosSabonete(9.3, 10.0, 11.5, 8.2, 10.5, 10.3, 9.5);

export default function AttributesPanelExample() {
  return <AttributesPanel attributes={mockAttributes} />;
}
