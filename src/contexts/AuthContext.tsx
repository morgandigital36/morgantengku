import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set persistence to local storage so user stays logged in after refresh
    setPersistence(auth, browserLocalPersistence).then(() => {
      console.log('Auth persistence set to local storage');
    }).catch((error) => {
      console.error('Error setting auth persistence:', error);
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        
        // Get user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: userData.name || firebaseUser.displayName || '',
              role: userData.role || 'user'
            });
          } else {
            // Create user document if it doesn't exist
            const newUser = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || '',
              role: 'user' as const
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              createdAt: new Date()
            });
            
            setUser(newUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Set basic user data if Firestore fails
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            role: 'user'
          });
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error codes
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Email atau password salah. Pastikan Anda sudah mendaftar terlebih dahulu.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Password salah. Silakan coba lagi.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Format email tidak valid.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('Akun telah dinonaktifkan.');
      } else {
        throw new Error('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update the user's display name
      await updateProfile(firebaseUser, {
        displayName: name
      });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name,
        email,
        role: 'user',
        createdAt: new Date()
      });

      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific error codes
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau login.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password terlalu lemah. Gunakan minimal 6 karakter.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Format email tidak valid.');
      } else {
        throw new Error('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Terjadi kesalahan saat logout.');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};