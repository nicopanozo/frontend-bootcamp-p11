# Multi-Step Form Application

This is a multi-step form application built with React and TypeScript using Vite. The application allows users to enter personal information, address details, preferences, and review their inputs before submission. It includes form validation using Yup and state persistence using localStorage.

## Features

- Multi-step form with distinct sections for:
  - Personal Information
  - Address
  - Preferences
  - Review
- Form validation using Yup to ensure data integrity
- State persistence with localStorage to save user input across sessions
- Reusable components for UI elements like buttons, inputs, and selects
- Custom hooks for managing form state and persistence

## Getting Started

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/nicopanozo/frontend-bootcamp-p11.git
   ```

2. Navigate to the project directory:

   ```
   cd multi-step-form-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

or

```
yarn dev
```

Open your browser and go to `http://localhost:3000` to view the application.

### Building for Production

To create a production build, run:

```
npm run build
```

The built files will be generated in the `dist` directory.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.