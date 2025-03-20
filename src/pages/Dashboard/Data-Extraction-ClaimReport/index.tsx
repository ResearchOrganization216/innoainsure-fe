import { FC, useState } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import LoadingAnimation from "@/components/CustomerRiskPrediction/LoadingAnimation";

interface ExtractedData {
  accident_location: string;
  address: string;
  claim_no: string;
  csr: string;
  date: string;
  date_and_time_of_accident: string;
  date_of_expiry: string;
  email: string;
  employees_in_own_vehicle: string;
  full_name_of_the_driver: string;
  goods_in_vehicle_with_weight: string;
  insured_full_name: string;
  issued_by: string;
  issued_on: string;
  issuing_branch: string;
  job_no: string;
  licence_number: string;
  position: string;
  registered_owner: string;
  relationship: string;
  serial_no: string;
  telephone_no: string;
  vehicle_no: string;
}

const DataExtraction: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ExtractedData | null>(null);

  const yesNoOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const handleImageUpload = (event: any) => {
    const file = event.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      event.options.clear();
    }
  };

  const extractData = async () => {
    if (!imageFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5009/api/extract-claim-report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data.output;
      setExtractedData(data);
      setFormData(data);
    } catch (error) {
      console.error("Error extracting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ExtractedData, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const saveData = async () => {
    if (!formData) return;

    try {
      // Here you would add the API call to save data to your database
      // For example:
      // await axios.post("http://127.0.0.1:5000/api/save-claim-data", formData);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  // Custom header for the card
  const header = (
    <div className="bg-gradient-to-r to-indigo-900 from-indigo-700 p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">
        Data Extraction for Claim Report
      </h2>
      <p className="text-blue-100 opacity-80">
        Upload an image of a claim report to extract data
      </p>
    </div>
  );

  return (
    <div className="max-w-auto mx-auto p-6">
      <Card header={header} className="shadow-lg border-0 overflow-hidden">
        <div className="mb-6 rounded-lg bg-blue-50 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <FileUpload
              mode="basic"
              name="image"
              accept="image/*"
              maxFileSize={10000000}
              customUpload
              uploadHandler={handleImageUpload}
              auto
              chooseLabel="Select Document Image"
              chooseOptions={{
                icon: "pi pi-cloud-upload",
                className: "p-button-outlined p-button-primary",
              }}
              className="md:flex-1"
            />
            <Button
              label="Extract Data"
              onClick={extractData}
              disabled={!imageFile || loading}
              className="p-button-success bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border-0 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              icon={loading ? "pi pi-spinner pi-spin" : "pi pi-file-excel"}
            />
          </div>

          {imageFile && (
            <div className="mt-4 text-sm text-blue-500">
              <i className="pi pi-file-image mr-2"></i>
              {imageFile.name} ({Math.round(imageFile.size / 1024)} KB)
            </div>
          )}
        </div>

        {loading && <LoadingAnimation loading={loading} />}

        {selectedImage || extractedData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Column */}
            <div>
              <Card title="Uploaded Image" className="h-full">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Uploaded document"
                    className="w-full border rounded"
                  />
                )}
              </Card>
            </div>

            {/* Form Column */}
            <div>
              <Card title="Extracted Data" className="h-full">
                {formData ? (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="field">
                      <label htmlFor="claim_no" className="block mb-1">
                        Claim No
                      </label>
                      <InputText
                        id="claim_no"
                        value={formData.claim_no}
                        onChange={(e) =>
                          handleInputChange("claim_no", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="insured_full_name" className="block mb-1">
                        Insured Full Name
                      </label>
                      <InputText
                        id="insured_full_name"
                        value={formData.insured_full_name}
                        onChange={(e) =>
                          handleInputChange("insured_full_name", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="address" className="block mb-1">
                        Address
                      </label>
                      <InputTextarea
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        rows={2}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="telephone_no" className="block mb-1">
                          Telephone No
                        </label>
                        <InputText
                          id="telephone_no"
                          value={formData.telephone_no}
                          onChange={(e) =>
                            handleInputChange("telephone_no", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="email" className="block mb-1">
                          Email
                        </label>
                        <InputText
                          id="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="vehicle_no" className="block mb-1">
                          Vehicle No
                        </label>
                        <InputText
                          id="vehicle_no"
                          value={formData.vehicle_no}
                          onChange={(e) =>
                            handleInputChange("vehicle_no", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="registered_owner"
                          className="block mb-1">
                          Registered Owner
                        </label>
                        <Dropdown
                          id="registered_owner"
                          value={formData.registered_owner}
                          options={yesNoOptions}
                          onChange={(e) =>
                            handleInputChange("registered_owner", e.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label
                        htmlFor="full_name_of_the_driver"
                        className="block mb-1">
                        Full Name of the Driver
                      </label>
                      <InputText
                        id="full_name_of_the_driver"
                        value={formData.full_name_of_the_driver}
                        onChange={(e) =>
                          handleInputChange(
                            "full_name_of_the_driver",
                            e.target.value
                          )
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="licence_number" className="block mb-1">
                          Licence Number
                        </label>
                        <InputText
                          id="licence_number"
                          value={formData.licence_number}
                          onChange={(e) =>
                            handleInputChange("licence_number", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="relationship" className="block mb-1">
                          Relationship
                        </label>
                        <InputText
                          id="relationship"
                          value={formData.relationship}
                          onChange={(e) =>
                            handleInputChange("relationship", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label
                          htmlFor="date_and_time_of_accident"
                          className="block mb-1">
                          Date/Time of Accident
                        </label>
                        <InputText
                          id="date_and_time_of_accident"
                          value={formData.date_and_time_of_accident}
                          onChange={(e) =>
                            handleInputChange(
                              "date_and_time_of_accident",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="accident_location"
                          className="block mb-1">
                          Accident Location
                        </label>
                        <InputText
                          id="accident_location"
                          value={formData.accident_location}
                          onChange={(e) =>
                            handleInputChange(
                              "accident_location",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label
                          htmlFor="employees_in_own_vehicle"
                          className="block mb-1">
                          Employees in Own Vehicle
                        </label>
                        <Dropdown
                          id="employees_in_own_vehicle"
                          value={formData.employees_in_own_vehicle}
                          options={yesNoOptions}
                          onChange={(e) =>
                            handleInputChange(
                              "employees_in_own_vehicle",
                              e.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="goods_in_vehicle_with_weight"
                          className="block mb-1">
                          Goods in Vehicle with Weight
                        </label>
                        <Dropdown
                          id="goods_in_vehicle_with_weight"
                          value={formData.goods_in_vehicle_with_weight}
                          options={yesNoOptions}
                          onChange={(e) =>
                            handleInputChange(
                              "goods_in_vehicle_with_weight",
                              e.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="job_no" className="block mb-1">
                          Job No
                        </label>
                        <InputText
                          id="job_no"
                          value={formData.job_no}
                          onChange={(e) =>
                            handleInputChange("job_no", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="serial_no" className="block mb-1">
                          Serial No
                        </label>
                        <InputText
                          id="serial_no"
                          value={formData.serial_no}
                          onChange={(e) =>
                            handleInputChange("serial_no", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="csr" className="block mb-1">
                          CSR
                        </label>
                        <InputText
                          id="csr"
                          value={formData.csr}
                          onChange={(e) =>
                            handleInputChange("csr", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="position" className="block mb-1">
                          Position
                        </label>
                        <InputText
                          id="position"
                          value={formData.position}
                          onChange={(e) =>
                            handleInputChange("position", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label htmlFor="date" className="block mb-1">
                          Date
                        </label>
                        <InputText
                          id="date"
                          value={formData.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="date_of_expiry" className="block mb-1">
                          Date of Expiry
                        </label>
                        <InputText
                          id="date_of_expiry"
                          value={formData.date_of_expiry}
                          onChange={(e) =>
                            handleInputChange("date_of_expiry", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="issued_on" className="block mb-1">
                          Issued On
                        </label>
                        <InputText
                          id="issued_on"
                          value={formData.issued_on}
                          onChange={(e) =>
                            handleInputChange("issued_on", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="issued_by" className="block mb-1">
                          Issued By
                        </label>
                        <InputText
                          id="issued_by"
                          value={formData.issued_by}
                          onChange={(e) =>
                            handleInputChange("issued_by", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="issuing_branch" className="block mb-1">
                          Issuing Branch
                        </label>
                        <InputText
                          id="issuing_branch"
                          value={formData.issuing_branch}
                          onChange={(e) =>
                            handleInputChange("issuing_branch", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button
                        label="Save Data"
                        onClick={saveData}
                        className="p-button-primary"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p>
                      No data extracted yet. Upload an image and click "Extract
                      Data".
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 border rounded bg-gray-50">
            <i className="pi pi-image text-5xl text-gray-400 mb-3"></i>
            <p>Please upload an image to extract data</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DataExtraction;
