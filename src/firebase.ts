// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDXcmsod2Wuk5guNzWNrKyHqUxoSuhAreg',
	authDomain: 'taskmanager-2dd4d.firebaseapp.com',
	databaseURL: 'https://taskmanager-2dd4d-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'taskmanager-2dd4d',
	storageBucket: 'taskmanager-2dd4d.appspot.com',
	messagingSenderId: '818866713332',
	appId: '1:818866713332:web:c0d336055a43ef0052a4a1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { db, storage };
