import React, { useEffect, useState } from "react";
import { useMultiStepForm } from "./hooks/useMultiStepForm";
import PersonalInfo from "./components/FormSteps/PersonalInfo";
import Address from "./components/FormSteps/Address";
import Preferences from "./components/FormSteps/Preferences";
import Review from "./components/FormSteps/Review";
import StepIndicator from "./components/Layout/StepIndicator";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./utils/localStorage";
import { isStepComplete } from "./utils/validation";

const FORM_STORAGE_KEY = "multiStepFormData";

const App: React.FC = () => {
  const { currentStep, nextStep, prevStep, goToStep } = useMultiStepForm();

  const [personalData, setPersonalData] = useState(
    () => getFromLocalStorage(`${FORM_STORAGE_KEY}_personal`) || {}
  );
  const [addressData, setAddressData] = useState(
    () => getFromLocalStorage(`${FORM_STORAGE_KEY}_address`) || {}
  );
  const [preferencesData, setPreferencesData] = useState(
    () => getFromLocalStorage(`${FORM_STORAGE_KEY}_preferences`) || {}
  );

  useEffect(() => {
    saveToLocalStorage(`${FORM_STORAGE_KEY}_personal`, personalData);
  }, [personalData]);

  useEffect(() => {
    saveToLocalStorage(`${FORM_STORAGE_KEY}_address`, addressData);
  }, [addressData]);

  useEffect(() => {
    saveToLocalStorage(`${FORM_STORAGE_KEY}_preferences`, preferencesData);
  }, [preferencesData]);

  const handleGoToStep = async (stepIndex: number) => {
    if (stepIndex === 0) {
      goToStep(stepIndex);
      return;
    }

    for (let i = 0; i < stepIndex; i++) {
      const stepComplete = await isStepComplete(
        i,
        personalData,
        addressData,
        preferencesData
      );
      if (!stepComplete) {
        alert(
          `Please complete step ${i + 1} before proceeding to step ${
            stepIndex + 1
          }`
        );
        return;
      }
    }

    goToStep(stepIndex);
  };

  const handleSubmit = () => {
    const completeFormData = {
      personalInfo: personalData,
      address: addressData,
      preferences: preferencesData,
      submittedAt: new Date().toISOString(),
    };

    console.log("Form submitted:", completeFormData);
    alert("Form submitted successfully!");

    removeFromLocalStorage(`${FORM_STORAGE_KEY}_personal`);
    removeFromLocalStorage(`${FORM_STORAGE_KEY}_address`);
    removeFromLocalStorage(`${FORM_STORAGE_KEY}_preferences`);

    setPersonalData({});
    setAddressData({});
    setPreferencesData({});
    goToStep(0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfo
            data={personalData}
            updateData={setPersonalData}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <Address
            data={addressData}
            updateData={setAddressData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <Preferences
            data={preferencesData}
            updateData={setPreferencesData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Review
            personalData={personalData}
            addressData={addressData}
            preferencesData={preferencesData}
            prevStep={prevStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>Multi-Step Form</h1>
      <StepIndicator
        currentStep={currentStep}
        goToStep={handleGoToStep}
        personalData={personalData}
        addressData={addressData}
        preferencesData={preferencesData}
      />
      <div className="form-container">{renderStep()}</div>
    </div>
  );
};

export default App;
