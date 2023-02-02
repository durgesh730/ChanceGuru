import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBE9xQNI1nx1oPmRgXsiO7e54onMtptBYU",
    authDomain: "chancereact.firebaseapp.com",
    projectId: "chancereact",
    storageBucket: "chancereact.appspot.com",
    messagingSenderId: "923160595146",
    appId: "1:923160595146:web:2c9ef5da675416bbd28233",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
