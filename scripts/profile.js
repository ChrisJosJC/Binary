//Importaciones
import { doc, getDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
const firebaseConfig = {
    apiKey: "AIzaSyBouPXvdTyWRDL-lBGOc_5A-CHlxBX6Sh8",
    authDomain: "courbe-c86a4.firebaseapp.com",
    projectId: "courbe-c86a4",
    storageBucket: "courbe-c86a4.appspot.com",
    messagingSenderId: "898058392796",
    appId: "1:898058392796:web:b4d06b2937300495ff9019"
};

// Variables
const app = initializeApp(firebaseConfig);
const db = getFirestore()

//Datos de mi usuario
const docRef = doc(db, "users", localStorage.getItem("id"));
const docSnap = await getDoc(docRef);
const data = docSnap.data()
console.log(data);
//Variables del DOM
document.querySelector(".card-title").innerHTML = data.name;
document.querySelector(".card-text").innerHTML = data.email;
document.querySelector(".card-img-top").setAttribute("src", data.photo);