import { Button } from "primereact/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const RiskManagement: FC = () => {
  const navigate = useNavigate();

  const handleAddRecord = () => {
    navigate("/risk-management/add-record");
  };

  return (
    <div className="m-6">
      <div>This is the risk management section</div>
      <Button onClick={handleAddRecord}>Add record</Button>
    </div>
  );
};

export default RiskManagement;
