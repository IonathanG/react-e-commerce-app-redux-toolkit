import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

export const auth = app.auth();
export default app;

// apiKey: "AIzaSyCLXoc6r8kz3UaQzg1G8kWpZtTgi7JNZgU",
// authDomain: "react-ecommerce-b3df9.firebaseapp.com",
// projectId: "react-ecommerce-b3df9",
// storageBucket: "react-ecommerce-b3df9.appspot.com",
// messagingSenderId: "242947292358",
// appId: "1:242947292358:web:a17fc8c99c3ef012f0abc7",
