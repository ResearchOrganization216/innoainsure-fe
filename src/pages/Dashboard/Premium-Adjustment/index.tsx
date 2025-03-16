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

  const header = (
    <div className='bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white'>
      <h2 className='text-2xl font-bold mb-2'>Premium Adjustment</h2>
      <p className='text-blue-100 opacity-80'>
        Enter vehicle details to see the premium adjustment
      </p>
    </div>
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setRiskData(null);

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

      setRiskData(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-auto mx-auto p-6'>
      <Card header={header} className='shadow-lg border-0 overflow-hidden'>
        <div className='p-4'>
          {/* Error Message (Centered at Top) */}
          {errorMessage && (
            <div className='w-full flex justify-center text-center mb-4'>
              <div className='p-3 bg-red-100 text-red-600 font-bold rounded-lg shadow-md'>
                ❌ {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className=''>
            {/* Inputs Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
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
                  value={year ?? null}
                  onValueChange={(e) =>
                    setYear(e.value !== null ? e.value : undefined)
                  }
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
                  value={mileage ?? null}
                  onValueChange={(e) =>
                    setMileage(e.value !== null ? e.value : undefined)
                  }
                  min={0}
                  required
                  className='p-inputnumber-lg'
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center'>
              <Button
                type='submit'
                label={loading ? "Submitting..." : "Submit"}
                icon={loading ? null : "pi pi-check"}
                disabled={loading}
                className='p-button-lg mt-3'
              />
            </div>
          </form>
        </div>
      </Card>

      {/* Error Message */}

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
            <strong>Predicted Claim Risk Score: </strong>
            {riskData.predicted_claim_risk_rank}%
          </p>
          <p>
            <strong>Market Risk Score: </strong>
            {riskData.predicted_market_risk_score}%
          </p>
          <p>
            <strong>Predicted Price: </strong>
            {riskData.predicted_price}
          </p>
          <p>
            <strong>Spare Parts Risk Score: </strong>
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
