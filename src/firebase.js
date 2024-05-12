
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOf1P2Tfdrf1083c0Ujkp5wqW-pgMKBJI",
  authDomain: "netflix-clone-1dd41.firebaseapp.com",
  projectId: "netflix-clone-1dd41",
  storageBucket: "netflix-clone-1dd41.appspot.com",
  messagingSenderId: "391119446902",
  appId: "1:391119446902:web:45e14c9972eea731241057"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password)
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
    } catch (error) {
        console.log(error);
        alert(error)
    }
}

const login = async (email, password)=> {
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout};