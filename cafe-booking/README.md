# GameZone Cafe Booking System

A modern web application for booking gaming sessions at GameZone Cafe. Built with React, Material-UI, and Firebase.

## Features

- Interactive booking interface
- Real-time availability checking
- Date and time slot selection
- User information collection
- Booking confirmation system
- Responsive design

## Tech Stack

- React
- TypeScript
- Material-UI
- Firebase (Firestore)
- Date-fns

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Firebase account

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd cafe-booking
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project and get your configuration:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Go to Project Settings
   - Under "Your apps", click the web icon (</>)
   - Register your app and copy the configuration

4. Create a Firebase configuration file:
   - Create `src/config/firebase.ts`
   - Add your Firebase configuration:
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

5. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
cafe-booking/
├── src/
│   ├── components/
│   ├── pages/
│   ├── config/
│   └── App.tsx
├── public/
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@gamezonecafe.com or create an issue in the repository.
