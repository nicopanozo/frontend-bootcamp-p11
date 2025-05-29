import React, { useState } from "react";
import { preferencesSchema } from "../../schemas/validationSchemas";
import { StepProps } from "../../types/form";

const Preferences: React.FC<StepProps & { prevStep: () => void }> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
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
      await preferencesSchema.validate(data, { abortEarly: false });
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
      <h2>Preferences</h2>

      <div>
        <label>Preferred Contact Method *</label>
        <div>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="Email"
              checked={data.contactMethod === "Email"}
              onChange={(e) => handleChange("contactMethod", e.target.value)}
            />
            Email
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="Phone"
              checked={data.contactMethod === "Phone"}
              onChange={(e) => handleChange("contactMethod", e.target.value)}
            />
            Phone
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="contactMethod"
              value="WhatsApp"
              checked={data.contactMethod === "WhatsApp"}
              onChange={(e) => handleChange("contactMethod", e.target.value)}
            />
            WhatsApp
          </label>
        </div>
        {errors.contactMethod && (
          <div className="error">{errors.contactMethod}</div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={data.newsletter || false}
            onChange={(e) => handleChange("newsletter", e.target.checked)}
          />
          Subscribe to Newsletter
        </label>
      </div>

      <div>
        <label>Favorite Category *</label>
        <select
          value={data.favoriteCategory || ""}
          onChange={(e) => handleChange("favoriteCategory", e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Art">Art</option>
          <option value="Travel">Travel</option>
        </select>
        {errors.favoriteCategory && (
          <div className="error">{errors.favoriteCategory}</div>
        )}
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

export default Preferences;
