import { initializeApp, cert, ServiceAccount, getApps, getApp } from 'firebase-admin/app';
import serviceAccount from './firebase-service-account.json';

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount)
      })
    : getApp();

export default app;
