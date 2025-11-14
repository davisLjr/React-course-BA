import React, {useState} from "react";
import {useTheme} from "../../context/ThemeContext";
import {Hero} from "../../components/Hero/Hero";
import {Text} from "../../components/Text/Text";
import useMedia from "use-media";
import "./home.scss";
import BannerImage from "../../components/BannerImage/BannerImage";
import {AnimatePresence, motion} from "framer-motion";
import banner1 from "/banner/banner1.webp";
import banner2 from "/banner/banner2.webp";
import banner3 from "/banner/banner3.webp";
import banner4 from "/banner/banner4.webp";

const Home: React.FC = () => {
  const {theme} = useTheme();
  const isMobile = useMedia({maxWidth: "1017px"});

  const scrollOneView = () => {
    window.scrollBy({
      top: window.innerHeight * 0.95,
      behavior: "smooth",
    });
  };

  const [splashVisible, setSplashVisible] = useState(true);
  const handleVideoReady = () => {
    setSplashVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {splashVisible && (
          <motion.div
            className="hero-splash"
            initial={{opacity: 1}}
            animate={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 2}}}
          >
            <Text as="h1" className="hero-splash__text">
              La magia de tus fiestas empieza aquí
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
      <Hero
        titlePrimary={
          <div>
            <Text
              as="h1"
              style={{
                fontSize: isMobile ? "2.5rem" : "3.5rem",
                textAlign: "left",
                fontWeight: '600',
                lineHeight: '1.08',
                letterSpacing: '-0.015em',
                margin: 0
              }}
            >
              La magia de tus fiestas empieza aquí
            </Text>
            <Text
              as="p"
              style={{
                fontSize: isMobile ? "1.05rem" : "1.125rem",
                textAlign: "left",
                fontWeight: "400",
                lineHeight: "1.5",
                letterSpacing: "-0.003em",
                opacity: 0.92,
                marginTop: "1.25rem",
                maxWidth: "650px"
              }}
            >
              Diseños exclusivos que harán brillar tu evento. Hechas con amor y
              detalle para que tu fiesta sea mágica.
            </Text>
          </div>
        }
        buttonText="Explorar Productos"
        onButtonClick={scrollOneView}
        poster="/poster.jpg"
        videoSources={[
          {src: "/bg1.webm", type: "video/webm"},
          {src: "/bg1.mp4", type: "video/mp4"},
        ]}
        style={{marginTop: "-75px"}}
        onVideoReady={handleVideoReady}
      />

      <div className="custom-container">
        <Text
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            maxWidth: "980px",
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
            lineHeight: '1.6',
            letterSpacing: '-0.003em',
          }}
          theme={theme}
        >
          ¡Diversión asegurada para todos! Descubre nuestras piñatas únicas que harán que cada celebración sea inolvidable. Desde personajes favoritos hasta diseños de fantasía, tenemos la piñata perfecta para cualquier ocasión.
        </Text>

        <BannerImage
          title="Para chicos"
          description="Acción, aventuras y sus héroes favoritos: nuestras piñatas para chicos están llenas de color y diversión para que cada fiesta sea épica."
          src={banner1}
          alt="Seating system Moto"
        />

        <BannerImage
          title="Para chicas"
          description="Princesas, unicornios y mucho brillo: nuestras piñatas para chicas harán que cada cumpleaños sea mágico y lleno de sorpresas."
          src={banner2}
          alt="Garden Lounge outdoor"
          inverted
        />

        <BannerImage
          title="Para ambos"
          description="Diversión para todos: diseños neutrales y coloridos que harán reír y sorprender a chicos y chicas por igual."
          src={banner4}
          alt="Seating system Moto"
        />

        <BannerImage
          title="Fantasia"
          description="Explora mundos mágicos: dragones, castillos y criaturas fantásticas en piñatas que despiertan la imaginación de grandes y chicos."
          src={banner3}
          alt="Garden Lounge outdoor"
          inverted
        />
      </div>

      <Hero
        titlePrimary={
          <Text
            as="h1"
            style={{
              fontSize: isMobile ? "3rem" : "4.5rem",
              textAlign: "left",
              fontWeight: '600',
              marginBottom: '1rem'
            }}
          >
            Haz realidad la fiesta de tus sueños
          </Text>
        }
        titleSecondary={
          <Text
            as="p"
            style={{
              fontSize: isMobile ? "1.1rem" : "1.35rem",
              fontWeight: 300,
              textAlign: "left",
              lineHeight: '1.6',
              maxWidth: '600px'
            }}
          >
            Piñatas únicas y personalizadas que transforman cada celebración en un momento mágico e inolvidable
          </Text>
        }
        buttonText="Explorar Categorías"
        linkTo="/categories"
        poster="/poster2.jpg"
        videoSources={[
          {src: "/bg2.webm", type: "video/webm"},
          {src: "/bg2.mp4", type: "video/mp4"},
        ]}
        style={{marginTop: "100px", width: "100%"}}
      />

      <div className="custom-container">
        <Text
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            maxWidth: "980px",
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
            lineHeight: '1.6',
            letterSpacing: '-0.003em',
            margin: 0
          }}
          theme={theme}
        >
          ¡Diversión asegurada para todos! Descubre nuestras piñatas únicas que harán que cada celebración sea inolvidable. Desde personajes favoritos hasta diseños de fantasía, tenemos la piñata perfecta para cualquier ocasión. Cada detalle está pensado para sorprender y emocionar a los niños, haciendo de cada fiesta un momento especial para recordar.
        </Text>

        <Text
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            maxWidth: "980px",
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
            lineHeight: '1.6',
            letterSpacing: '-0.003em',
          }}
          theme={theme}
        >
          Nuestra colección incluye modelos para todos los gustos y edades. No importa si buscas aventuras, magia o colores llamativos, nuestras piñatas se adaptan a cualquier temática. Con materiales de alta calidad y diseños creativos, garantizamos momentos de alegría, risas y sorpresas. ¡Convierte tu fiesta en un evento lleno de diversión y sonrisas!
        </Text>

        <Text
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            maxWidth: "980px",
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
            lineHeight: '1.6',
            letterSpacing: '-0.003em',
            margin: '0 0 4rem'
          }}
          theme={theme}
        >
          Haz que cada celebración sea inolvidable con nuestras piñatas llenas de color, diversión y sorpresas. Tenemos modelos para todos los gustos, edades y temáticas, asegurando que cada fiesta sea única y especial.
        </Text>
      </div>
    </>
  );
};

export default Home;
