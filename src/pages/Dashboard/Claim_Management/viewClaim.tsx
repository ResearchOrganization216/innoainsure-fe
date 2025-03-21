// ClaimDetailsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClaimDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  // d claim details
  const [claimCode] = useState("CLM001");
  const [claimDescription] = useState("Accident on highway");
  const [policyHolderEmail] = useState("john.doe@example.com");
  const [estimatedAmount] = useState("5000");
  const [claimAmount] = useState("4500");
  const [numCars] = useState("2");
  const [vehicleAge] = useState("5");
  const [witnessPresent] = useState("Yes");
  const [policeReportFiled] = useState("Yes");
  const [driverGender] = useState("Male");
  const [vehicleCategory] = useState("Suzuki Shift 2018");
  const [policyType] = useState("Full");
  const [driverRating] = useState("4.5");
  const [claimStatus] = useState("Pending");
  const [accidentLocation] = useState("Urban Area");

  // Fraud risk analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [riskPercentage, setRiskPercentage] = useState<number | null>(null);
  const [riskMessage, setRiskMessage] = useState("");

  // d image URLs for claim documents
  const imageUrls = [
    "https://storage.googleapis.com/innoa-bucket/claim_documents/damaged-car-3.jpg",
    "https://storage.googleapis.com/innoa-bucket/claim_documents/damaged-car-4.jpg",
  ];

  const handleAnalyzeFraudRisk = () => {
    setIsAnalyzing(true);
    setRiskPercentage(null);
    setRiskMessage("");
    setTimeout(() => {
      const percentage = Math.floor(Math.random() * 101); // Random percentage between 0 and 100
      setRiskPercentage(percentage);
      if (percentage < 30) {
        setRiskMessage(
          `Low Fraud Risk (${percentage}%). This claim record is unlikely to be fraudulent.`
        );
      } else if (percentage >= 30 && percentage <= 70) {
        setRiskMessage(
          `Medium Fraud Risk (${percentage}%). This claim record shows moderate risk.`
        );
      } else {
        setRiskMessage(
          `High Fraud Risk (${percentage}%). Further inspection is required.`
        );
      }
      setIsAnalyzing(false);
    }, 5000);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Claim Details</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAnalyzeFraudRisk}
        >
          Analyze Fraud Risk
        </button>
      </div>

      {/* Fraud Risk Analysis */}
      {isAnalyzing && (
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-4"></div>
          <span className="text-xl">Analyzing Fraud Risk...</span>
        </div>
      )}
      {riskPercentage !== null && !isAnalyzing && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Fraud Risk Analysis</h2>
          <p className="text-lg">{riskMessage}</p>
        </div>
      )}

      {/* Claim Details Form */}
      <div className="grid grid-cols-2 gap-4">
        {/* Full-width row for Claim Code */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Claim Code</label>
          <input
            type="text"
            value={claimCode}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Full-width row for Claim Description */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Claim Description</label>
          <input
            type="text"
            value={claimDescription}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Two-column rows for other fields */}
        <div>
          <label className="block font-semibold mb-1">
            Policy Holder Email
          </label>
          <input
            type="email"
            value={policyHolderEmail}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Estimated Amount</label>
          <input
            type="text"
            value={estimatedAmount}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Claim Amount</label>
          <input
            type="text"
            value={claimAmount}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Number of Cars</label>
          <input
            type="text"
            value={numCars}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Vehicle Age</label>
          <input
            type="text"
            value={vehicleAge}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Witness Present</label>
          <input
            type="text"
            value={witnessPresent}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Police Report Filed
          </label>
          <input
            type="text"
            value={policeReportFiled}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Driver Gender</label>
          <input
            type="text"
            value={driverGender}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Vehicle Category</label>
          <input
            type="text"
            value={vehicleCategory}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Policy Type</label>
          <input
            type="text"
            value={policyType}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Driver Rating</label>
          <input
            type="text"
            value={driverRating}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Claim Status</label>
          <input
            type="text"
            value={claimStatus}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Full-width row for Accident Location */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Accident Location</label>
          <input
            type="text"
            value={accidentLocation}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* d images */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Claim Documents</h2>
        <div className="flex gap-4">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Document ${index + 1}`}
              className="w-[100px] h-[100px] object-cover"
            />
          ))}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="mt-8">
        <button
          className="bg-purple-700 text-white px-6 py-3 rounded"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ClaimDetailsPage;
