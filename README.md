# Clinicos Admin

Clinicos Admin is a web application for managing clinical anamnesis forms. This project is built with React and uses Vite as the build tool.

## Requirements

- Node.js >= 20.0.0

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/clinicos-admin.git
   cd clinicos-admin
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the project files.
- `npm run preview`: Locally preview the production build.
- `npm run test:unit`: Runs unit tests using Jest.
- `npm run test:e2e`: Runs end-to-end tests using Playwright.

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- DND Kit (for drag and drop functionality)
- React Table (for displaying tables)
- Axios (for HTTP requests)
- Jest and React Testing Library (for unit testing)
- Playwright (for end-to-end testing)

## Project Structure

- `src/`: Contains the source code of the application.
- `tests/`: Contains unit and end-to-end tests.
- `public/`: Contains public assets.

## Test Results

### Unit Tests

```
npm run test:unit

> clinicos-admin@0.0.0 test:unit
> node --experimental-vm-modules node_modules/jest/bin/jest.js --config jest.config.mjs

 PASS  tests/unit/components/AnamnesisFormList.test.tsx
 PASS  tests/unit/components/QuestionItem.test.tsx
 PASS  tests/unit/components/SectionItem.test.tsx
 PASS  tests/unit/components/AnamnesisFormCreate.test.tsx
 PASS  tests/unit/components/AnamnesisFormDetail.test.tsx
 PASS  tests/unit/components/AnamnesisFormUpdate.test.tsx

Test Suites: 6 passed, 6 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.729 s, estimated 3 s
Ran all test suites.
```

### End-to-End Tests

```
npm run test:e2e

> clinicos-admin@0.0.0 test:e2e
> playwright test

Running 5 tests using 2 workers

  ✓ 1 navigation.spec.ts:4:3 › Navigation › should navigate between pages (914ms)
  ✓ 2 formOperations.spec.ts:4:3 › Anamnesis Form Operations › should display the list of forms (1.1s)
  ✓ 3 formOperations.spec.ts:10:3 › Anamnesis Form Operations › should create a new form (1.2s)
  ✓ 4 formOperations.spec.ts:23:3 › Anamnesis Form Operations › should edit an existing form (2.0s)
  ✓ 5 formOperations.spec.ts:36:3 › Anamnesis Form Operations › should delete a form (3.0s)

  5 passed (8.3s)
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).