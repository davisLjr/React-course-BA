import React, { useState, useCallback } from 'react'
import Modal from './Modal'
import TextInput from '../Inputs/TextInput'
import PasswordInput from '../Inputs/PasswordInput'
import Button from '../Button/Button'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'
import styles from './RegisterModal.module.scss'

interface Props {
  open: boolean
  onClose: () => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RegisterModal: React.FC<Props> = ({ open, onClose }) => {
  const { signUp } = useAuth()
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
    if (pass.length < 6) {
      setPassError('La contraseña debe tener al menos 6 caracteres')
      return false
    }
    setPassError(undefined)
    return true
  }, [pass])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const okEmail = validateEmail()
    const okPass  = validatePass()
    if (!okEmail || !okPass) return

    setLoading(true)
    try {
      await signUp(email, pass)
      toast.success('Cuenta creada correctamente')
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className={styles.title}>Registrarse</h2>
      <form onSubmit={handleRegister} className={styles.form} noValidate>
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
        <Button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          Crear cuenta
        </Button>
      </form>
    </Modal>
  )
}

export default RegisterModal
