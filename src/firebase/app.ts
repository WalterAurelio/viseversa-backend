import { initializeApp, cert, ServiceAccount, getApps, getApp } from "firebase-admin/app";
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
} as ServiceAccount;

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount)
      })
    : getApp();

export default app;
