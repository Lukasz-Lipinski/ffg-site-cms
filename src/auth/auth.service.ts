import { getAuth } from 'firebase/auth'
import { firebaseAuth } from '@/auth/auth.config.ts'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth/web-extension'

const auth = getAuth(firebaseAuth)

async function CreateNewAccount(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password)
}

async function SignInUser(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password)
}

export { CreateNewAccount, SignInUser }
