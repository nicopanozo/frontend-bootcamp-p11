import React, { useState } from "react";
import { personalInfoSchema } from "../../schemas/validationSchemas";
import { StepProps } from "../../types/form";

const PersonalInfo: React.FC<StepProps> = ({ data, updateData, nextStep }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | number) => {
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
      await personalInfoSchema.validate(data, { abortEarly: false });
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
      <h2>Personal Information</h2>
      <div>
        <label>Name *</label>
        <input
          type="text"
          value={data.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter your full name"
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div>
        <label>Age *</label>
        <input
          type="number"
          value={data.age || ""}
          onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
          placeholder="Enter your age"
          min="14"
          max="120"
        />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>

      <div>
        <label>Email *</label>
        <input
          type="email"
          value={data.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter your email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PersonalInfo;
