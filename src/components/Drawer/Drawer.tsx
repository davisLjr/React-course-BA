import React, {type ReactNode, useEffect} from "react";
import "./drawer.scss";
import Button from "../Button/Button";
import {Moon, SunMoon, X} from "lucide-react";
import {useTheme} from "../../context/ThemeContext";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme?: "dark" | "light";
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  theme: propTheme,
}) => {
  const {toggleTheme, theme: contextTheme} = useTheme();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeTheme = propTheme ?? contextTheme;

  const classes = ["drawer", isOpen && "is-open", `drawer--${activeTheme}`]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <button
        className="drawer__backdrop"
        onClick={onClose}
        aria-label="Cerrar fondo"
      />
      <aside className="drawer__panel">
        <div className="drawer__panel--content">
          <Button
            onClick={toggleTheme}
            color="base"
            theme={activeTheme}
            aria-label="Cambiar tema"
          >
            {activeTheme === "light" ? (
              <Moon size={20} />
            ) : (
              <SunMoon size={20} />
            )}
          </Button>
          <Button
            className="drawer__close"
            onClick={onClose}
            aria-label="Cerrar menú"
            color="base"
            theme={activeTheme}
          >
            <X size={20} />
          </Button>
        </div>
        <div className="drawer__content">{children}</div>
      </aside>
    </div>
  );
};

export default Drawer;
