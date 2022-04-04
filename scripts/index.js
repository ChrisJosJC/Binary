// Importacion de Firebase
import { collection, addDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js';

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
const firebaseConfig = {
    apiKey: "AIzaSyBouPXvdTyWRDL-lBGOc_5A-CHlxBX6Sh8",
    authDomain: "courbe-c86a4.firebaseapp.com",
    projectId: "courbe-c86a4",
    storageBucket: "courbe-c86a4.appspot.com",
    messagingSenderId: "898058392796",
    appId: "1:898058392796:web:b4d06b2937300495ff9019"
};

// Variables
const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore()

//Inputs
const name = document.getElementById("Name")
const photo = document.getElementById("photo")
const email = document.getElementById("email")
const password = document.getElementById("password")
const buttonGoogle = document.getElementById("buttonGoogle")
const buttonFacebook = document.getElementById("buttonFacebook")

// Funcion que almacene los datos del usuario en la base de datos
const saveUser = async(user) => {
    console.log(user.displayName, user.photoURL, user.email);
    var newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
    }
    try {
        const docRef = await addDoc(collection(db, "users"), newUser);
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem('id', docRef.id);
        document.getElementById("spinner").style.display = "block"
        window.location.href = "profile.html"

    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

let image
photo.addEventListener("change", async(e) => {
    //Subiendo la imagen a Firebase
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, file.name)

    await uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    //Obteniendo la url de la imagen
    await getDownloadURL(ref(storage, file.name))
        .then((url) => {
            image = url;
            console.log(url);
        });
})

//Correo electronico y contraseña
submit.addEventListener("click", async(e) => {
    e.preventDefault();

    //Creando el usuario
    await createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCred) => {
            let user = userCred.user;
            user.displayName = name.value;
            user.photoURL = image;
            console.log("Usuario Creado", user);

            saveUser(user);
        })
        .catch((error) => {
            console.error(error.message);
        });
});

//Iniciar sesion con google
buttonGoogle.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
        .then((result) => {
            let user = result.user;
            console.log("Usuario creado con Google", user);
            saveUser(user);
        })
        .catch((error) => {
            console.error(error.message);
        });
});
//Iniciar sesion con Facebook
buttonFacebook.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, providerFB)
        .then((result) => {
            let user = result.user;
            console.log("Usuario creado con Facebook", user);
            saveUser(user);
        })
        .catch((error) => {
            console.error(error.message);
        });
});