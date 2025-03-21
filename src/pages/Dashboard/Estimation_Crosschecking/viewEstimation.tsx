// EstimationDetailsPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EstimationDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  // d sample values for form fields
  const [policyHolder, setPolicyHolder] = useState("Nuwan Perera");
  const [estimatedAmount, setEstimatedAmount] = useState("248,000");
  const [estimationRemark, setEstimationRemark] = useState(
    "No additional damage observed."
  );
  const [claimId, setClaimId] = useState("CLM001");

  // d estimation document PDF URL
  const estimationPdfUrl =
    "https://storage.googleapis.com/innoa-bucket/claim_documents/Garage_Damage_Estimation_Report_2.pdf";

  // Modal state for validation popup and loading spinner
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Sample data for spare parts table
  const spareParts = [
    {
      name: "Front Bumper",
      estimated: "LKR 35,000",
      retrieved: 31000,
      provider: "Sanath Motors",
      contact: "0771234567",
    },
    {
      name: "Headlight",
      estimated: "LKR 50,000",
      retrieved: 48000,
      provider: "HLC Holdings",
      contact: "0772345678",
    },
    {
      name: "Left Fender",
      estimated: "LKR 12,000",
      retrieved: 11000,
      provider: "Sanath Motors",
      contact: "0773456789",
    },
    {
      name: "Grille",
      estimated: "LKR 20,000",
      retrieved: 19000,
      provider: "Kumara Motors",
      contact: "0774567890",
    },
    {
      name: "Rear Bumper",
      estimated: "LKR 35,000",
      retrieved: 14000,
      provider: "HLC Holdings",
      contact: "0771234567",
    },
    {
      name: "Windshield",
      estimated: "LKR 20,000",
      retrieved: 12000,
      provider: "Nuwan Motors",
      contact: "0772345678",
    },
    {
      name: "Side Mirror",
      estimated: "LKR 23,500",
      retrieved: 23000,
      provider: "Sanath Motors",
      contact: "0773456789",
    },
    {
      name: "Tire",
      estimated: "LKR 8,500",
      retrieved: 8000,
      provider: "Nimal Motors",
      contact: "0774567890",
    },
    {
      name: "Brake Pad",
      estimated: "LKR 14,000",
      retrieved: 12000,
      provider: "Ruwanga Motors",
      contact: "0771234567",
    },
    {
      name: "Exhaust",
      estimated: "LKR 30,000",
      retrieved: 24000,
      provider: "Sanath Motors",
      contact: "0772345678",
    },
  ];

  // Calculate total retrieved price
  const totalRetrieved = spareParts.reduce(
    (total, part) => total + part.retrieved,
    0
  );

  // Handle form submission (for the estimation details page)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could add API logic if needed.
    navigate("/home");
  };

  // Handle Validate Estimation button click
  const handleValidateEstimation = () => {
    setIsModalLoading(true);
    // Wait 3 seconds before showing the modal
    setTimeout(() => {
      setIsModalLoading(false);
      setIsModalOpen(true);
    }, 3000);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Estimation Details</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleValidateEstimation}
        >
          Validate Estimation
        </button>
      </div>

      {/* Estimation Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two-field row for Policy Holder and Estimated Amount */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Policy Holder</label>
            <input
              type="text"
              value={policyHolder}
              onChange={(e) => setPolicyHolder(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Estimated Amount</label>
            <input
              type="text"
              value={estimatedAmount}
              onChange={(e) => setEstimatedAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        {/* Full-width row for Claim ID */}
        <div>
          <label className="block font-semibold mb-1">Claim ID</label>
          <input
            type="text"
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Full-width row for Estimation Remark */}
        <div>
          <label className="block font-semibold mb-1">Estimation Remark</label>
          <textarea
            value={estimationRemark}
            onChange={(e) => setEstimationRemark(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        {/* Display d PDF (as an iframe) */}
        <div>
          <label className="block font-semibold mb-1">
            Estimation Document
          </label>
          <div className="w-full h-[600px] border border-gray-300 rounded overflow-hidden">
            <iframe
              src={estimationPdfUrl}
              style={{ width: "100%", height: "100%" }}
              frameBorder="0"
              title="Estimation PDF"
            />
          </div>
        </div>
      </form>

      {/* Loading Modal */}
      {isModalLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded w-[90%] max-w-xl">
            <div className="flex items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-4"></div>
              <span className="text-xl">Analyzing Estimation...</span>
            </div>
          </div>
        </div>
      )}

      {/* Validation Modal */}
      {isModalOpen && !isModalLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className="bg-white p-4 rounded w-[90%] max-w-xl"
            style={{ maxHeight: "70vh", overflowY: "auto" }}
          >
            <h2 className="text-2xl font-bold mb-4">
              System Generated Estimation
            </h2>
            <p className="mb-4 font-semibold">
              Vehicle Model: Suzuki Shift 2018
            </p>
            <div className="overflow-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-left">
                      Spare Part Name
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left">
                      Estimated Price
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left">
                      Retrieved Price
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left">
                      Provider
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-left">
                      Provider Contact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {spareParts.map((part, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="px-4 py-2 border border-gray-300">
                        {part.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {part.estimated}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        LKR {part.retrieved.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {part.provider}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {part.contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <p className="font-bold">Generated Estimation: LKR 202,000</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-purple-700 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

export default EstimationDetailsPage;
