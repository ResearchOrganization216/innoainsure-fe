// ClaimManagement.tsx
import CommonTable from "@/components/CommonTable";
import React from "react";
import { useNavigate } from "react-router-dom";

const headers = [
  { key: "CLAIM_CODE", label: "Attached Claim" },
  { key: "SUBMITTED_ESTIMATION", label: "Submitted Estimation" },
  { key: "POLICY_HOLDER", label: "Policy Holder" },
  { key: "STATUS", label: "Claim Status" },
  { key: "CREATED_DATE", label: "Created Date" },
];

const sampleClaims = [
  {
    CLAIM_CODE: "CLM001",
    SUBMITTED_ESTIMATION: "5000",
    POLICY_HOLDER: "John Doe",
    STATUS: "Pending",
    CREATED_DATE: "2025/03/15",
  },
  {
    CLAIM_CODE: "CLM002",
    SUBMITTED_ESTIMATION: "4500",
    POLICY_HOLDER: "Jane Smith",
    STATUS: "Settled",
    CREATED_DATE: "2025/03/16",
  },
  {
    CLAIM_CODE: "CLM003",
    SUBMITTED_ESTIMATION: "",
    POLICY_HOLDER: "Alice Johnson",
    STATUS: "Rejected",
    CREATED_DATE: "2025/03/19",
  },
  {
    CLAIM_CODE: "CLM004",
    SUBMITTED_ESTIMATION: "4000",
    POLICY_HOLDER: "Bob Brown",
    STATUS: "Settled",
    CREATED_DATE: "2025/03/18",
  },
];

const customRenderers = {
  STATUS: (value: string, item: any) => {
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

const onEdit = () => {};

const onDelete = () => {};

const ClaimManagement: React.FC = () => {
  const navigate = useNavigate();

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
