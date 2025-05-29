import * as Yup from "yup";

export const personalInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  age: Yup.number()
    .required("Age is required")
    .min(14, "Age must be at least 14")
    .max(120, "Age must be less than or equal to 120"),
  email: Yup.string().required("Email is required").email("Email is not valid"),
});

export const addressSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(
      /^[0-9]{5}(-[0-9]{4})?$/,
      "Zip Code must be valid (e.g., 12345 or 12345-6789)"
    ),
});

export const preferencesSchema = Yup.object().shape({
  contactMethod: Yup.string().required("Preferred contact method is required"),
  newsletter: Yup.boolean(),
  favoriteCategory: Yup.string().required("Favorite category is required"),
});
