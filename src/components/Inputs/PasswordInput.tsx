import React, { type InputHTMLAttributes, useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from './PasswordInput.module.scss'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, error, ...props }) => {
  const uid = useId()
  const inputId = id ?? `password-input-${uid}`
  const [visible, setVisible] = useState(false)

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className={styles.toggleButton}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {visible ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {error && (
        <span id={`${inputId}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  )
}

export default PasswordInput