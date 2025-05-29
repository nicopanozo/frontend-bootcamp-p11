import React, { useEffect, useState } from "react";
import { isStepComplete } from "../../utils/validation";

interface StepIndicatorProps {
  currentStep: number;
  goToStep: (step: number) => void;
  personalData: any;
  addressData: any;
  preferencesData: any;
}

const stepNames = ["Personal Info", "Address", "Preferences", "Review"];

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  goToStep,
  personalData,
  addressData,
  preferencesData,
}) => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const checkSteps = async () => {
      const stepCompletions = await Promise.all([
        isStepComplete(0, personalData, addressData, preferencesData),
        isStepComplete(1, personalData, addressData, preferencesData),
        isStepComplete(2, personalData, addressData, preferencesData),
        isStepComplete(3, personalData, addressData, preferencesData),
      ]);
      setCompletedSteps(stepCompletions);
    };

    checkSteps();
  }, [personalData, addressData, preferencesData]);

  const canAccessStep = (stepIndex: number): boolean => {
    if (stepIndex === 0) return true;

    for (let i = 0; i < stepIndex; i++) {
      if (!completedSteps[i]) return false;
    }
    return true;
  };

  const handleStepClick = (stepIndex: number) => {
    if (canAccessStep(stepIndex)) {
      goToStep(stepIndex);
    }
  };

  const getStepStyle = (index: number) => {
    const isAccessible = canAccessStep(index);
    const isCompleted = completedSteps[index];
    const isCurrent = index === currentStep;

    return {
      backgroundColor: isCurrent
        ? "#007bff"
        : isCompleted
        ? "#28a745"
        : isAccessible
        ? "#f8f9fa"
        : "#e9ecef",
      color:
        isCurrent || isCompleted
          ? "white"
          : isAccessible
          ? "#495057"
          : "#6c757d",
      margin: "0 5px",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: isAccessible ? "pointer" : "not-allowed",
      opacity: isAccessible ? 1 : 0.6,
      transition: "all 0.3s ease",
    };
  };

  return (
    <div className="step-indicator">
      {stepNames.map((stepName, index) => (
        <button
          key={index}
          className={`step-button ${index === currentStep ? "active" : ""} ${
            completedSteps[index] ? "completed" : ""
          }`}
          onClick={() => handleStepClick(index)}
          disabled={!canAccessStep(index)}
          style={getStepStyle(index)}
          title={
            !canAccessStep(index)
              ? "Complete previous steps to access this step"
              : completedSteps[index]
              ? "Step completed"
              : "Click to go to this step"
          }
        >
          {completedSteps[index] && (
            <span style={{ marginRight: "5px" }}>✓</span>
          )}
          {index + 1}. {stepName}
        </button>
      ))}
    </div>
  );
};

export default StepIndicator;
