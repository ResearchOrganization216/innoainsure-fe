import { FC, useState } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import LoadingAnimation from "@/components/CustomerRiskPrediction/LoadingAnimation";

interface ExtractedData {
  accident_location: string;
  date_and_time: string;
  driver_name: string;
  driver_nic: string;
  driver_occupation: string;
  name_of_vehicle_owner: string;
  no_of_passengers: string;
  purpose_of_journey: string;
  relationship: string;
  vehicle_no: string;
}

const DataExtractionDriveStatement: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ExtractedData | null>(null);

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
        "http://localhost:5000/api/extract-driver-statement",
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

  return (
    <div className="m-4 md:m-6">
      <h1 className="text-2xl font-bold mb-6">Data Extraction Page</h1>

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
                    <label htmlFor="driver_name" className="block mb-1">
                      Driver's Name
                    </label>
                    <InputText
                      id="driver_name"
                      value={formData.driver_name}
                      onChange={(e) =>
                        handleInputChange("driver_name", e.target.value)
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="date_and_time" className="block mb-1">
                      Date & Time
                    </label>
                    <InputText
                      id="date_and_time"
                      value={formData.date_and_time}
                      onChange={(e) =>
                        handleInputChange("date_and_time", e.target.value)
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="purpose_of_journey" className="block mb-1">
                      Purpose of Journey
                    </label>
                    <InputText
                      id="purpose_of_journey"
                      value={formData.purpose_of_journey}
                      onChange={(e) =>
                        handleInputChange("purpose_of_journey", e.target.value)
                      }
                      className="w-full"
                    />
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
                      <label htmlFor="driver_nic" className="block mb-1">
                        Driver's NIC
                      </label>
                      <InputText
                        id="driver_nic"
                        value={formData.driver_nic}
                        onChange={(e) =>
                          handleInputChange("driver_nic", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="field">
                      <label htmlFor="driver_occupation" className="block mb-1">
                        Driver's Occupation
                      </label>
                      <InputText
                        id="driver_occupation"
                        value={formData.driver_occupation}
                        onChange={(e) =>
                          handleInputChange("driver_occupation", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="accident_location" className="block mb-1">
                        Accident Location
                      </label>
                      <InputTextarea
                        id="accident_location"
                        value={formData.accident_location}
                        onChange={(e) =>
                          handleInputChange("accident_location", e.target.value)
                        }
                        rows={2}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label
                      htmlFor="name_of_vehicle_owner"
                      className="block mb-1">
                      Name of Vehicle Owner
                    </label>
                    <InputText
                      id="name_of_vehicle_owner"
                      value={formData.name_of_vehicle_owner}
                      onChange={(e) =>
                        handleInputChange(
                          "name_of_vehicle_owner",
                          e.target.value
                        )
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="field">
                      <label htmlFor="relationship" className="block mb-1">
                        Relationship betwwen Driver and Owner
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
                    <div className="field">
                      <label htmlFor="no_of_passengers" className="block mb-1">
                        No of Passengers
                      </label>
                      <InputText
                        id="no_of_passengers"
                        value={formData.no_of_passengers}
                        onChange={(e) =>
                          handleInputChange("no_of_passengers", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

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
    </div>
  );
};

export default DataExtractionDriveStatement;
