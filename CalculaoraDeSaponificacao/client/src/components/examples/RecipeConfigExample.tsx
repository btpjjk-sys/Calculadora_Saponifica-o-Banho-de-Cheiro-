import { useState } from "react";
import RecipeConfig from "../RecipeConfig";

export default function RecipeConfigExample() {
  const [baseType, setBaseType] = useState<"NaOH" | "KOH">("NaOH");
  const [superfat, setSuperfat] = useState(5);
  const [basePurity, setBasePurity] = useState(99);
  const [waterRatio, setWaterRatio] = useState(0.3);

  return (
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
  );
}
