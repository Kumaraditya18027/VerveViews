import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCG9Uyxa5wA1Z6bCGPUnBtkWuDJyTvje-0",
    authDomain: "blog-4e184.firebaseapp.com",
    projectId: "blog-4e184",
    storageBucket: "blog-4e184.appspot.com",
    messagingSenderId: "543739534054",
    appId: "1:543739534054:web:e2951aa3b9e456bef07927"
  };

  const app=initializeApp(firebaseConfig);
  export const storage=getStorage(app);
  export const auth=getAuth(app);
  export const db=getFirestore(app);
  