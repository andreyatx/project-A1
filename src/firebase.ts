// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDXcmsod2Wuk5guNzWNrKyHqUxoSuhAreg',
	authDomain: 'taskmanager-2dd4d.firebaseapp.com',
	projectId: 'taskmanager-2dd4d',
	storageBucket: 'taskmanager-2dd4d.appspot.com',
	messagingSenderId: '818866713332',
	appId: '1:818866713332:web:c0d336055a43ef0052a4a1',
	databaseURL: 'https://taskmanager-2dd4d-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { db, storage };
