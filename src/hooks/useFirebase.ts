import { useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1G6s5x-ekb2h-XXkUJNfwhuLLjIeKsww',
  authDomain: 'unifarm-afc8a.firebaseapp.com',
  databaseURL: 'https://unifarm-afc8a-default-rtdb.firebaseio.com',
  projectId: 'unifarm-afc8a',
  storageBucket: 'unifarm-afc8a.appspot.com',
  messagingSenderId: '1003653261124',
  appId: '1:1003653261124:web:ebef2b537376f4f8229911',
  measurementId: 'G-EY7HVVYVSF',
};

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

export const useFirebaseDb = () => {
  return useCallback(
    async (
      transactionUrl: string,
      userBscWalletAddress: string,
      userSolanaAddress: string
    ) => {
      let document = doc(collection(db, 'users'));
      await setDoc(document, {
        transactionUrl,
        userBscWalletAddress,
        userSolanaAddress,
      });
    },
    []
  );
};
