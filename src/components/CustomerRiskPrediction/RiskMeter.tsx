import React, { FC } from "react";

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

  const getRiskBgColor = () => {
    if (riskLevel === "error") return "bg-red-100";
    if (riskLevel.includes("high")) return "bg-red-100";
    if (riskLevel.includes("medium")) return "bg-yellow-100";
    return "bg-green-100";
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
      <div className="flex flex-col items-center mb-6">
        {/* Modern gauge design */}
        <div className="relative w-56 h-28 mb-6">
          {/* Semi-circle background with smooth gradient */}
          <div className="absolute w-full h-full rounded-t-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 overflow-hidden opacity-80"></div>

          {/* Inner white overlay with shadow for depth */}
          <div className="absolute w-52 h-full rounded-t-full bg-white top-2 left-2 shadow-inner"></div>

          {/* Tick marks for gauge */}
          <div className="absolute w-full h-full">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-3 bg-gray-300 rounded-full bottom-0"
                style={{
                  left: `${i * 16.67}%`,
                  transform: `rotate(${i * 30 - 90}deg)`,
                  transformOrigin: "bottom",
                }}></div>
            ))}
          </div>

          {/* Gauge needle with black color */}
          <div
            className="absolute w-1 h-24 bg-black bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom transition-all duration-700 ease-out"
            style={{
              transform: `translateX(-50%) rotate(${
                calculateGaugeRotation() - 90
              }deg)`,
              boxShadow: "0 0 8px rgba(0,0,0,0.2)",
              borderRadius: "4px",
            }}></div>

          {/* Center point of gauge */}
          <div className="absolute w-5 h-5 rounded-full bg-black bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-0 shadow-md"></div>
        </div>

        {/* Risk level label */}
        <div
          className={`text-xs font-semibold mb-2 px-3 py-1 rounded-full ${getRiskBgColor()} ${getRiskTextColor()}`}>
          {riskLevel.toUpperCase()}
        </div>

        {/* Percentage display */}
        <div className="text-center">
          <span className={`text-4xl font-bold ${getRiskTextColor()}`}>
            {riskPercentage.toFixed(1)}%
          </span>
          {(isFallbackMode || isError) && (
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              Fallback Estimate
            </span>
          )}
        </div>

        {/* Risk scale labels */}
        <div className="flex justify-between w-56 mt-3 text-xs font-medium text-gray-500">
          <span className="text-green-500 font-semibold">LOW RISK</span>
          <span className="text-gray-400">|</span>
          <span className="text-yellow-500 font-semibold">MEDIUM</span>
          <span className="text-gray-400">|</span>
          <span className="text-red-500 font-semibold">HIGH RISK</span>
        </div>
      </div>

      {/* Modern progress bar */}
      <div className="mb-4">
        <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${riskPercentage}%`,
              backgroundColor: getRiskColor(),
              boxShadow: `0 0 8px ${getRiskColor()}`,
            }}></div>
        </div>
      </div>
    </>
  );
};
