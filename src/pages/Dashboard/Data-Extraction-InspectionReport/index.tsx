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
  four_wheel_driver: string;
  abs_brake: string;
  agency_code: string;
  air_bags: string;
  alloy_wheel_rim: string;
  auto_gear: string;
  body_kit: string;
  body_work: string;
  cassette: string;
  cd_dvd: string;
  chassis_no: string;
  color: string;
  date: string;
  engine_no: string;
  epf_no: string;
  fog_buffer_lamps: string;
  hood_railing: string;
  make: string;
  modified_buffer: string;
  mr_mrs: string;
  name_and_address_of_person: string;
  navigation: string;
  paint: string;
  power_ariel: string;
  power_shutter: string;
  power_steering: string;
  power_winker_mirror: string;
  rear_wiper: string;
  remote_smart_key: string;
  reverse_camera: string;
  rim_embellisher: string;
  single_dual_ac: string;
  spoiler: string;
  sun_door_wiser: string;
  sun_roof: string;
  time: string;
  type: string;
  vehicle_gasoline: string;
  vehicle_no: string;
  year: string;
}

const DataExtractionInspectionReport: FC = () => {
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
        "http://localhost:5009/api/extract-inspection-report",
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
        Data Extraction for Inspection Report
      </h2>
      <p className="text-blue-100 opacity-80">
        Upload an image of an inspection report to extract data
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
                      <label
                        htmlFor="name_and_address_of_person"
                        className="block mb-1">
                        Name & Address of Person
                      </label>
                      <InputText
                        id="name_and_address_of_person"
                        value={formData.name_and_address_of_person}
                        onChange={(e) =>
                          handleInputChange(
                            "name_and_address_of_person",
                            e.target.value
                          )
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="chassis_no" className="block mb-1">
                        Chassis No
                      </label>
                      <InputText
                        id="chassis_no"
                        value={formData.chassis_no}
                        onChange={(e) =>
                          handleInputChange("chassis_no", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="engine_no" className="block mb-1">
                        Engine No
                      </label>
                      <InputTextarea
                        id="engine_no"
                        value={formData.engine_no}
                        onChange={(e) =>
                          handleInputChange("engine_no", e.target.value)
                        }
                        rows={2}
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="type" className="block mb-1">
                          Type
                        </label>
                        <InputText
                          id="type"
                          value={formData.type}
                          onChange={(e) =>
                            handleInputChange("type", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="paint" className="block mb-1">
                          Paint
                        </label>
                        <InputText
                          id="paint"
                          value={formData.paint}
                          onChange={(e) =>
                            handleInputChange("paint", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="vehicle_gasoline"
                          className="block mb-1">
                          Vehicle Gasoline
                        </label>
                        <Dropdown
                          id="vehicle_gasoline"
                          value={formData.vehicle_gasoline}
                          options={yesNoOptions}
                          onChange={(e) =>
                            handleInputChange("vehicle_gasoline", e.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="year" className="block mb-1">
                        Year
                      </label>
                      <InputText
                        id="year"
                        value={formData.year}
                        onChange={(e) =>
                          handleInputChange("year", e.target.value)
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="body_work" className="block mb-1">
                          Body Work
                        </label>
                        <InputText
                          id="body_work"
                          value={formData.body_work}
                          onChange={(e) =>
                            handleInputChange("body_work", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="color" className="block mb-1">
                          Color
                        </label>
                        <InputText
                          id="color"
                          value={formData.color}
                          onChange={(e) =>
                            handleInputChange("color", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="time" className="block mb-1">
                          Time
                        </label>
                        <InputText
                          id="time"
                          value={formData.time}
                          onChange={(e) =>
                            handleInputChange("time", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="make" className="block mb-1">
                          Make
                        </label>
                        <InputText
                          id="make"
                          value={formData.make}
                          onChange={(e) =>
                            handleInputChange("make", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="abs_brake" className="block mb-1">
                          ABS Brake
                        </label>
                        <Dropdown
                          id="abs_brake"
                          value={formData.abs_brake}
                          options={yesNoOptions}
                          onChange={(e) =>
                            handleInputChange("abs_brake", e.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="air_bags" className="block mb-1">
                          AIR Bags
                        </label>
                        <Dropdown
                          id="air_bags"
                          value={formData.air_bags}
                          options={yesNoOptions}
                          onChange={(e) =>
                            handleInputChange("air_bags", e.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="alloy_wheel_rim" className="block mb-1">
                          Alloy Wheel Rim
                        </label>
                        <InputText
                          id="alloy_wheel_rim"
                          value={formData.alloy_wheel_rim}
                          onChange={(e) =>
                            handleInputChange("alloy_wheel_rim", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="auto_gear" className="block mb-1">
                          Auto Gear
                        </label>
                        <InputText
                          id="auto_gear"
                          value={formData.auto_gear}
                          onChange={(e) =>
                            handleInputChange("auto_gear", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="field">
                        <label htmlFor="body_kit" className="block mb-1">
                          Body Kit
                        </label>
                        <InputText
                          id="body_kit"
                          value={formData.body_kit}
                          onChange={(e) =>
                            handleInputChange("body_kit", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="cassette" className="block mb-1">
                          Cassete
                        </label>
                        <InputText
                          id="cassette"
                          value={formData.cassette}
                          onChange={(e) =>
                            handleInputChange("cassette", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label htmlFor="cd_dvd" className="block mb-1">
                          CD DVD
                        </label>
                        <InputText
                          id="cd_dvd"
                          value={formData.cd_dvd}
                          onChange={(e) =>
                            handleInputChange("cd_dvd", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="fog_buffer_lamps"
                          className="block mb-1">
                          Fog Buffer Lamps
                        </label>
                        <InputText
                          id="fog_buffer_lamps"
                          value={formData.fog_buffer_lamps}
                          onChange={(e) =>
                            handleInputChange(
                              "fog_buffer_lamps",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label
                          htmlFor="four_wheel_driver"
                          className="block mb-1">
                          Four Wheel drive
                        </label>
                        <InputText
                          id="four_wheel_driver"
                          value={formData.four_wheel_driver}
                          onChange={(e) =>
                            handleInputChange(
                              "four_wheel_driver",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label htmlFor="hood_railing" className="block mb-1">
                          Hood Railing
                        </label>
                        <InputText
                          id="hood_railing"
                          value={formData.hood_railing}
                          onChange={(e) =>
                            handleInputChange("hood_railing", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="modified_buffer" className="block mb-1">
                          Modified Buffer
                        </label>
                        <InputText
                          id="modified_buffer"
                          value={formData.modified_buffer}
                          onChange={(e) =>
                            handleInputChange("modified_buffer", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="field">
                        <label htmlFor="navigation" className="block mb-1">
                          Navigation
                        </label>
                        <InputText
                          id="navigation"
                          value={formData.navigation}
                          onChange={(e) =>
                            handleInputChange("navigation", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label htmlFor="power_ariel" className="block mb-1">
                          Power Ariel
                        </label>
                        <InputText
                          id="power_ariel"
                          value={formData.power_ariel}
                          onChange={(e) =>
                            handleInputChange("power_ariel", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="power_shutter" className="block mb-1">
                          Power Shutter
                        </label>
                        <InputText
                          id="power_shutter"
                          value={formData.power_shutter}
                          onChange={(e) =>
                            handleInputChange("power_shutter", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="field">
                        <label htmlFor="power_steering" className="block mb-1">
                          Power Steering
                        </label>
                        <InputText
                          id="power_steering"
                          value={formData.power_steering}
                          onChange={(e) =>
                            handleInputChange("power_steering", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label
                          htmlFor="power_winker_mirror"
                          className="block mb-1">
                          Power Winker Mirror
                        </label>
                        <InputText
                          id="power_winker_mirror"
                          value={formData.power_winker_mirror}
                          onChange={(e) =>
                            handleInputChange(
                              "power_winker_mirror",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="rear_wiper" className="block mb-1">
                          Rear Wiper
                        </label>
                        <InputText
                          id="rear_wiper"
                          value={formData.rear_wiper}
                          onChange={(e) =>
                            handleInputChange("rear_wiper", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="field">
                        <label
                          htmlFor="remote_smart_key"
                          className="block mb-1">
                          Remote Smart Key
                        </label>
                        <InputText
                          id="remote_smart_key"
                          value={formData.remote_smart_key}
                          onChange={(e) =>
                            handleInputChange(
                              "remote_smart_key",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label htmlFor="reverse_camera" className="block mb-1">
                          Reverse Camera
                        </label>
                        <InputText
                          id="reverse_camera"
                          value={formData.reverse_camera}
                          onChange={(e) =>
                            handleInputChange("reverse_camera", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="rim_embellisher" className="block mb-1">
                          Rim Embellisher
                        </label>
                        <InputText
                          id="rim_embellisher"
                          value={formData.rim_embellisher}
                          onChange={(e) =>
                            handleInputChange("rim_embellisher", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="field">
                        <label htmlFor="single_dual_ac" className="block mb-1">
                          Single/Dual AC
                        </label>
                        <InputText
                          id="single_dual_ac"
                          value={formData.single_dual_ac}
                          onChange={(e) =>
                            handleInputChange("single_dual_ac", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label htmlFor="spoiler" className="block mb-1">
                          Spoiler
                        </label>
                        <InputText
                          id="spoiler"
                          value={formData.spoiler}
                          onChange={(e) =>
                            handleInputChange("spoiler", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="sun_door_wiser" className="block mb-1">
                          Sun door Wiser
                        </label>
                        <InputText
                          id="sun_door_wiser"
                          value={formData.sun_door_wiser}
                          onChange={(e) =>
                            handleInputChange("sun_door_wiser", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="field">
                        <label htmlFor="sun_roof" className="block mb-1">
                          Sun Roof
                        </label>
                        <InputText
                          id="sun_roof"
                          value={formData.sun_roof}
                          onChange={(e) =>
                            handleInputChange("sun_roof", e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="field">
                        <label htmlFor="time" className="block mb-1">
                          Time
                        </label>
                        <InputText
                          id="time"
                          value={formData.time}
                          onChange={(e) =>
                            handleInputChange("time", e.target.value)
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

export default DataExtractionInspectionReport;
