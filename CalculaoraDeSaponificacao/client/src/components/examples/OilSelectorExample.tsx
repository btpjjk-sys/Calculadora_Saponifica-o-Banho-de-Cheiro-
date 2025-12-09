import OilSelector from "../OilSelector";

export default function OilSelectorExample() {
  return (
    <OilSelector
      onAddOil={(oil) => console.log("Oil added:", oil)}
      selectedOilNames={[]}
    />
  );
}
