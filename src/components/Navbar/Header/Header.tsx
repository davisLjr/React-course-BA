import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useMedia from 'use-media'
import { AlignVerticalJustifyEnd, Menu, ShoppingCart } from 'lucide-react'
import { MobileNavbar } from '../mobile/NavbarMobile'
import { Navbar } from '../desktop/NavbarDesktop'

import { useTheme } from '../../../context/ThemeContext'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
import Button from '../../Button/Button'
import Drawer from '../../Drawer/Drawer'
import LoginModal from '../../Modal/LoginModal'
import RegisterModal from '../../Modal/RegisterModal'
import ForgotPasswordModal from '../../Modal/ForgotPasswordModal'

export const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()  
  const { theme } = useTheme()
  const isMobile = useMedia({ maxWidth: '1017px' })
  const { items } = useCart()
  const { user, isAdmin, logout } = useAuth()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgot] = useState(false)

  const isActive = (path: string) => location.pathname.startsWith(path)

  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const menuItems = (
    <nav>
      <ul>
        <li>
          <Button
            isLink
            to="/products"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive('/products') ? 'btn--active' : ''}
          >
            Products
          </Button>
        </li>
        <li>
          <Button
            isLink
            to="/categories"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive('/categories') ? 'btn--active' : ''}
          >
            Categories
          </Button>
        </li>
        <li>
          <Button
            isLink
            to="/locations"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive('/locations') ? 'btn--active' : ''}
          >
            Locations
          </Button>
        </li>
        <li>
          <Button
            isLink
            to="/commercial"
            color="base"
            theme={theme}
            onClick={closeDrawer}
            className={isActive('/commercial') ? 'btn--active' : ''}
          >
            Commercial
          </Button>
        </li>
        {isAdmin && (
          <li>
            <Button
              isLink
              to="/admin"
              color="base"
              theme={theme}
              onClick={closeDrawer}
              className={isActive('/admin') ? 'btn--active' : ''}
            >
              Admin
            </Button>
          </li>
        )}
      </ul>
    </nav>
  )

  const leftContent = (
    <Button
      isLink
      to="/"
      icon={<AlignVerticalJustifyEnd size={20} />}
      theme={theme}
      iconPosition="left"
      color="base"
      style={{ padding: 0 }}
    >
      ECX
    </Button>
  )

  const cartButton = user && (
    <Button
      isLink
      to="/cart"
      color="base"
      theme={theme}
      hasBadge
      badgeCount={items.length}
      aria-label="Ver carrito de compras"
    >
      <ShoppingCart size={20} />
    </Button>
  )

  const authButtons = user ? (
    <Button onClick={handleLogout} color="base" theme={theme}>
      Cerrar sesión
    </Button>
  ) : (
    <>
      <Button onClick={() => setShowLogin(true)} color="base" theme={theme}>
        Iniciar sesión
      </Button>
      <Button onClick={() => setShowRegister(true)} color="base" theme={theme}>
        Registrarse
      </Button>
    </>
  )

  const rightContentMobile = (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {cartButton}
      {authButtons}
      <Button color="base" theme={theme} onClick={openDrawer}>
        <Menu size={20} />
      </Button>
    </div>
  )

  const rightContentDesktop = (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {cartButton}
      {authButtons}
      {isAdmin && (
        <Button isLink to="/admin" color="base" theme={theme}>
          Admin
        </Button>
      )}
    </div>
  )

  return (
    <header style={{ position: 'sticky', top: 0, width: '100%', zIndex: 99 }}>
      {isMobile ? (
        <>
          <MobileNavbar
            theme={theme}
            leftContent={leftContent}
            rightContent={rightContentMobile}
          />
          <Drawer isOpen={drawerOpen} onClose={closeDrawer} theme={theme}>
            {menuItems}
          </Drawer>
        </>
      ) : (
        <Navbar
          theme={theme}
          leftContent={leftContent}
          centerContent={
            <ul style={{ display: 'flex', gap: '2.5rem' }}>
              <li>
                <Button
                  isLink
                  to="/products"
                  color="base"
                  theme={theme}
                  className={isActive('/products') ? 'btn--active' : ''}
                >
                  Products
                </Button>
              </li>
              <li>
                <Button
                  isLink
                  to="/categories"
                  color="base"
                  theme={theme}
                  className={isActive('/categories') ? 'btn--active' : ''}
                >
                  Categories
                </Button>
              </li>
              <li>
                <Button
                  isLink
                  to="/locations"
                  color="base"
                  theme={theme}
                  className={isActive('/locations') ? 'btn--active' : ''}
                >
                  Locations
                </Button>
              </li>
              <li>
                <Button
                  isLink
                  to="/commercial"
                  color="base"
                  theme={theme}
                  className={isActive('/commercial') ? 'btn--active' : ''}
                >
                  Commercial
                </Button>
              </li>
              {isAdmin && (
                <li>
                  <Button
                    isLink
                    to="/admin"
                    color="base"
                    theme={theme}
                    className={isActive('/admin') ? 'btn--active' : ''}
                  >
                    Admin
                  </Button>
                </li>
              )}
            </ul>
          }
          rightContent={rightContentDesktop}
        />
      )}

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
    </header>
  )
}
