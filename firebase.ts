import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkT7sqJaDTseqTnOvRccsmXm6e9lpLnek",
  authDomain: "pave-6c426.firebaseapp.com",
  projectId: "pave-6c426",
  storageBucket: "pave-6c426.appspot.com",
  messagingSenderId: "577752091925",
  appId: "1:577752091925:web:ca36032003edc1f6172d1c",
  measurementId: "G-Y8T695EXFT",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
