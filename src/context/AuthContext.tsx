import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signUp: (email: string, pass: string) => Promise<UserCredential>
  signIn: (email: string, pass: string) => Promise<UserCredential>
  signInWithGoogle: () => Promise<UserCredential>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL as string

  const signUp = async (email: string, pass: string): Promise<UserCredential> => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    const adminFlag = email === adminEmail
    await setDoc(doc(db, 'users', cred.user.uid), { isAdmin: adminFlag })
    return cred
  }

  const signIn = async (email: string, pass: string): Promise<UserCredential> => {
    const cred = await signInWithEmailAndPassword(auth, email, pass)
    return cred
  }

  const signInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider()
    const cred = await signInWithPopup(auth, provider)
    const userRef = doc(db, 'users', cred.user.uid)
    const snap = await getDoc(userRef)
    if (!snap.exists()) {
      const adminFlag = cred.user.email === adminEmail
      await setDoc(userRef, { isAdmin: adminFlag })
    }
    return cred
  }

  const resetPassword = (email: string): Promise<void> =>
    sendPasswordResetEmail(auth, email)

  const logout = (): Promise<void> =>
    signOut(auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid)
        const snap = await getDoc(userRef)
        if (!snap.exists()) {
          await setDoc(userRef, { isAdmin: false })
          setIsAdmin(false)
        } else {
          setIsAdmin(snap.data().isAdmin === true)
        }
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAdmin,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    resetPassword,
    logout
  }), [user, isAdmin, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
