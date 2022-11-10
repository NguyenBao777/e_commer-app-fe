import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBOMz8QcI5V86kgNtcrXcz6Hrpnf2YEzHo",
    authDomain: "food-delivery-app-81f84.firebaseapp.com",
    databaseURL: "https://food-delivery-app-81f84-default-rtdb.firebaseio.com",
    projectId: "food-delivery-app-81f84",
    storageBucket: "food-delivery-app-81f84.appspot.com",
    messagingSenderId: "99535027966",
    appId: "1:99535027966:web:917acb12e86d73ac02efaf"
};

const app = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};