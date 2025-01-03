import { initializeApp } from "firebase/app";
import { getAuth , sendPasswordResetEmail, createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, set, get, update, remove, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, setDoc, updateDoc , collection, Firestore, getDoc} from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyBcOf3rITKrEri8aKetCMdnFRtQWt9ToMM",
  authDomain: "web-dev-1-af83f.firebaseapp.com",
  projectId: "web-dev-1-af83f",
  storageBucket: "web-dev-1-af83f.firebasestorage.app",
  messagingSenderId: "953805883850",
  appId: "1:953805883850:web:6c459805f5adb787e96733",
  measurementId: "G-9MVWM6E73W"
};
class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app); // Use getFirestore for Firestore
    this.actionCodeSettings = {
      url: 'https://www.example.com/checkout?cartId=1234',
      // This must be true for email link sign-in.
      handleCodeInApp: true,
    };
  }

  // Authentication methods (createUserWithEmailAndPassword, etc.)

  persistUserWithID = (userId, data) => {
    const userRef = doc(this.db, "users", userId); // Create document reference
    setDoc(userRef, data) // Set initial user data
      .then(() => {
        console.log("User document created with ID:", userRef.id);
      })
      .catch((error) => {
        console.error("Error creating user document:", error);
      });
  };

  checkUserExists = async (userId) => {
    try {
      const userRef = doc(this.db, "users", userId); 
      const docSnap = await getDoc(userRef); 
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return true;
      } else {
        return false;
      }
      return (docSnap.exists() != undefined)
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false; 
    }
  };

  updateUserWithID = (userId, newData) => {
    const userRef = doc(this.db, "users", userId); // Create document reference

    updateDoc(userRef, newData) // Update existing user data
      .then(() => {
        console.log("User document updated with ID:", userRef.id);
      })
      .catch((error) => {
        console.error("Error updating user document:", error);
      });
  };

  // sendResetEmail = (email) => sendPasswordResetEmail(this.auth, email)

  sendResetEmail = async (email) => {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return true; // Indicate success
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error; 
    }
  };

  doSignOut = () => signOut(this.auth);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

}

  export default Firebase;