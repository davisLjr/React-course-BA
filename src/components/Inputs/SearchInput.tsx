import React, { useId, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchInput.module.scss';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  id,
  placeholder,
  error,
  value,
  onChange,
  ...props
}) => {
  const uid = useId();
  const inputId = id ?? `search-input-${uid}`;

  const handleClear = useCallback(() => {
    // Invoca onChange con un evento sintético vacío
    const fakeEvent = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(fakeEvent);
  }, [onChange]);

  const hasValue = Boolean(value);

  return (
    <div className={styles.wrapper}>
      <Search className={styles.icon} aria-hidden="true" />
      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        value={value}
        onChange={onChange}
        {...props}
      />
      {hasValue && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearBtn}
          aria-label="Borrar búsqueda"
        >
          <X size={16} />
        </button>
      )}
      {error && (
        <span id={`${inputId}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

export default SearchInput;
