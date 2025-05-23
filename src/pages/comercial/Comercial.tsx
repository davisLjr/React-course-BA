import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Banner } from "../../components/Banner/Banner";
import { Text } from "../../components/Text/Text";
import coommercialImg from "/sections/tinified/commercial.webp"


const ComercialPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div style={{ marginBottom: '4rem' }}>
      <Banner
        title="Comercial"
        imgSrc={coommercialImg}
        imgAlt="imagen referente a sección de ubicaciones"
      />

      <div style={{ maxWidth: '1920px', margin: 'auto' }}>
        <div className="text-container">
          <Text
            style={{
              fontSize: "1.45rem",
              fontWeight: 300,
              maxWidth: "1100px",
              fontFamily: '"Libre Franklin", sans-serif',
            }}
            theme={theme}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s…
          </Text>

          <Text
            style={{
              fontSize: "1.45rem",
              fontWeight: 300,
              maxWidth: "1100px",
              fontFamily: '"Libre Franklin", sans-serif',
            }}
            theme={theme}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. 
          </Text>

          <Text
            style={{
              fontSize: "1.45rem",
              fontWeight: 300,
              maxWidth: "1100px",
              fontFamily: '"Libre Franklin", sans-serif',
            }}
            theme={theme}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s…
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ComercialPage;
