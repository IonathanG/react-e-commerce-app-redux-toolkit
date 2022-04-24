import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCLXoc6r8kz3UaQzg1G8kWpZtTgi7JNZgU",
  authDomain: "react-ecommerce-b3df9.firebaseapp.com",
  projectId: "react-ecommerce-b3df9",
  storageBucket: "react-ecommerce-b3df9.appspot.com",
  messagingSenderId: "242947292358",
  appId: "1:242947292358:web:a17fc8c99c3ef012f0abc7",
});

export const auth = app.auth();
export default app;
