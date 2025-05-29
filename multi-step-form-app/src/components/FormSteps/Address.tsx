import React, { useState } from "react";
import { addressSchema } from "../../schemas/validationSchemas";
import { StepProps } from "../../types/form";

const Address: React.FC<StepProps & { prevStep: () => void }> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    updateData({
      ...data,
      [field]: value,
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNext = async () => {
    try {
      await addressSchema.validate(data, { abortEarly: false });
      setErrors({});
      nextStep();
    } catch (validationErrors: any) {
      const errorMessages: Record<string, string> = {};
      validationErrors.inner.forEach((error: any) => {
        errorMessages[error.path] = error.message;
      });
      setErrors(errorMessages);
    }
  };

  return (
    <div>
      <h2>Address Information</h2>
      <div>
        <label>Country *</label>
        <input
          type="text"
          value={data.country || ""}
          onChange={(e) => handleChange("country", e.target.value)}
          placeholder="Enter your country"
        />
        {errors.country && <div className="error">{errors.country}</div>}
      </div>

      <div>
        <label>City *</label>
        <input
          type="text"
          value={data.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Enter your city"
        />
        {errors.city && <div className="error">{errors.city}</div>}
      </div>

      <div>
        <label>Zip Code *</label>
        <input
          type="text"
          value={data.zipCode || ""}
          onChange={(e) => handleChange("zipCode", e.target.value)}
          placeholder="Enter your zip code"
        />
        {errors.zipCode && <div className="error">{errors.zipCode}</div>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevStep}>Back</button>
        <button onClick={handleNext} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Address;
