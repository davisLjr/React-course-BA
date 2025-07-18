import React, { type InputHTMLAttributes, useId } from 'react'
import styles from './TextInput.module.scss'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const TextInput: React.FC<TextInputProps> = ({ label, id, error, ...props }) => {
  const uid = useId()
  const inputId = id ?? `text-input-${uid}`

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>{label}</label>
      <input
        id={inputId}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  )
}

export default TextInput