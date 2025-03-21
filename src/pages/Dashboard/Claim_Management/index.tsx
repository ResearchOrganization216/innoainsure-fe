// ClaimManagement.tsx
import CommonTable from "@/components/CommonTable"; // adjust path as needed
import React from "react";
import { useNavigate } from "react-router-dom";

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
    POLICY_HOLDER_NAME: "Nuwan Perera",
    CLAIM_STATUS: "Pending",
    CLAIM_AMOUNT: "",
    CREATED_DATE: "2025/03/15",
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

const onDelete = () => {};

const ClaimManagement: React.FC = () => {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate("/dashboard/claim-management/view-record");
  };

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-4">Claim Management</h1>
      <CommonTable
        headers={headers}
        data={sampleClaims}
        customRenderers={customRenderers}
        includeActions
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ClaimManagement;
