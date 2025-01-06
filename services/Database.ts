import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  Firestore,
} from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { UserData } from "@/interfaces/userData.interface";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export class Database {
  static app: FirebaseApp;
  static db: Firestore;

  static init() {
    Database.app = initializeApp(firebaseConfig);
    Database.db = getFirestore(Database.app);
  }
  static async getAllMovies(): Promise<UserData[]> {
    const querySnapshot = await getDocs(collection(Database.db, "movies"));
    return querySnapshot.docs.map((doc) => ({
      id: Number(doc.id),
      bannerUrl: doc.data().bannerUrl,
    }));
  }
  static async getAllTvShows(): Promise<UserData[]> {
    const querySnapshot = await getDocs(collection(Database.db, "tvs"));
    return querySnapshot.docs.map((doc) => ({
      id: Number(doc.id),
      bannerUrl: doc.data().bannerUrl,
    }));
  }
  static async addMovie(id: number, bannerUrl: string) {
    const docRef = doc(Database.db, "movies", id.toString());
    await setDoc(docRef, { id, bannerUrl });
  }
  static async addTvShow(id: number, bannerUrl: string) {
    const docRef = doc(Database.db, "tvs", id.toString());
    await setDoc(docRef, { id, bannerUrl });
  }
  static async deleteMovie(id: number) {
    await deleteDoc(doc(Database.db, "movies", id.toString()));
  }
  static async deleteTvShow(id: number) {
    await deleteDoc(doc(Database.db, "tvs", id.toString()));
  }
}
