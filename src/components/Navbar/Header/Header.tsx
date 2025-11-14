import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, LogOut, User } from 'lucide-react'

import { useTheme } from '../../../context/ThemeContext'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
import LoginModal from '../../Modal/LoginModal'
import RegisterModal from '../../Modal/RegisterModal'
import ForgotPasswordModal from '../../Modal/ForgotPasswordModal'

import './header.scss'

export const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { items } = useCart()
  const { user, isAdmin, logout } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgot] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname.startsWith(path)
  const isHomePage = location.pathname === '/'

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''} ${isHomePage ? '' : 'header--always-solid'} header--${theme}`}>
        <div className="header__container">
          {/* Logo */}
          <Link to="/" className="header__logo" onClick={closeMobileMenu}>
            <span className="header__logo-text">Magia en papel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav">
            <Link
              to="/products"
              className={`header__nav-link ${isActive('/products') ? 'active' : ''}`}
            >
              Productos
            </Link>
            <Link
              to="/categories"
              className={`header__nav-link ${isActive('/categories') ? 'active' : ''}`}
            >
              Categorías
            </Link>
            <Link
              to="/locations"
              className={`header__nav-link ${isActive('/locations') ? 'active' : ''}`}
            >
              Ubicación
            </Link>
            <Link
              to="/contactanos"
              className={`header__nav-link ${isActive('/contactanos') ? 'active' : ''}`}
            >
              Contáctanos
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`header__nav-link ${isActive('/admin') ? 'active' : ''}`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="header__actions">
            {user && (
              <Link to="/cart" className="header__cart" aria-label="Ver carrito">
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="header__cart-badge">{items.length}</span>
                )}
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="header__button header__button--outline"
                aria-label="Cerrar sesión"
              >
                <LogOut size={18} />
                <span className="header__button-text">Cerrar sesión</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="header__button header__button--outline"
                >
                  <User size={18} />
                  <span className="header__button-text">Iniciar sesión</span>
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="header__button header__button--primary"
                >
                  Registrarse
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="header__mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`header__mobile-menu ${mobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
          <nav className="header__mobile-nav">
            <Link
              to="/products"
              className={`header__mobile-link ${isActive('/products') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Productos
            </Link>
            <Link
              to="/categories"
              className={`header__mobile-link ${isActive('/categories') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Categorías
            </Link>
            <Link
              to="/locations"
              className={`header__mobile-link ${isActive('/locations') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Ubicación
            </Link>
            <Link
              to="/contactanos"
              className={`header__mobile-link ${isActive('/contactanos') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Contáctanos
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`header__mobile-link ${isActive('/admin') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            )}

            {user && (
              <Link
                to="/cart"
                className="header__mobile-link"
                onClick={closeMobileMenu}
              >
                <ShoppingCart size={18} />
                Carrito {items.length > 0 && `(${items.length})`}
              </Link>
            )}
          </nav>
        </div>
      </header>

      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onForgotPassword={() => {
          setShowLogin(false)
          setShowForgot(true)
        }}
      />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgot(false)}
      />
    </>
  )
}
