import { FC, useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import axios from "axios";
import LoadingAnimation from "@/components/CustomerRiskPrediction/LoadingAnimation";
import { formatAIResponse } from "@/utils/CustomerRiskPrediction/formatAIResponse";
import { RiskMeter } from "@/components/CustomerRiskPrediction/RiskMeter";

interface FormData {
  age: number | null;
  gender: string;
  vehicleType: string;
  totalClaims: number | null;
  reason: string;
  premium: number | null;
  claimAmount: number | null;
  insuredPeriod: number | null;
}

interface ErrorDetail {
  error: string;
  status_code: number;
  step: string;
}

interface ApiResponse {
  errors: ErrorDetail[] | string[];
  explanation: string;
  requiredActions: string[];
  riskLevel: string;
  riskPercentage: number;
  status: string;
}

/* interface ResultProps {
  explanation: string;
}

interface ComponentProps {
  result: ResultProps;
  isFallbackMode: boolean;
}
 */
const CustomerRiskManagement: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: null,
    gender: "",
    vehicleType: "",
    totalClaims: null,
    reason: "",
    premium: null,
    claimAmount: null,
    insuredPeriod: null,
  });
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const vehicleOptions = [
    { label: "Private", value: "Private" },
    { label: "Hiring", value: "Hiring" },
  ];

  const reasonOptions = [
    { label: "Driver Fault", value: "Driver Fault" },
    { label: "3rd Party Fault", value: "3rd Party Fault" },
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      Object.values(formData).some((value) => value === null || value === "")
    ) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError(null);
    setIsFallbackMode(false);
    setResult(null); // Reset previous results

    try {
      console.log("Sending request to API...");
      const response = await axios.post<ApiResponse>(
        "http://127.0.0.1:5000/api/analyze",
        {
          age: formData.age!,
          gender: formData.gender,
          vehicleType: formData.vehicleType,
          totalClaims: formData.totalClaims!,
          reason: formData.reason,
          premium: formData.premium!,
          claimAmount: formData.claimAmount!,
          insuredPeriod: formData.insuredPeriod!,
        }
      );

      const data = response.data;
      console.log("API Response Success:", data);

      // Check if the response contains fallback data
      if (data.status === "error") {
        console.log("Detected error status in successful response");
        setResult(data);
        setIsFallbackMode(true);
      } else if (data.status === "success") {
        console.log("Success mode");
        setResult(data);
        setIsFallbackMode(false);
      } else {
        setError("Analysis failed. Please check your inputs.");
      }
    } catch (err: any) {
      console.error("API Error:", err);

      // Try to extract fallback data from error response if available
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        console.log("Error response data:", errorData);

        // Check if EITHER type of fallback data exists in the error response
        if (errorData.status === "error") {
          console.log("Error data found in response - setting as result");
          setResult(errorData);
          setIsFallbackMode(true);
          return;
        }
      }

      setError("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  // Custom header for the card
  const header = (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Customer Risk Assessment</h2>
      <p className="text-blue-100 opacity-80">
        Enter customer details to analyze insurance risk profile
      </p>
    </div>
  );

  const hasAssessmentData =
    result &&
    ((result.riskLevel && result.riskLevel !== "error") ||
      (result.requiredActions && result.requiredActions.length > 0));

  return (
    <div className="max-w-auto mx-auto p-6">
      {/* AI Thinking Animation Overlay */}
      <LoadingAnimation loading={loading} />

      {/* Main Card */}
      <Card header={header} className="shadow-lg border-0 overflow-hidden">
        <div className="p-4">
          {error && (
            <Message
              severity="error"
              text={error}
              className="w-full mb-6"
              style={{ borderRadius: "6px" }}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Age Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Age*
              </label>
              <InputNumber
                value={formData.age}
                onValueChange={(e) => handleInputChange("age", e.value)}
                min={18}
                max={100}
                placeholder="Enter age"
                className="w-full"
                inputClassName="w-full"
                showButtons={false}
              />
            </div>

            {/* Gender Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Gender*
              </label>
              <Dropdown
                value={formData.gender}
                options={genderOptions}
                onChange={(e) => handleInputChange("gender", e.value)}
                placeholder="Select Gender"
                className="w-full"
              />
            </div>

            {/* Vehicle Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Type*
              </label>
              <Dropdown
                value={formData.vehicleType}
                options={vehicleOptions}
                onChange={(e) => handleInputChange("vehicleType", e.value)}
                placeholder="Select Vehicle Type"
                className="w-full"
              />
            </div>

            {/* Total Claims Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Total Claims*
              </label>
              <InputNumber
                value={formData.totalClaims}
                onValueChange={(e) => handleInputChange("totalClaims", e.value)}
                min={0}
                placeholder="Enter total claims"
                className="w-full"
                inputClassName="w-full"
                showButtons={false}
              />
            </div>

            {/* Claim Reason Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Claim Reason*
              </label>
              <Dropdown
                value={formData.reason}
                options={reasonOptions}
                onChange={(e) => handleInputChange("reason", e.value)}
                placeholder="Select Claim Reason"
                className="w-full"
              />
            </div>

            {/* Premium Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Premium (LKR)*
              </label>
              <InputNumber
                value={formData.premium}
                mode="currency"
                currency="LKR"
                locale="en-LK"
                onValueChange={(e) => handleInputChange("premium", e.value)}
                className="w-full"
                inputClassName="w-full"
                showButtons={false}
              />
            </div>

            {/* Claim Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Claim Amount (LKR)*
              </label>
              <InputNumber
                value={formData.claimAmount}
                mode="currency"
                currency="LKR"
                locale="en-LK"
                onValueChange={(e) => handleInputChange("claimAmount", e.value)}
                className="w-full"
                inputClassName="w-full"
                showButtons={false}
              />
            </div>

            {/* Insured Period Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Insured Period (Years)*
              </label>
              <InputNumber
                value={formData.insuredPeriod}
                onValueChange={(e) =>
                  handleInputChange("insuredPeriod", e.value)
                }
                min={1}
                placeholder="Enter insured period"
                className="w-full"
                inputClassName="w-full"
                showButtons={false}
              />
            </div>
          </div>

          <Button
            label="Analyze Risk"
            icon="pi pi-chart-bar"
            loading={loading}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 border-none hover:from-blue-700 hover:to-indigo-800"
          />
        </div>

        {result && (
          <>
            <Divider className="my-4" />
            <div className="p-4">
              {/* Error state banner - always show when status is error */}
              {result.status === "error" && (
                <Message
                  severity={hasAssessmentData ? "warn" : "error"}
                  className="w-full mb-4"
                  style={{ borderRadius: "6px" }}
                  content={
                    <div className="p-2">
                      <h5 className="m-0 p-0 font-bold">
                        {hasAssessmentData
                          ? "Using Fallback Assessment"
                          : "Risk Assessment Service Error"}
                      </h5>
                      <p className="m-0 mt-1">
                        {hasAssessmentData
                          ? "The advanced risk assessment service is temporarily unavailable. Showing alternative assessment based on available data."
                          : "The risk assessment service encountered an error. A list of recommended actions has been provided."}
                      </p>
                      {result.errors && result.errors.length > 0 && (
                        <div className="text-xs mt-2">
                          {typeof result.errors[0] === "string"
                            ? result.errors[0]
                            : `Service error: ${result.errors[0].error} (${result.errors[0].step})`}
                        </div>
                      )}
                    </div>
                  }
                />
              )}

              {/* Fallback mode banner (only shown when in fallback mode but not error status) */}
              {isFallbackMode && result.status !== "error" && (
                <Message
                  severity="warn"
                  className="w-full mb-4"
                  style={{ borderRadius: "6px" }}
                  content={
                    <div className="p-2">
                      <h5 className="m-0 p-0 font-bold">
                        Using Fallback Assessment
                      </h5>
                      <p className="m-0 mt-1">
                        The advanced risk assessment service is temporarily
                        unavailable. Showing alternative assessment based on
                        available data.
                      </p>
                      {result.errors && result.errors.length > 0 && (
                        <div className="text-xs mt-2 text-yellow-800">
                          {typeof result.errors[0] === "string"
                            ? result.errors[0]
                            : `Service error: ${result.errors[0].error} (${result.errors[0].step})`}
                        </div>
                      )}
                    </div>
                  }
                />
              )}

              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {result.status === "error" &&
                  (!hasAssessmentData || result.riskLevel === "error")
                    ? "Risk Assessment Error"
                    : "Risk Assessment Result"}
                </h3>
                {result.riskLevel && result.riskLevel !== "error" ? (
                  <span
                    className={`text-sm px-3 py-1 mt-2 md:mt-0 font-medium rounded-full ${
                      result.riskLevel.includes("high")
                        ? "bg-red-500 text-white"
                        : result.riskLevel.includes("medium")
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-white"
                    }`}>
                    {result.riskLevel.replace("_", " ").toUpperCase()}
                  </span>
                ) : (
                  result.status === "error" && (
                    <span className="text-sm px-3 py-1 mt-2 md:mt-0 font-medium rounded-full bg-red-500 text-white">
                      ERROR
                    </span>
                  )
                )}
              </div>

              {/* Only show meter for states with actual risk data */}
              {hasAssessmentData && (
                <>
                  <RiskMeter
                    riskPercentage={result.riskPercentage}
                    riskLevel={result.riskLevel}
                    isError={result.status === "error"}
                    isFallbackMode={false}
                  />
                  <Divider className="my-6" />
                </>
              )}

              {/* Explanation box - only show if there's meaningful content */}
              {result.explanation &&
                result.explanation !== "Assessment unavailable" && (
                  <div
                    className={`${
                      result.status === "error" || isFallbackMode
                        ? "bg-blue-50 border-blue-200"
                        : "bg-blue-50"
                    } p-5 rounded-lg mb-6 border shadow-sm`}>
                    <div className="flex items-start">
                      <i
                        className={`${
                          result.status === "error" || isFallbackMode
                            ? "pi pi-exclamation-triangle text-yellow-500"
                            : "pi pi-info-circle text-blue-500"
                        } mr-3 mt-1 flex-shrink-0`}
                        style={{ fontSize: "1.2rem" }}></i>
                      {formatAIResponse(result.explanation)}
                    </div>
                  </div>
                )}

              {/* Always show the required actions if present */}
              {result.requiredActions && result.requiredActions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-4">
                    {!hasAssessmentData && result.status === "error"
                      ? "Error Recovery Actions"
                      : result.status === "error" || isFallbackMode
                      ? "Recommended Actions (Based on Limited Data)"
                      : "Recommended Actions"}
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {result.requiredActions.map((action, index) => (
                      <div
                        key={index}
                        className={`flex items-start ${
                          !hasAssessmentData && result.status === "error"
                            ? "bg-red-50"
                            : result.status === "error" || isFallbackMode
                            ? "bg-blue-50"
                            : "bg-white"
                        } p-4 rounded-lg border ${
                          !hasAssessmentData && result.status === "error"
                            ? "border-red-200"
                            : "border-gray-200"
                        } shadow-sm`}>
                        <i
                          className={`${
                            !hasAssessmentData && result.status === "error"
                              ? "pi pi-exclamation-circle text-red-500"
                              : result.status === "error" || isFallbackMode
                              ? "pi pi-exclamation-circle text-yellow-500"
                              : "pi pi-check-circle text-green-500"
                          } mr-3 mt-1`}
                          style={{ fontSize: "1.2rem" }}></i>
                        <span className="text-gray-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default CustomerRiskManagement;
