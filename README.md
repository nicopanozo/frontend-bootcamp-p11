# Frontend Bootcamp - Practice 11: Advanced React Forms

A comprehensive collection of React form exercises demonstrating advanced form handling techniques, validation strategies, and state management patterns using modern React libraries.

## 📋 Overview

This practice contains **3 comprehensive exercises** that cover different aspects of form development in React:

1. **Multi-Step Form** - Complex form navigation with state persistence
2. **Dynamic Field Arrays** - Dynamic form field management
3. **Conditional Validation** - Rating system with conditional requirements

## 🎯 Learning Objectives

- Master advanced form handling patterns in React
- Implement complex validation scenarios with Yup
- Manage form state across multiple steps
- Handle dynamic field arrays with React Hook Form
- Apply conditional validation logic
- Persist form data using localStorage
- Create reusable form components with TypeScript

## 📁 Project Structure

```
Practice11/
├── multistep-form-app/          # Exercise 1 - Multi-step form
│   ├── src/
│   │   ├── components/
│   │   │   ├── PersonalInfoStep.tsx
│   │   │   ├── AddressStep.tsx
│   │   │   ├── PreferencesStep.tsx
│   │   │   └── ReviewStep.tsx
│   │   ├── context/
│   │   │   └── FormContext.tsx
│   │   └── utils/
│   │       └── validationSchemas.ts
│   └── README.md
│
├── my-react-forms-app/          # Exercises 2 & 3
│   ├── src/
│   │   ├── components/
│   │   │   ├── SocialMediaForm.tsx    # Exercise 2
│   │   │   └── RatingForm.tsx         # Exercise 3
│   │   └── types/
│   │       └── index.ts
│   └── README.md
│
└── README.md                    # This file
```

## 🚀 Exercises Overview

### Exercise 1: Multi-Step Form with State Persistence

**Location**: `multistep-form-app/`

**Features**:

- **4-step form navigation** with validation at each step
- **Step-by-step validation** using Yup schemas
- **State persistence** with localStorage
- **Navigation controls** (Next/Back buttons)
- **Form state management** across multiple components

**Steps**:

1. **Personal Info**: Name, Age (min 14), Email validation
2. **Address**: Country, City, Zip code validation
3. **Preferences**: Contact method, Newsletter subscription, Category selection
4. **Review & Submit**: Data review and final submission

**Technologies**: React + TypeScript, Formik, Yup, Context API, localStorage

---

### Exercise 2: Dynamic Social Media Form

**Location**: `my-react-forms-app/`

**Features**:

- **Dynamic field management** using React Hook Form's `useFieldArray`
- **Add/remove social media links** with platform selection
- **URL validation** for each social media link
- **Array constraints**: Minimum 1 link, maximum 5 links
- **Platform options**: Facebook, Twitter, Instagram, LinkedIn, YouTube

**Technologies**: React Hook Form, TypeScript, Custom validation

---

### Exercise 3: Rating Form with Conditional Validation

**Location**: `my-react-forms-app/`

**Features**:

- **Interactive star rating system** (1-5 stars)
- **Conditional validation**: Feedback required for ratings < 3
- **Real-time validation** with Yup schemas
- **Form submission** with data display
- **User-friendly interface** with visual feedback

**Technologies**: Formik, Yup, TypeScript, Conditional validation

## 🛠️ Technologies Used

| Technology          | Purpose                     | Exercises |
| ------------------- | --------------------------- | --------- |
| **React 18**        | Core framework              | All       |
| **TypeScript**      | Type safety                 | All       |
| **Vite**            | Build tool & dev server     | All       |
| **Formik**          | Form state management       | 1, 3      |
| **React Hook Form** | Performant form library     | 2         |
| **Yup**             | Schema validation           | All       |
| **Context API**     | State management            | 1         |
| **localStorage**    | Data persistence            | 1         |
| **CSS**             | Styling & responsive design | All       |

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Running Exercise 1 (Multi-Step Form)

```bash
cd multistep-form-app
npm install
npm run dev
```

### Running Exercises 2 & 3 (React Forms)

```bash
cd my-react-forms-app
npm install
npm run dev
```

## 🎨 Key Features Demonstrated

### Form Validation Patterns

- ✅ **Step-by-step validation** with blocking navigation
- ✅ **Real-time validation** with immediate feedback
- ✅ **Conditional validation** based on field values
- ✅ **Array validation** with min/max constraints
- ✅ **Custom validation rules** for URLs and formats

### State Management Techniques

- ✅ **Multi-component state sharing** with Context API
- ✅ **Form state persistence** with localStorage
- ✅ **Dynamic field arrays** with React Hook Form
- ✅ **Controlled vs uncontrolled** components

### User Experience Features

- ✅ **Multi-step navigation** with progress indication
- ✅ **Dynamic form controls** (add/remove fields)
- ✅ **Interactive UI elements** (star ratings, buttons)
- ✅ **Responsive design** for all screen sizes
- ✅ **Error handling** with clear user feedback

## 📚 Learning Outcomes

After completing these exercises, you will understand:

1. **Advanced Form Architecture**

   - How to structure complex forms with multiple steps
   - When to use different form libraries (Formik vs RHF)
   - State management patterns for forms

2. **Validation Strategies**

   - Schema-based validation with Yup
   - Conditional validation logic
   - Array and nested object validation

3. **Performance Optimization**

   - Efficient re-rendering with React Hook Form
   - State persistence strategies
   - Component optimization techniques

4. **TypeScript Integration**
   - Type-safe form handling
   - Custom type definitions
   - Generic form components

## 🔧 Advanced Implementation Details

### Multi-Step Form Navigation

```typescript
// Step validation and navigation logic
const nextStep = async () => {
  const isValid = await trigger();
  if (isValid) {
    setCurrentStep((prev) => prev + 1);
    saveToLocalStorage(getValues());
  }
};
```

### Dynamic Field Arrays

```typescript
// React Hook Form useFieldArray
const { fields, append, remove } = useFieldArray({
  control,
  name: "socialLinks",
  rules: { minLength: 1, maxLength: 5 },
});
```

### Conditional Validation

```typescript
// Yup conditional schema
const schema = Yup.object({
  rating: Yup.number().required(),
  feedback: Yup.string().when("rating", {
    is: (rating: number) => rating < 3,
    then: (schema) => schema.required("Feedback required for low ratings"),
  }),
});
```

## 🤝 Contributing

This is an educational project. Feel free to:

- Fork and experiment with the code
- Add new form exercises
- Improve existing implementations
- Share feedback and suggestions

## 📄 License

This project is for educational purposes and is open source.

---

**Happy Learning! 🚀**

For detailed information about each exercise, check the individual README files in each project folder.
