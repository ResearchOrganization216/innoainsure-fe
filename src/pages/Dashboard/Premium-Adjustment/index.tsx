import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomButton from "@/components/VehicleRiskPrediction/CustomButton";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";

interface Plan {
  new_premium: string;
  new_risk: string;
}

interface PolicyHolder {
  name: string;
  nic: string;
  contact_number: string;
  policy_renewal_date: string;
}

interface Vehicle {
  created_by: string;
  created_date: string;
  id: number;
  make: string;
  mileage: string;
  model: string;
  plan: {
    plan: Plan;
  };
  policy_holder: {
    policy_holder: PolicyHolder;
  };

  user_id: number;
  vehicle_type: string;
  year: number;
}

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const navigate = useNavigate();

  const header = (
    <div className='bg-gradient-to-r to-indigo-900 from-indigo-700 p-6 text-white'>
      <h2 className='text-2xl font-bold mb-2'>Current Premiums</h2>
      <p className='text-blue-100 opacity-80'>
        Check and adjust premiums for each vehicle
      </p>
    </div>
  );

  useEffect(() => {
    fetch("http://localhost:5005/api/vehicles/all")
      .then((response) => response.json())
      .then((data) => setVehicles(data.vehicles))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  const viewPremium = (id: number) => {
    navigate(`/dashboard/premium-list/adjustment/${id}`);
  };

  const renderActions = (rowData: Vehicle) => {
    return (
      <CustomButton
        label='Check Premium'
        icon='pi pi-money-bill'
        onClick={() => viewPremium(rowData.user_id)}
        className='w-full md:w-auto p-2'
      />
    );
  };

  return (
    <div className='max-w-auto mx-auto p-6'>
      <Card header={header} className='shadow-lg border-0 overflow-hidden'>
        <div className=''>
          <DataTable
            value={vehicles}
            paginator
            rows={5}
            responsiveLayout='scroll'
            className='rounded-lg overflow-hidden '>
            <Column
              header='Customer Info'
              body={(rowData) => (
                <div className='space-y-4'>
                  <div className='font-semibold text-lg text-gray-800'>
                    <strong>Name:</strong>{" "}
                    {rowData.policy_holder[0].policy_holder.name}
                  </div>
                  <div className='text-sm text-gray-600'>
                    <strong>NIC:</strong>{" "}
                    {rowData.policy_holder[0].policy_holder.nic}
                  </div>
                  <div className='text-sm text-gray-600'>
                    <strong>Contact:</strong>{" "}
                    {rowData.policy_holder[0].policy_holder.contact_number}
                  </div>
                  <div className='text-sm text-gray-600'>
                    <strong>Renewal Date:</strong>{" "}
                    {rowData.policy_holder[0].policy_holder.policy_renewal_date}
                  </div>
                </div>
              )}
              sortable
              className='bg-gray-50 border-b border-t border-gray-300'
            />

            <Column
              header='Vehicle Info'
              body={(rowData) => (
                <div className='space-y-4'>
                  <div className='font-semibold text-lg text-gray-800'>
                    <strong>Make:</strong> {rowData.make}
                  </div>
                  <div className='text-sm text-gray-600'>
                    <strong>Model:</strong> {rowData.model}
                  </div>
                  <div className='text-sm text-gray-600'>
                    <strong>Year:</strong> {rowData.year}
                  </div>
                  <div className='text-sm text-gray-600'>
                    <strong>Plate:</strong> XXX - XXXX
                  </div>
                </div>
              )}
              sortable
              className='bg-gray-50 border-b border-t border-gray-300'
            />

            <Column
              field='plan.plan.new_premium'
              header='Current Premium'
              sortable
              body={(rowData) => (
                <div className='font-medium text-lg text-green-600'>
                  {rowData.plan.plan.new_premium} LKR
                </div>
              )}
              className='bg-gray-50 border-b border-t border-gray-300'
            />

            <Column
              field='plan.plan.new_risk'
              header='Current Risk'
              sortable
              body={(rowData) => (
                <div className='font-medium text-lg text-red-600'>
                  {rowData.plan.plan.new_risk} %
                </div>
              )}
              className='bg-gray-50 border-b border-t border-gray-300'
            />

            <Column
              header='Actions'
              body={renderActions}
              className='bg-gray-50 border-b border-t border-gray-300'
            />
          </DataTable>
        </div>
      </Card>
    </div>
  );
};

export default VehicleList;
