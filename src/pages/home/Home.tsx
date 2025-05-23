import React, {useEffect, useRef, useState} from "react";
import {useTheme} from "../../context/ThemeContext";
import {Hero} from "../../components/Hero/Hero";
import {Text} from "../../components/Text/Text";
import useMedia from "use-media";
import Button from "../../components/Button/Button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import "./home.scss";
import BannerImage from "../../components/BannerImage/BannerImage";
import {AnimatePresence, motion} from "framer-motion";
import banner1 from "/banner/banner-1.webp";
import banner2 from "/banner/banner-2.webp";
import banner3 from "/banner/banner-3.webp";
import banner4 from "/banner/banner-4.webp";

const Home: React.FC = () => {
  const imageSourcesSlider = [
    "/oldCollection/tinified/jewel-two.webp",
    "/oldCollection/tinified/jewel-three.webp",
    "/oldCollection/tinified/clothe.webp",
    "/oldCollection/tinified/clothe-two.webp",
    "/oldCollection/tinified/clothe-three.webp",
    "/oldCollection/tinified/clothe-four.webp",
    "/oldCollection/tinified/clothe-five.webp",
  ];
  const {theme} = useTheme();
  const isMobile = useMedia({maxWidth: "1017px"});

  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollByAmount = isMobile ? window.innerWidth * 0.8 : 300;

  const updateScrollButtons = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({left: -scrollByAmount, behavior: "smooth"});
  };
  const scrollRight = () => {
    carouselRef.current?.scrollBy({left: scrollByAmount, behavior: "smooth"});
  };

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
              E-COMMERCE EXPERIENCE
            </Text>
          </motion.div>
        )}
      </AnimatePresence>
      <Hero
        titlePrimary={
          <Text
            as="h1"
            style={{fontSize: isMobile ? "2.5rem" : "4rem"}}
            themeInverted
          >
            E-COMMERCE EXPERIENCE
          </Text>
        }
        titleSecondary={
          <Text
            as="h2"
            align="center"
            style={{
              fontSize: isMobile ? "2rem" : "2.5rem",
              fontWeight: 200,
            }}
            themeInverted
          >
            CURSO 2025
          </Text>
        }
        buttonText="Explorar Productos"
        onButtonClick={scrollOneView}
        poster="/bg5-poster.jpg"
        videoSources={[
          {src: "/bg5.webm", type: "video/webm"},
          {src: "/bg5.mp4", type: "video/mp4"},
        ]}
        style={{marginTop: "-54px"}}
        onVideoReady={handleVideoReady}
      />

      <div className="custom-container">
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

        <BannerImage
          title="Joyerias"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          src={banner1}
          alt="Seating system Moto"
        />

        <BannerImage
          title="Colección Mujer"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          src={banner2}
          alt="Garden Lounge outdoor"
          inverted
        />

        <BannerImage
          title="Colección Hombre"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          src={banner3}
          alt="Seating system Moto"
        />

        <BannerImage
          title="Coleccion Informatica"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          src={banner4}
          alt="Garden Lounge outdoor"
          inverted
        />
      </div>

      <Hero
        titlePrimary={
          <Text
            as="h1"
            style={{fontSize: isMobile ? "2.5rem" : "4rem"}}
            themeInverted
          >
            SUMMER IS LEAVING
          </Text>
        }
        titleSecondary={
          <Text
            as="h2"
            align="center"
            style={{
              fontSize: isMobile ? "2rem" : "2.5rem",
              fontWeight: 200,
            }}
            themeInverted
          >
            IN 2025
          </Text>
        }
        buttonText="Explorar Categorias"
        linkTo="/categories"
        poster="/bg3-poster.jpg"
        videoSources={[
          {src: "/bg3.webm", type: "video/webm"},
          {src: "/bg3.mp4", type: "video/mp4"},
        ]}
        style={{marginTop: "100px", width: "100%"}}
      />

      <div className="custom-container">
        <Text
          as="h2"
          style={{fontWeight: 300, marginBottom: "-8rem"}}
          theme={theme}
        >
          Colecciones Pasadas
        </Text>

        <div style={{position: "relative"}}>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              gap: "0.5rem",
              zIndex: 10,
            }}
          >
            <Button
              theme={theme}
              color="base"
              onClick={scrollLeft}
              icon={<ArrowLeft size={20} />}
              disabled={!canScrollLeft}
              name="scroll left"
            />
            <Button
              theme={theme}
              color="base"
              onClick={scrollRight}
              icon={<ArrowRight size={20} />}
              disabled={!canScrollRight}
              name="scroll right"
            />
          </div>

          <div
            ref={carouselRef}
            className="hide-scrollbar"
            style={{
              display: "flex",
              gap: "1rem",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "1rem 0",
              marginTop: "3rem",
            }}
          >
            {imageSourcesSlider.map((src, i) => (
              <div
                key={i}
                style={{
                  flex: "1 1 calc(25% - 1rem)",
                  minWidth: "380px",
                  display: "flex",
                  flexDirection: "column",
                  border: `5px solid ${theme === "light" ? "#fff" : "#212529"}`,
                }}
              >
                <img
                  src={src}
                  alt={`Colección ${i + 1}`}
                  style={{width: "100%", height: "auto", display: "block"}}
                  loading="lazy"
                  width={370}
                  height={550}
                />
                <Text as="p" theme={theme}>
                  Título de colección
                </Text>
              </div>
            ))}
          </div>
        </div>

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
          and typesetting industry. Lorem Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s…
        </Text>

        <Text
          style={{
            fontSize: "1.45rem",
            fontWeight: 300,
            maxWidth: "1100px",
            fontFamily: '"Libre Franklin", sans-serif',
            marginBottom: "4rem",
          }}
          theme={theme}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </Text>
      </div>
    </>
  );
};

export default Home;
