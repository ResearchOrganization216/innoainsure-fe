import { FC } from "react";
import { ProgressBar } from "primereact/progressbar";

interface RiskMeterProps {
  riskPercentage: number;
  riskLevel: string;
  isFallbackMode: boolean;
  isError: boolean;
}

export const RiskMeter: FC<RiskMeterProps> = ({
  riskPercentage,
  riskLevel,
  isFallbackMode,
  isError,
}) => {
  const getRiskColor = () => {
    if (riskLevel === "error") return "var(--red-500)";
    if (riskLevel.includes("high")) return "var(--red-500)";
    if (riskLevel.includes("medium")) return "var(--yellow-500)";
    return "var(--green-500)";
  };

  const getRiskTextColor = () => {
    if (riskLevel === "error") return "text-red-600";
    if (riskLevel.includes("high")) return "text-red-600";
    if (riskLevel.includes("medium")) return "text-yellow-600";
    return "text-green-600";
  };

  // Risk meter gauge indicator calculation
  const calculateGaugeRotation = () => {
    // If it's a complete error state with zero risk percentage
    if (riskPercentage === 0 && isError) {
      return 0; // Position at low end for error state
    }
    // Normal calculation - maps 0-100% to 0-180 degrees
    return (riskPercentage / 100) * 180;
  };

  return (
    <>
      {/* Risk Meter */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-48 h-24 mb-4">
          {/* Semi-circle background */}
          <div className="absolute w-full h-full rounded-t-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 overflow-hidden"></div>

          {/* White overlay */}
          <div className="absolute w-44 h-full rounded-t-full bg-white top-2 left-2"></div>

          {/* Gauge needle */}
          <div
            className="absolute w-1 h-20 bg-gray-800 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${
                calculateGaugeRotation() - 90
              }deg)`,
            }}></div>

          {/* Center point of gauge */}
          <div className="absolute w-4 h-4 rounded-full bg-gray-800 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-0"></div>
        </div>

        {/* Percentage display */}
        <div className="text-center">
          <span className={`text-4xl font-bold ${getRiskTextColor()}`}>
            {riskPercentage.toFixed(1)}%
          </span>
          {(isFallbackMode || isError) && (
            <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Fallback Estimate
            </span>
          )}
        </div>

        {/* Risk scale labels */}
        <div className="flex justify-between w-48 mt-2 text-xs font-medium text-gray-600">
          <span>LOW RISK</span>
          <span>HIGH RISK</span>
        </div>
      </div>
      {/* Standard progress bar (keeping as alternative visualization) */}
      <div className="mb-8">
        <ProgressBar
          value={riskPercentage}
          showValue={false}
          className="h-2"
          style={{ backgroundColor: "var(--surface-200)" }}
          color={getRiskColor()}
        />
      </div>
    </>
  );
};
