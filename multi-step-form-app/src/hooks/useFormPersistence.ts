import { useEffect, useState } from "react";

const useFormPersistence = (formKey: string, initialState: any) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(formKey);
    return savedData ? JSON.parse(savedData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(formKey, JSON.stringify(formData));
  }, [formKey, formData]);

  const clearFormData = () => {
    setFormData(initialState);
    localStorage.removeItem(formKey);
  };

  return [formData, setFormData, clearFormData] as const;
};

export default useFormPersistence;
