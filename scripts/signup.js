// Importacion de Firebase
import {
  collection,
  addDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBouPXvdTyWRDL-lBGOc_5A-CHlxBX6Sh8",
  authDomain: "courbe-c86a4.firebaseapp.com",
  projectId: "courbe-c86a4",
  storageBucket: "courbe-c86a4.appspot.com",
  messagingSenderId: "898058392796",
  appId: "1:898058392796:web:b4d06b2937300495ff9019",
};

// Variables
const provider = new GoogleAuthProvider();
const providerFB = new FacebookAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

//Inputs
const form = document.getElementById("formUp");
const photo = document.getElementById("photo")
const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const buttonGoogle = document.getElementById("buttonGoogle");
const buttonFacebook = document.getElementById("buttonFacebook");

// Funcion que almacene los datos del usuario en la base de datos
const saveUser = async (user) => {
  console.log(user);
  var newUser = {
    name: user.name,
    email: user.email,
    photoURL: user.photoURL,
  };
  try {
    const docRef = await addDoc(collection(db, "users"), newUser);
    console.log("Document written with ID: ", docRef.id);
    localStorage.setItem("id", docRef.id);
    document.getElementById("spinner").style.display = "block";
    window.location.href = "/profile.html";
  } catch (e) {
    console.error("Error adding document: ", e);
  }

};

let image;
photo.addEventListener("change", async (e) => {
  //Subiendo la imagen a Firebase
  const file = e.target.files[0];
  const storage = getStorage();
  const storageRef = ref(storage, file.name);

  uploadBytes(storageRef, file).then(snapchot => {
    getDownloadURL(ref(storage, file.name)).then(url => {
      image = url;
      console.log(image);
      document.getElementById("photo-img").src = image;
      document.querySelector('[for="photo"]').style.display = "none";
    });
  });
})

let regEmail = RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)

//Correo electronico y contraseña
form.addEventListener("submit", async (e) => {
  // Nombre de usuario
  if (usernameEl.value.length < 3) {
    e.preventDefault();
    username.style.outline = "2px solid red";
    return
  }
  // Correo electronico
  if (!regEmail.test(emailEl.value)) {
    e.preventDefault();
    email.style.outline = "2px solid red";
    return
  }
  // Contraseña
  if (passwordEl.value.length < 6) {
    e.preventDefault();
    password.style.outline = "2px solid red";
    return
  }
  // Confirmar contraseña
  if (confirmPasswordEl.value !== passwordEl.value) {
    e.preventDefault();
    confirmPasswordEl.style.outline = "2px solid red";
    console.log("Tu no sabes escribir?");
    return
  }
  // Si todo esta correcto

  e.preventDefault();
  document.getElementById("spinner").style.display = "block";
  // Creando el usuario
  await createUserWithEmailAndPassword(getAuth(), emailEl.value, passwordEl.value)
    .then((user) => {
      // Guardando el usuario en la base de datos
      console.log("Todo nice en: ", user);
      saveUser({ name: usernameEl.value, photoURL: image, email: emailEl.value, description: "Hola, yo soy... :)" });
    })
    .catch((error) => {
      console.log(error);
    });
})
// // error.style.backgroundColor = "#f3d534";
// //Creando el usuario

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

// Animacion de los formularios

const signinBtn = document.querySelector(".signinBtn");
const signupBtn = document.querySelector(".signupBtn");
const formBx = document.querySelector(".formBx");
const blackBg = document.querySelector(".blackBg");
const body = document.querySelector("body");

signupBtn.addEventListener("click", (e) => {
  formBx.classList.add("active");
  blackBg.classList.add("active");
  body.classList.add("active");
})

signinBtn.addEventListener("click", (e) => {
  formBx.classList.remove("active");
  blackBg.classList.remove("active");
  body.classList.remove("active")
})