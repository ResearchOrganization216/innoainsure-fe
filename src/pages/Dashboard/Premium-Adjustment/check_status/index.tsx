import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dropdown } from "primereact/dropdown";
import PremiumLoad from "@/components/PremiumLoad";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface RiskResponse {
  explanation: string;
  predicted_claim_risk_rank: number;
  predicted_market_risk_score: number;
  predicted_spare_parts_risk_percentage: number;
  premium_adjustment: number;
  premium_adjustment_percentage: number;
  total_risk_score: number;
  previous_premium: number;
  previous_risk: number;
}

const vehicleTypeOptions = [
  { label: "Motorbike", value: "motorbike" },
  { label: "Car", value: "car" },
  { label: "Van", value: "van" },
  { label: "ThreeWheel", value: "threewheel" },
  { label: "Bus", value: "bus" },
  { label: "Pickup", value: "pickup" },
];

const PremiumAdjustment: React.FC = () => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [mileage, setMileage] = useState<number | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [riskData, setRiskData] = useState<RiskResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { id } = useParams();

  const [isExplanationVisible, setIsExplanationVisible] =
    useState<boolean>(false);

  const header = (
    <div className='bg-gradient-to-r to-indigo-900 from-indigo-700 p-6 text-white'>
      <h2 className='text-2xl font-bold mb-2'>Check Premium Adjustment</h2>
      <p className='text-blue-100 opacity-80'>
        Enter vehicle details to see the premium adjustment
      </p>
    </div>
  );

  const header2 = (
    <div className='text-center mb-5 mt-2'>
      <h3 className='text-xl font-bold text-indigo-700'>
        Premium Assessment Summary
      </h3>
      <p className='text-gray-500'>
        Here's detailed risk and premium adjustment information:
      </p>
    </div>
  );

  //get values by id
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5005/api/vehicles/user/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.vehicles && data.vehicles.length > 0) {
            const vehicle = data.vehicles[0]; // Get the first vehicle

            setMake(vehicle.make || "");
            setModel(vehicle.model || "");
            setVehicleType(vehicle.vehicle_type || "");
            setYear(vehicle.year ?? new Date().getFullYear());
            setMileage(parseFloat(vehicle.mileage) || 0); // Ensure mileage is a number
          }
        })
        .catch((error) => console.error("Error fetching vehicle:", error));
    }
  }, [id]);

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
        id,
      };

      const response = await fetch("http://127.0.0.1:5005/api/vehicles/risk", {
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

  const handleAcceptPlan = async () => {
    if (!riskData) {
      setErrorMessage("No risk data available to submit.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const requestData = {
      make,
      model,
      vehicle_type: vehicleType,
      year,
      mileage,
      riskData,
      id,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5005/api/vehicles/accept-plan",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to accept plan");
      }

      // Handle success (you can display a success message or update UI)
      toast.success("Plan accepted successfully");

      //hide results
      setRiskData(null);
    } catch (error: any) {
      setErrorMessage(error.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleExplanation = () => {
    setIsExplanationVisible(!isExplanationVisible);
  };

  useEffect(() => {
    if (!loading && riskData) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [loading, riskData]);

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

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Vehicle Details Section */}
            <div className='bg-white'>
              <h3 className='text-2xl font-semibold text-indigo-800 mb-4'>
                Vehicle Details
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Vehicle Type Dropdown */}
                <div className='field'>
                  <label
                    htmlFor='vehicleType'
                    className='text-lg font-medium text-gray-700'>
                    Vehicle Type<span className='text-red-500'>* </span>
                  </label>
                  <Dropdown
                    id='vehicleType'
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.value)}
                    options={vehicleTypeOptions}
                    required
                    className='p-dropdown-lg w-full mt-2'
                    placeholder='Select Vehicle Type'
                  />
                </div>

                {/* Make Input */}
                <div className='field'>
                  <label
                    htmlFor='make'
                    className='text-lg font-medium text-gray-700'>
                    Make<span className='text-red-500'>* </span>
                  </label>
                  <InputText
                    id='make'
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                    className='p-inputtext-lg mt-2'
                  />
                </div>

                {/* Model Input */}
                <div className='field'>
                  <label
                    htmlFor='model'
                    className='text-lg font-medium text-gray-700'>
                    Model<span className='text-red-500'>* </span>
                  </label>
                  <InputText
                    id='model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                    className='p-inputtext-lg mt-2'
                  />
                </div>

                {/* Year Input */}
                <div className='field'>
                  <label
                    htmlFor='year'
                    className='text-lg font-medium text-gray-700'>
                    Year<span className='text-red-500'>* </span>
                  </label>
                  <InputNumber
                    id='year'
                    value={year ?? null}
                    onValueChange={(e) =>
                      setYear(e.value !== null ? e.value : undefined)
                    }
                    min={1990}
                    max={new Date().getFullYear()}
                    required
                    className='p-inputnumber-lg mt-2'
                    useGrouping={false}
                  />
                </div>

                {/* Mileage Input */}
                <div className='field'>
                  <label
                    htmlFor='mileage'
                    className='text-lg font-medium text-gray-700'>
                    Mileage<span className='text-red-500'>* </span>
                  </label>
                  <InputNumber
                    id='mileage'
                    value={mileage ?? null}
                    onValueChange={(e) =>
                      setMileage(e.value !== null ? e.value : undefined)
                    }
                    min={0}
                    required
                    className='p-inputnumber-lg mt-2'
                  />
                </div>
              </div>
            </div>

            {/* Submit Button Section */}
            <div className='flex justify-center'>
              <Button
                type='submit'
                label={loading ? "Submitting..." : "Check Premium Adjustment"}
                icon={loading ? null : "pi pi-chart-bar"}
                disabled={loading}
                className='p-button-lg bg-gradient-to-r from-blue-700 to-indigo-700 border-none hover:from-indigo-800 hover:to-blue-700 text-white w-full md:w-auto'
              />
            </div>
          </form>
        </div>
      </Card>
      {/* Loading Spinner */}
      {loading && (
        <div className='flex justify-center items-center mt-4'>
          <div className='flex flex-col items-center'>
            <PremiumLoad
              isLoading={loading}
              message='Communicating with Insurance Agent'
            />
          </div>
        </div>
      )}

      {/* Display Results */}
      {!loading && riskData && (
        <Card
          header={header2}
          className='shadow-xl border-0 overflow-hidden mt-4  bg-gradient-to-r from-green-50 to-blue-50'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Market Risk */}
            <div className='flex items-center justify-between p-3 bg-green-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                Market Risk Score
              </div>
              <div className='text-lg font-bold text-green-700'>
                {riskData.predicted_market_risk_score.toFixed(2)}%
              </div>
            </div>

            {/* Spare Parts Risk */}
            <div className='flex items-center justify-between p-3 bg-yellow-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                Spare Parts Risk Score
              </div>
              <div className='text-lg font-bold text-yellow-700'>
                {riskData.predicted_spare_parts_risk_percentage.toFixed(2)}%
              </div>
            </div>

            {/* Claim Risk */}
            <div className='flex items-center justify-between p-3 bg-orange-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                Claim Risk Score
              </div>
              <div className='text-lg font-bold text-orange-700'>
                {riskData.predicted_claim_risk_rank.toFixed(2)}%
              </div>
            </div>

            {/* Previous Risk */}
            <div className='flex items-center justify-between p-3 bg-blue-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                Previous Risk Score
              </div>
              <div className='text-lg font-bold text-blue-700'>
                {riskData.previous_risk.toFixed(2)}%
              </div>
            </div>
            {/* New Risk */}
            <div className='flex items-center justify-between p-3 bg-indigo-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                New Risk Score
              </div>
              <div className='text-lg font-bold text-indigo-700'>
                {riskData.total_risk_score}%
              </div>
            </div>
            {/* Adjustment Percentage */}
            <div className='flex items-center justify-between p-3 bg-purple-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                Adjustment Percentage
              </div>
              <div className='text-lg font-bold text-purple-700'>
                {riskData.premium_adjustment_percentage}
              </div>
            </div>

            {/* Previous Premium */}
            <div className='flex items-center justify-between p-3 bg-teal-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                Previous Premium
              </div>
              <div className='text-lg font-bold text-teal-700'>
                Rs {riskData.previous_premium.toFixed(2)}
              </div>
            </div>

            {/* Suggested Premium */}
            <div className='flex items-center justify-between p-3 bg-pink-100 rounded-lg shadow-md'>
              <div className='text-sm font-semibold text-gray-700'>
                Suggested Premium
              </div>
              <div className='text-lg font-bold text-pink-700'>
                Rs {riskData.premium_adjustment.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Explanation Toggle */}
          <div className='mt-5 '>
            <Button
              className='p-button-text bg-white border-0'
              label={
                isExplanationVisible ? "Hide Explanation" : "Show Explanations"
              }
              icon={
                isExplanationVisible ? "pi pi-chevron-up" : "pi pi-chevron-down"
              }
              onClick={toggleExplanation}
              style={{ color: "black" }}
            />

            {isExplanationVisible && (
              <div className='mt-4 text-lg text-gray-700 font-medium'>
                <p>{riskData.explanation}</p>
              </div>
            )}
          </div>

          <div className='mt-5 text-center'>
            <Button
              label='Send Plan to Customer'
              icon='pi pi-check'
              className='p-button-lg bg-gradient-to-r from-blue-700 to-indigo-700 border-none hover:from-indigo-800 hover:to-blue-700'
              onClick={handleAcceptPlan}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default PremiumAdjustment;
