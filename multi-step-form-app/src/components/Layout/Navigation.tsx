import React from "react";

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
}) => {
  return (
    <div className="navigation">
      <button onClick={onBack} disabled={currentStep === 0}>
        Back
      </button>
      <button onClick={onNext} disabled={currentStep === totalSteps - 1}>
        Next
      </button>
    </div>
  );
};

export default Navigation;
