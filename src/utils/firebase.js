import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvv49ja8p3wmxffnFa2d_EEqtDUbL1G6g",
  authDomain: "pincel-drawing.firebaseapp.com",
  projectId: "pincel-drawing",
  storageBucket: "pincel-drawing.appspot.com",
  messagingSenderId: "634618320042",
  appId: "1:634618320042:web:4537854f2fbadbf0996cd3",
  measurementId: "G-RDZW7JF1NL",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const store = firebase.storage();

export function uploadImage(image, cb) {
  const ImageUploadRef = store.ref(`images/${image.name}`);
  ImageUploadRef.put(image).then(() =>
    ImageUploadRef.getDownloadURL().then((res) => {
      cb(res);
    }),
  );
}
export function deleteImage(url) {
  let pictureRef = store.refFromURL(url);
  pictureRef
    .delete()
    .then(() => {
      console.log("Picture is deleted successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
}

class AuthHandler {
  constructor() {
    this.auth = app.auth(); // for handling authentication processes
  }

  register(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  signout() {
    return this.auth.signOut();
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
}

export const authHandler = new AuthHandler();
export default db;
