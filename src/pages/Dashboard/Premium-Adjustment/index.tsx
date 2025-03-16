import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Define response types
interface RiskResponse {
  explanation: string;
  predicted_claim_risk_rank: number;
  predicted_market_risk_score: number;
  predicted_price: number;
  predicted_spare_parts_risk_percentage: number;
  premium_adjustment: number;
  premium_adjustment_percentage: number;
  total_risk_score: number;
}

const PremiumAdjustment: React.FC = () => {
  // Form input states
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [mileage, setMileage] = useState<number | undefined>(undefined);

  // State for response and errors
  const [loading, setLoading] = useState<boolean>(false);
  const [riskData, setRiskData] = useState<RiskResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setErrorMessage(null); // Clear any previous errors
    setRiskData(null); // Clear previous results

    try {
      const requestData = {
        make,
        model,
        vehicle_type: vehicleType,
        year: year ?? null,
        mileage: mileage ?? null,
      };

      const response = await fetch("http://127.0.0.1:5000/api/vehicles/risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setRiskData(data); // Store the response data
    } catch (error: any) {
      setErrorMessage(error.message); // Store error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-column align-items-center'>
      <h1>Premium Adjustment</h1>
      <p>Enter vehicle details to calculate premium adjustments.</p>

      {/* Vehicle Form */}
      <form
        onSubmit={handleSubmit}
        className='flex flex-column align-items-center gap-3'>
        {/* Make Input */}
        <div className='field'>
          <label htmlFor='make'>Make:</label>
          <InputText
            id='make'
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
            className='p-inputtext-lg'
          />
        </div>

        {/* Model Input */}
        <div className='field'>
          <label htmlFor='model'>Model:</label>
          <InputText
            id='model'
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            className='p-inputtext-lg'
          />
        </div>

        {/* Vehicle Type Input */}
        <div className='field'>
          <label htmlFor='vehicleType'>Vehicle Type:</label>
          <InputText
            id='vehicleType'
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className='p-inputtext-lg'
          />
        </div>

        {/* Year Input */}
        <div className='field'>
          <label htmlFor='year'>Year:</label>
          <InputNumber
            id='year'
            value={year}
            onValueChange={(e) => setYear(e.value ?? undefined)}
            min={1990}
            max={new Date().getFullYear()}
            required
            className='p-inputnumber-lg'
          />
        </div>

        {/* Mileage Input */}
        <div className='field'>
          <label htmlFor='mileage'>Mileage:</label>
          <InputNumber
            id='mileage'
            value={mileage}
            onValueChange={(e) => setMileage(e.value ?? undefined)}
            min={0}
            required
            className='p-inputnumber-lg'
          />
        </div>

        {/* Submit Button */}
        <Button
          type='submit'
          label={loading ? "Submitting..." : "Submit"}
          icon={loading ? null : "pi pi-check"}
          disabled={loading}
          className='p-button-lg mt-3'
        />
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className='p-mt-3 p-text-center text-red-500 font-bold'>
          ❌ {errorMessage}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className='flex justify-content-center align-items-center mt-4'>
          <ProgressSpinner />
        </div>
      )}

      {/* Display Results */}
      {!loading && riskData && (
        <Card title='Risk Analysis' className='mt-4'>
          <p>{riskData.explanation}</p>
          <p>
            <strong>Predicted Risk Rank: </strong>
            {riskData.predicted_claim_risk_rank}
          </p>
          <p>
            <strong>Market Risk Score: </strong>
            {riskData.predicted_market_risk_score}
          </p>
          <p>
            <strong>Predicted Price: </strong>
            {riskData.predicted_price}
          </p>
          <p>
            <strong>Spare Parts Risk Percentage: </strong>
            {riskData.predicted_spare_parts_risk_percentage}%
          </p>
          <p>
            <strong>Premium Adjustment: </strong>
            Rs {riskData.premium_adjustment.toFixed(2)}
          </p>
          <p>
            <strong>Adjustment Percentage: </strong>
            {riskData.premium_adjustment_percentage}
          </p>
          <p>
            <strong>Total Risk Score: </strong>
            {riskData.total_risk_score}
          </p>
        </Card>
      )}
    </div>
  );
};

export default PremiumAdjustment;
