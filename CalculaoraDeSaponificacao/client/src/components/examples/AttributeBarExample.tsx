import AttributeBar from "../AttributeBar";

export default function AttributeBarExample() {
  return (
    <div className="space-y-4">
      <AttributeBar name="Dureza" value={10} />
      <AttributeBar name="Limpeza" value={7} />
      <AttributeBar name="Hidratação" value={3} />
    </div>
  );
}
