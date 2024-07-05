import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyA4LDueVXbcUoTzmi6lWGPBWYzXRPN2z_Y",
    authDomain: "todolist-8e24f.firebaseapp.com",
    projectId: "todolist-8e24f",
    storageBucket: "todolist-8e24f.appspot.com",
    messagingSenderId: "545859791280",
    appId: "1:545859791280:web:01dc647c431a47735d4e75",
    databaseURL: "https://todolist-8e24f-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

