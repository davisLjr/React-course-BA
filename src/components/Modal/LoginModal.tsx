import React, { useState, useCallback } from 'react'
import Modal from './Modal'
import TextInput from '../Inputs/TextInput'
import PasswordInput from '../Inputs/PasswordInput'
import Button from '../Button/Button'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'
import type { FirebaseError } from 'firebase/app'
import styles from './LoginModal.module.scss'

interface Props {
  open: boolean
  onClose: () => void
  onForgotPassword?: () => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginModal: React.FC<Props> = ({ open, onClose, onForgotPassword }) => {
  const { signIn, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass]   = useState('')
  const [emailError, setEmailError] = useState<string | undefined>()
  const [passError, setPassError]   = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const validateEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setEmailError('Por favor ingresa un email válido')
      return false
    }
    setEmailError(undefined)
    return true
  }, [email])

  const validatePass = useCallback(() => {
    if (!pass.trim()) {
      setPassError('La contraseña no puede estar vacía')
      return false
    }
    setPassError(undefined)
    return true
  }, [pass])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const okEmail = validateEmail()
    const okPass  = validatePass()
    if (!okEmail || !okPass) return

    setLoading(true)
    try {
      await signIn(email, pass)
      toast.success('Has iniciado sesión con éxito')
      onClose()
    } catch (err: unknown) {
      let msg = 'Ha ocurrido un error'
      const e = err as { code?: string; message?: string }
      if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
        msg = 'Este usuario no está registrado'
      } else if (e.code === 'auth/wrong-password') {
        msg = 'Contraseña incorrecta'
      } else if (e.message) {
        msg = e.message
      }
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      toast.success('Has iniciado sesión con Google')
      onClose()
    } catch (err: unknown) {
      let msg: string
      if ((err as FirebaseError).message) {
        msg = (err as FirebaseError).message
      } else {
        msg = String(err)
      }
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className={styles.title}>Iniciar sesión</h2>
      <form onSubmit={handleLogin} className={styles.form} noValidate>
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={emailError}
        />
        <PasswordInput
          label="Contraseña"
          value={pass}
          onChange={e => setPass(e.target.value)}
          onBlur={validatePass}
          error={passError}
        />
        <div className={styles.actions}>
          <Button
            type="submit"
            color="primary"
            size="medium"
            className={styles.loginButton}
            disabled={loading}
          >
            Entrar
          </Button>
          <Button
            type="button"
            onClick={handleGoogle}
            color="secondary"
            size="medium"
            className={styles.googleButton}
            disabled={loading}
          >
            Entrar con Google
          </Button>
        </div>
      </form>
      <button
        onClick={onForgotPassword}
        className={styles.forgotButton}
        disabled={loading}
      >
        Olvidé mi contraseña
      </button>
    </Modal>
  )
}

export default LoginModal