import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCY6zuiGyi9IPCgE-BKM556rGC4DlHkSfQ",
    authDomain: "gameder-bdee1.firebaseapp.com",
    databaseURL: "https://gameder-bdee1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gameder-bdee1",
    storageBucket: "gameder-bdee1.appspot.com",
    messagingSenderId: "1078265908396",
    appId: "1:1078265908396:web:d30b8b554b82257cf0e309",
    measurementId: "G-DDRK57DLNL"
};

// Firebase'i başlatın
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };