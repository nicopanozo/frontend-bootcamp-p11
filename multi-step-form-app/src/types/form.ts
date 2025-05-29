export interface PersonalInfo {
  name: string;
  age: number;
  email: string;
}

export interface Address {
  country: string;
  city: string;
  zipCode: string;
}

export interface Preferences {
  contactMethod: "Email" | "Phone" | "WhatsApp";
  newsletter: boolean;
  favoriteCategory: "Technology" | "Health" | "Art" | "Travel";
}

export interface FormData {
  personalInfo: PersonalInfo;
  address: Address;
  preferences: Preferences;
}

export interface StepProps {
  data: any;
  updateData: (newData: any) => void;
  nextStep: () => void;
  errors?: Record<string, string>;
}
