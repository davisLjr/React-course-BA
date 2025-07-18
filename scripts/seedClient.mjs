// scripts/seedClient.mjs
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fs from "fs";

const products = JSON.parse(
  fs.readFileSync(new URL("../products.json", import.meta.url), "utf-8")
);

const firebaseConfig = {
  apiKey:     process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:      process.env.VITE_FIREBASE_APP_ID
};

async function seed() {
  console.log("Configuración usada:", {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId
  });

  // Inicializa Firebase cliente
  const app  = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db   = getFirestore(app);

  // Autenticación con cuenta admin
  const email = process.env.ADMIN_EMAIL;
  const pass  = process.env.ADMIN_PASS;
  if (!email || !pass) throw new Error("Faltan ADMIN_EMAIL o ADMIN_PASS");
  await signInWithEmailAndPassword(auth, email, pass);
  console.log("✅ Autenticado como admin:", email);

  // 1) Borra todos los productos existentes
  const colRef = collection(db, "products");
  const existing = await getDocs(colRef);
  console.log(`⏳ Borrando ${existing.size} productos antiguos...`);
  for (const d of existing.docs) {
    await deleteDoc(doc(db, "products", d.id));
  }
  console.log("✅ Productos antiguos eliminados");

  // 2) Sube los nuevos desde products.json
  console.log(`⏳ Sembrando ${products.length} productos nuevos...`);
  for (const p of products) {
    await addDoc(colRef, p);
    console.log(" +", p.title);
  }

  console.log("🎉 Seed completo");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Error en seed:", err);
  process.exit(1);
});
