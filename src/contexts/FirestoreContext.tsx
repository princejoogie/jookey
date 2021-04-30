import React, { createContext, useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

export type AuthTypes = {
  user: FirebaseAuthTypes.User | null;
  keys: Array<KeyType>;
};

export type KeyType = {
  id: string;
  data: {
    [key: string]: any;
  };
};

export const AuthContext = createContext<AuthTypes>({
  user: null,
  keys: [],
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [keys, setKeys] = useState<Array<KeyType>>([]);

  useEffect(() => {
    const authSub = auth().onAuthStateChanged(res => {
      setUser(res);
    });

    const keysSub = db()
      .collection('users')
      .doc(user?.uid)
      .collection('keys')
      .orderBy('name')
      .onSnapshot(snapshot => {
        setKeys(
          snapshot.docs.map(doc => ({ id: doc.id, data: { ...doc.data() } })),
        );
      });

    return () => {
      authSub();
      keysSub();
    };
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user, keys }}>
      {children}
    </AuthContext.Provider>
  );
};
