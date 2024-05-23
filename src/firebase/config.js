import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBfbwi44_GSCZSoep10d1RYO2Q-ykya36k",
  authDomain: "ecommerce-9c6b3.firebaseapp.com",
  projectId: "ecommerce-9c6b3",
  storageBucket: "ecommerce-9c6b3.appspot.com",
  messagingSenderId: "730328235782",
  appId: "1:730328235782:web:0d25a203969fad3cf1a887"
};

export const app = initializeApp(firebaseConfig);