import React, { useEffect, useState } from "react";
import { isStepComplete } from "../../utils/validation";

interface ReviewProps {
  personalData: any;
  addressData: any;
  preferencesData: any;
  prevStep: () => void;
  onSubmit: () => void;
}

const Review: React.FC<ReviewProps> = ({
  personalData,
  addressData,
  preferencesData,
  prevStep,
  onSubmit,
}) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [missingData, setMissingData] = useState<string[]>([]);

  useEffect(() => {
    const checkFormCompletion = async () => {
      const step0Complete = await isStepComplete(
        0,
        personalData,
        addressData,
        preferencesData
      );
      const step1Complete = await isStepComplete(
        1,
        personalData,
        addressData,
        preferencesData
      );
      const step2Complete = await isStepComplete(
        2,
        personalData,
        addressData,
        preferencesData
      );

      const allComplete = step0Complete && step1Complete && step2Complete;
      setCanSubmit(allComplete);

      const missing: string[] = [];
      if (!step0Complete) missing.push("Personal Information");
      if (!step1Complete) missing.push("Address Information");
      if (!step2Complete) missing.push("Preferences");
      setMissingData(missing);
    };

    checkFormCompletion();
  }, [personalData, addressData, preferencesData]);

  const hasData = (data: any): boolean => {
    return (
      data &&
      Object.keys(data).length > 0 &&
      Object.values(data).some(
        (value) => value !== "" && value !== null && value !== undefined
      )
    );
  };

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit();
    }
  };

  return (
    <div>
      <h2>Review Your Information</h2>

      {!canSubmit && missingData.length > 0 && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            border: "1px solid #f5c6cb",
          }}
        >
          <h4>⚠️ Please complete the following sections before submitting:</h4>
          <ul>
            {missingData.map((section, index) => (
              <li key={index}>{section}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <h3>Personal Information</h3>
        {hasData(personalData) ? (
          <>
            <p>
              <strong>Name:</strong> {personalData.name || "Not provided"}
            </p>
            <p>
              <strong>Age:</strong> {personalData.age || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong> {personalData.email || "Not provided"}
            </p>
          </>
        ) : (
          <p style={{ color: "#dc3545", fontStyle: "italic" }}>
            No personal information provided
          </p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Address</h3>
        {hasData(addressData) ? (
          <>
            <p>
              <strong>Country:</strong> {addressData.country || "Not provided"}
            </p>
            <p>
              <strong>City:</strong> {addressData.city || "Not provided"}
            </p>
            <p>
              <strong>Zip Code:</strong> {addressData.zipCode || "Not provided"}
            </p>
          </>
        ) : (
          <p style={{ color: "#dc3545", fontStyle: "italic" }}>
            No address information provided
          </p>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Preferences</h3>
        {hasData(preferencesData) ? (
          <>
            <p>
              <strong>Preferred Contact Method:</strong>{" "}
              {preferencesData.contactMethod || "Not selected"}
            </p>
            <p>
              <strong>Newsletter Subscription:</strong>{" "}
              {preferencesData.newsletter ? "Yes" : "No"}
            </p>
            <p>
              <strong>Favorite Category:</strong>{" "}
              {preferencesData.favoriteCategory || "Not selected"}
            </p>
          </>
        ) : (
          <p style={{ color: "#dc3545", fontStyle: "italic" }}>
            No preferences provided
          </p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevStep}>Back</button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            marginLeft: "10px",
            backgroundColor: canSubmit ? "#28a745" : "#6c757d",
            color: "white",
            cursor: canSubmit ? "pointer" : "not-allowed",
            opacity: canSubmit ? 1 : 0.6,
          }}
          title={
            canSubmit
              ? "Submit form"
              : "Please complete all required fields before submitting"
          }
        >
          {canSubmit ? "Submit" : "Complete Required Fields"}
        </button>
      </div>
    </div>
  );
};

export default Review;
