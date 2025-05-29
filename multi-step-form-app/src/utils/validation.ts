import { personalInfoSchema, addressSchema, preferencesSchema } from '../schemas/validationSchemas';

export const validateStep = async (stepIndex: number, data: any): Promise<boolean> => {
  try {
    switch (stepIndex) {
      case 0:
        await personalInfoSchema.validate(data, { abortEarly: false });
        return true;
      case 1:
        await addressSchema.validate(data, { abortEarly: false });
        return true;
      case 2:
        await preferencesSchema.validate(data, { abortEarly: false });
        return true;
      default:
        return true;
    }
  } catch (error) {
    return false;
  }
};

export const isStepComplete = async (stepIndex: number, personalData: any, addressData: any, preferencesData: any): Promise<boolean> => {
  switch (stepIndex) {
    case 0:
      return await validateStep(0, personalData);
    case 1:
      return await validateStep(1, addressData);
    case 2:
      return await validateStep(2, preferencesData);
    case 3:
      // Para el review, todos los pasos anteriores deben estar completos
      const step0Complete = await validateStep(0, personalData);
      const step1Complete = await validateStep(1, addressData);
      const step2Complete = await validateStep(2, preferencesData);
      return step0Complete && step1Complete && step2Complete;
    default:
      return false;
  }
};