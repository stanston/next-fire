// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDulC1pD7gBwu9k3RQdoLfLEyPfd6e1TqA",
  authDomain: "poolog-5b869.firebaseapp.com",
  projectId: "poolog-5b869",
  storageBucket: "poolog-5b869.appspot.com",
  messagingSenderId: "306217521665",
  appId: "1:306217521665:web:70b9e65a167f2e93616600",
  measurementId: "G-FJDHYEY26Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// https://stackoverflow.com/questions/69799682/firebase-analytics-with-next-js-window-not-definded
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}

export const auth = getAuth();
// export const db = getFirestore(app);
export const db = getFirestore();
export const storage = getStorage();

// export default app;
