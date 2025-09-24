import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD4O7cQWr_YwLU4ne4wSTpqEuA9NpndoFU",
  authDomain: "netflix-clone-24249.firebaseapp.com",
  projectId: "netflix-clone-24249",
  storageBucket: "netflix-clone-24249.firebasestorage.app",
  messagingSenderId: "111141604573",
  appId: "1:111141604573:web:bb89f28fc6defe8ab59f34"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
}
const logout=()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};