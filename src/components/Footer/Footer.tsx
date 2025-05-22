import React from "react";
import {useTheme} from "../../context/ThemeContext";
import {Text} from "../Text/Text";
import Button from "../Button/Button";
import {AlignVerticalJustifyEnd, Moon, SunMoon} from "lucide-react";
import useMedia from "use-media";

const Footer: React.FC = () => {
  const {toggleTheme, theme} = useTheme();
  const isMobile = useMedia({maxWidth: "1017px"});

  const horizontalPadding = isMobile ? "20px" : "60px";

  const footerStyle: React.CSSProperties = {
    width: "100%",
    padding: `40px ${horizontalPadding}`,
    borderTop: `1px solid ${theme === "light" ? "#e5e5e5" : "#333"}`,
    backgroundColor: theme === "light" ? "#fff" : "#212529",
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
    borderTop: `1px solid ${theme === "light" ? "#e5e5e5" : "#333"}`,
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <div style={footerColumnStyle}>
          <Button
            isLink
            to="/"
            icon={<AlignVerticalJustifyEnd size={20} />}
            theme={theme}
            iconPosition="left"
            color="base"
            style={{padding: "0", marginRight: "1rem"}}
          >
            ECX
          </Button>
          <Button isLink to="/products" color="base" theme={theme}>
            Products
          </Button>
          <Button isLink to="/categories" color="base" theme={theme}>
            Categories
          </Button>
          <Button isLink to="/locations" color="base" theme={theme}>
            Locations
          </Button>
          <Button isLink to="/commercial" color="base" theme={theme}>
            Commercial
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
