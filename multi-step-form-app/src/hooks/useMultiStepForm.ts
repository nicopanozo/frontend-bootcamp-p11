import { useState } from "react";

export const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetForm = () => {
    setCurrentStep(0);
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
  };
};
