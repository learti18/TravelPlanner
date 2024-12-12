import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    travelType: "solo",
  });

  const [searchParams] = useSearchParams();
  const destinationId = searchParams.get("destination") || "Unknown Destination";

  const navigate = useNavigate();

  const handleDateChange = (dateRange) => {
    setFormData((prev) => ({
      ...prev,
      startDate: dateRange?.from || null,
      endDate: dateRange?.to || null,
    }));
  };

  const handleNext = () => {
    if (step === 2) {
      navigate(`/view-destination/${destinationId}`, {
        state: formData,
      });
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        {/* Plan Your Trip to {destination} */}
      </h1>
      {step === 1 && (
        <div className="flex flex-col justify-center h-64 w-[400px] max-w-3xl bg-white shadow-md rounded-lg space-y-6 p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Step 1: Select your date range
          </h2>
          <DatePickerWithRange
            date={{ from: formData.startDate, to: formData.endDate }}
            onDateChange={handleDateChange}
          />
          <Button
                onClick={handleNext}
                disabled={step === 1 && (!formData.startDate || !formData.endDate)}
              >
              Next
          </Button>
          
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col justify-center w-[400px] bg-white shadow-md rounded-lg space-y-6 p-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Step 2: Who are you traveling with?
          </h2>
          <RadioGroup
            value={formData.travelType}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, travelType: value }))
            }
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="solo" id="solo" className="hidden peer"/>
              <label
                htmlFor="solo"
                className={`${formData.travelType === "solo" ? "bg-zinc-800 text-white":""}  font-semibold w-full p-2 rounded-md cursor-pointer hover:bg-zinc-600 hover:text-white`}
              >
                Solo
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="couple" id="couple" className="hidden peer"/>
              <label
                htmlFor="couple"
                className={`${formData.travelType === "couple" ? "bg-zinc-800 text-white":""} font-semibold w-full p-2 rounded-md cursor-pointer hover:bg-zinc-600 hover:text-white`}
              >
                Couple
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="family" id="family" className="hidden peer"/>
              <label
                htmlFor="family"
                className={`${formData.travelType === "family" ? "bg-zinc-800 text-white":""}  font-semibold w-full p-2 rounded-md cursor-pointer hover:bg-zinc-600 hover:text-white`}
              >
                Family
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="friends" id="friends" className="hidden peer"/>
              <label
                htmlFor="friends"
                className={`${formData.travelType === "friends" ? "bg-zinc-800 text-white":""} font-semibold w-full p-2 rounded-md cursor-pointer hover:bg-zinc-600 hover:text-white`}
              >
                Friends
              </label>
            </div>
          </RadioGroup>
          <Button
                onClick={handleNext}
                disabled={step === 1 && (!formData.startDate || !formData.endDate)}
                className="mt-6"
              >
              Finish
          </Button>
        </div>
      )}
    </div>
  );
}
