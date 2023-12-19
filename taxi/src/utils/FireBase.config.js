import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getAnalytics} from 'firebase/analytics';

const usersCollection = firestore().collection('Users');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDeBrkSyDJ3rqjxYxfGTfGXbis5KdGZ9Ks',
  authDomain: 'myuber-4307b.firebaseapp.com',
  projectId: 'myuber-4307b',
  storageBucket: 'myuber-4307b.appspot.com',
  messagingSenderId: '623348523910',
  appId: '1:623348523910:web:201ea11ee528ff43160207',
  measurementId: 'G-684095PZL8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export default app;
