// src/components/Modal/ForgotPasswordModal.tsx
import React, { useState, useCallback } from 'react'
import Modal from './Modal'
import TextInput from '../Inputs/TextInput'
import Button from '../Button/Button'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'
import styles from './ForgotPasswordModal.module.scss'

interface Props {
  open: boolean
  onClose: () => void
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ForgotPasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const validateEmail = useCallback(() => {
    if (!emailRegex.test(email)) {
      setEmailError('Por favor ingresa un email válido')
      return false
    }
    setEmailError(undefined)
    return true
  }, [email])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail()) return

    setLoading(true)
    try {
      await resetPassword(email)
      toast.success('Revisa tu bandeja de entrada para restablecer la contraseña')
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
      <h2 className={styles.title}>Olvidé mi contraseña</h2>
      <form onSubmit={handleReset} className={styles.form} noValidate>
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={emailError}
        />
        <Button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          Enviar enlace
        </Button>
      </form>
    </Modal>
  )
}

export default ForgotPasswordModal
