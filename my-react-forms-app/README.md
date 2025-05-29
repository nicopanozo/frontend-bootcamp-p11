# My React Forms App

A React application demonstrating advanced form handling techniques using React Hook Form and Formik with TypeScript.

## 🚀 Features

This project includes two comprehensive form exercises:

### Exercise 2: Dynamic Social Media Form (React Hook Form + useFieldArray)
- **Dynamic field management** using React Hook Form's `useFieldArray`
- Add/remove social media links dynamically
- **Platform selection** (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- **URL validation** with custom validation rules
- **Constraints**: Minimum 1 link required, maximum 5 links allowed
- Real-time form validation and error handling

### Exercise 3: Rating Form (Formik + Yup)
- **Star rating system** (1-5 stars) with interactive UI
- **Conditional validation** using Yup schema
- Feedback message required when rating < 3 stars
- Form submission with data display
- Clean, user-friendly interface

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Hook Form** for efficient form state management
- **Formik** for form handling and validation
- **Yup** for schema validation
- **CSS** for styling and responsive design

## 📁 Project Structure

```
src/
├── components/
│   ├── SocialMediaForm.tsx    # Exercise 2 - Dynamic field arrays
│   └── RatingForm.tsx         # Exercise 3 - Rating with conditional validation
├── types/
│   └── index.ts              # TypeScript type definitions
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles
└── vite-env.d.ts            # Vite environment declarations
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Form Features Demonstrated

### Dynamic Field Arrays (Exercise 2)
- ✅ Add/remove form fields dynamically
- ✅ Array validation with min/max constraints
- ✅ Custom URL validation
- ✅ Platform selection with predefined options
- ✅ Form state persistence across field operations

### Conditional Validation (Exercise 3)
- ✅ Star rating component with visual feedback
- ✅ Conditional field requirements based on rating value
- ✅ Schema-based validation with Yup
- ✅ Form submission handling with data display
- ✅ User-friendly error messages

## 📝 Form Validation Rules

### Social Media Form
- **Platform**: Required selection from dropdown
- **URL**: Must be a valid URL format
- **Array constraints**: Minimum 1 link, maximum 5 links
- **Duplicate prevention**: Each platform can only be added once

### Rating Form
- **Name**: Required field, minimum 2 characters
- **Rating**: Required, must be between 1-5 stars
- **Feedback**: Required only when rating is less than 3 stars
- **Conditional validation**: Dynamic requirements based on rating value

## 🎨 User Interface

- **Responsive design** that works on desktop and mobile
- **Interactive star rating** with hover effects
- **Dynamic form controls** with smooth animations
- **Clear error messaging** with validation feedback
- **Clean, modern styling** with consistent design patterns

## 🔧 Technical Implementation

### React Hook Form Integration
```typescript
// useFieldArray for dynamic fields
const { fields, append, remove } = useFieldArray({
  control,
  name: "socialLinks"
});
```

### Formik + Yup Validation
```typescript
// Conditional validation schema
const validationSchema = Yup.object({
  rating: Yup.number().required("Rating is required"),
  feedback: Yup.string().when("rating", {
    is: (rating: number) => rating < 3,
    then: (schema) => schema.required("Feedback is required for ratings below 3"),
    otherwise: (schema) => schema
  })
});
```

## 📚 Learning Objectives

This project demonstrates:
- Advanced form handling patterns in React
- Dynamic form field management
- Complex validation scenarios
- TypeScript integration with form libraries
- Component composition and reusability
- State management in form applications

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is for educational purposes and is open source.