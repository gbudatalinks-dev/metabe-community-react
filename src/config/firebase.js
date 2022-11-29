import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCb775PO7iJwUsdfWjaiggkb8yyDcszBUo",
//     authDomain: "gbu-ai-web-community.firebaseapp.com",
//     projectId: "gbu-ai-web-community",
//     storageBucket: "gbu-ai-web-community.appspot.com",
//     messagingSenderId: "864386916379",
//     appId: "1:864386916379:web:5b44711529128d8f9cd8be",
//     measurementId: "G-GD2PBW9WB8"
// };

// For Development
const firebaseConfig = {
    apiKey: "AIzaSyDMnJk9ttrixTTIHOGknxHsNR3ghGohUF8",
    authDomain: "gbu-ai-web-community-dev.firebaseapp.com",
    projectId: "gbu-ai-web-community-dev",
    storageBucket: "gbu-ai-web-community-dev.appspot.com",
    messagingSenderId: "403051766912",
    appId: "1:403051766912:web:19288eabce39ddf2a5f265",
    measurementId: "G-394VTN99Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// const analytics = getAnalytics(app);
