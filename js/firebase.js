// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIkyAq5YmDqRtSogqh4gg9Up_lDl1GeM0",
  authDomain: "p1xieflix.firebaseapp.com",
  projectId: "p1xieflix",
  storageBucket: "p1xieflix.firebasestorage.app",
  messagingSenderId: "891176958129",
  appId: "1:891176958129:web:a8a8c211047c30faf3ca90",
  measurementId: "G-9YLVF5E8FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);


document.getElementById('signupPageContainer').addEventListener("submit", async (e)=>{

    e.preventDefault();
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPassword').value;

    try{
        await createUserWithEmailAndPassword(auth, email, password);
        alert("account has been created successfully!");
        window.location.href = "index.html";

    }
    
    catch (error){
        alert(error.message);
    }

});


document.getElementById('loginContainer').addEventListener("submit", async (e)=>{

    e.preventDefault();
    let email = document.getElementById('logInEmail').value;
    let password = document.getElementById('logInPassword').value;

    try{
        await signInWithEmailAndPassword(auth, email, password);
        alert("account has log in successful!");
        window.location.href = "../pages/library.html";

    }
    
    catch (error){
        alert(error.message);
    }
    
});