# Card Dealer Project Setup

Quick setup guide for running the Card Dealer application locally.

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- A Firebase account

## Setup Steps

1. Extract the project zip file to your desired location

2. Navigate to the project directory in terminal/command prompt:
```bash
cd path/to/card-dealer
```

3. Install dependencies:
```bash
npm install
```

4. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Navigate to Project Settings > General
   - Register a new web app
   - Copy your Firebase configuration
   - Update the Firebase configuration in `src/environments/environment.ts` with your credentials

5. Start the development server:
```bash
ng serve
```

6. Open your browser and navigate to `http://localhost:4200`

## Troubleshooting

If you encounter any issues:
- Make sure all prerequisites are installed
- Verify your Firebase configuration is correct
- Check the browser console for errors
- Ensure all npm packages were installed correctly

For further assistance, contact the project maintainer.
