// ClaimManagement.tsx
import CommonTable from "@/components/CommonTable"; // adjust path as needed
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";

const headers = [
  { key: "CLAIM_CODE", label: "Claim Code" },
  { key: "POLICY_HOLDER_NAME", label: "Policy Holder Name" },
  { key: "CLAIM_STATUS", label: "Claim Status" },
  { key: "CLAIM_AMOUNT", label: "Claim Amount" },
  { key: "CREATED_DATE", label: "Created Date" },
];

const sampleClaims = [
  {
    CLAIM_CODE: "CLM001",
    POLICY_HOLDER_NAME: "John Doe",
    CLAIM_STATUS: "Pending",
    CLAIM_AMOUNT: "", // Empty for pending
    CREATED_DATE: "2025/03/15",
  },
  {
    CLAIM_CODE: "CLM002",
    POLICY_HOLDER_NAME: "Jane Smith",
    CLAIM_STATUS: "Settled",
    CLAIM_AMOUNT: "5000",
    CREATED_DATE: "2025/03/16",
  },
  {
    CLAIM_CODE: "CLM003",
    POLICY_HOLDER_NAME: "Alice Johnson",
    CLAIM_STATUS: "Rejected",
    CLAIM_AMOUNT: "3000",
    CREATED_DATE: "2025/03/19",
  },
  {
    CLAIM_CODE: "CLM004",
    POLICY_HOLDER_NAME: "Bob Brown",
    CLAIM_STATUS: "Settled",
    CLAIM_AMOUNT: "4000",
    CREATED_DATE: "2025/03/18",
  },
];

const customRenderers = {
  CLAIM_STATUS: (value: string, item: any) => {
    let dotColor = "";
    if (value === "Pending") {
      dotColor = "yellow";
    } else if (value === "Settled") {
      dotColor = "green";
    } else if (value === "Rejected") {
      dotColor = "red";
    }
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: dotColor,
            marginRight: 5,
          }}
        />
        <span>{value}</span>
      </div>
    );
  },
};

const ClaimManagement: React.FC = () => {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate("/dashboard/claim-management/view-record");
  };

  const onDelete = () => {};

  const header = (
    <div className="bg-gradient-to-r to-indigo-900 from-indigo-700 p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Claim Management</h2>
      <p className="text-blue-100 opacity-80">
        Enter the details of the claim below
      </p>
    </div>
  );

  return (
    <div className="max-w-auto mx-auto p-6">
      <Card header={header} className="shadow-lg border-0 overflow-hidden">
        <CommonTable
          headers={headers}
          data={sampleClaims}
          customRenderers={customRenderers}
          includeActions
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Card>
    </div>
  );
};

export default ClaimManagement;
