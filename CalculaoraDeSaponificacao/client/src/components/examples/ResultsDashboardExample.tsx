import ResultsDashboard from "../ResultsDashboard";

export default function ResultsDashboardExample() {
  return (
    <ResultsDashboard
      baseAmount={42.35}
      waterAmount={12.71}
      totalOilWeight={300}
      baseType="NaOH"
    />
  );
}
