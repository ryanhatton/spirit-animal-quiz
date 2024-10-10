# Spirit Animal Quiz

This project is a [Next.js](https://nextjs.org) application built with TypeScript and styled using Tailwind CSS. It features a modular and responsive quiz form to determine your spirit animal, utilizing React Hook Form and Zod for form handling and validation.

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ryanhatton/form-challenge.git
   cd ryanhatton-form
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser to see the quiz.**

## Form Features

- **Radio Buttons:** For selecting whether you're a morning person, ideal pace, etc.
- **Dropdown Selects:** For selecting favorite snack, favorite season, and ideal activity.
- **Slider:** To indicate competitiveness on a scale of 1-10.
- **Date Picker:** To select today's date.
- **Checkbox:** To agree to terms and conditions.
- **Progress Bar:** Shows quiz completion status.
- **Results Page:** Displays your spirit animal with an accompanying image and a reset button.

Each field provides real-time validation feedback, displaying error messages when validation fails and success indicators upon valid input.

## Libraries & Tools Used

- **Next.js:** Framework for server-rendered React applications.
- **TypeScript:** Provides static typing for improved code quality and maintenance.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development and consistent styling.
- **React Hook Form:** Facilitates easy and performant form handling in React.
- **Zod:** Schema declaration and validation library for TypeScript, ensuring type-safe validations.
- **Radix UI:** Accessible and unstyled UI primitives for building custom components.
- **Lucide-React:** Icon library for React applications.
- **ShadCN/UI:** A collection of fully accessible and customizable components built using Radix UI and styled with Tailwind CSS.

## Project Structure

- **`src/components/Form/`**: Contains form-related components.
- **`src/components/ui/`**: Contains reusable UI components like Button, Card, Select, etc.
- **`src/lib/`**: Utility functions and validation schemas.
- **`src/app/`**: Main application files including the page and layout.
- **`src/styles/`**: Global and component-specific styles.

