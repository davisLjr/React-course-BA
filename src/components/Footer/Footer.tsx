import React from "react";
import {useTheme} from "../../context/ThemeContext";
import {Text} from "../Text/Text";
import Button from "../Button/Button";
import { Moon, SunMoon} from "lucide-react";
import useMedia from "use-media";

const Footer: React.FC = () => {
  const {toggleTheme, theme} = useTheme();
  const isMobile = useMedia({maxWidth: "1017px"});

  const horizontalPadding = isMobile ? "20px" : "60px";

  const footerStyle: React.CSSProperties = {
    width: "100%",
    padding: `40px ${horizontalPadding}`,
    borderTop: `1px solid ${theme === "light" ? "#bababa" : "#7b7b7b"}`,
    backgroundColor: theme === "light" ? "#f7ebec" : "#212529",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  };

  const footerContentStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  };

  const footerColumnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    minWidth: "150px",
    flexWrap: "wrap",
  };

  const footerBottomStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: `1px solid ${theme === "light" ? "#bababa" : "#7b7b7b"}`,
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <div style={footerColumnStyle}>
          <Button
            isLink
            to="/"
            theme={theme}
            color="base"
            style={{padding: "0", marginRight: "1rem"}}
          >
            Magia en papel
          </Button>
          <Button isLink to="/products" color="base" theme={theme}>
            Productos
          </Button>
          <Button isLink to="/categories" color="base" theme={theme}>
            Categorias
          </Button>
          <Button isLink to="/locations" color="base" theme={theme}>
            Ubicación
          </Button>
          <Button isLink to="/contactanos" color="base" theme={theme}>
            Contactanos
          </Button>
        </div>
      </div>

      <div style={footerBottomStyle}>
        <Text
          style={{
            fontSize: "0.875rem",
            fontWeight: 300,
          }}
          theme={theme}
        >
          © {new Date().getFullYear()} E-Commerce Experience. Imágenes bajo licencia de tercero.
        </Text>

        <Button
          onClick={toggleTheme}
          color="base"
          theme={theme}
          aria-label="Cambiar tema"
        >
          {theme === "light" ? <Moon size={20} /> : <SunMoon size={20} />}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
