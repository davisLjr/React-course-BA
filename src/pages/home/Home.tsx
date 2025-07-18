import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Hero } from "../../components/Hero/Hero";
import { Text } from "../../components/Text/Text";
import useMedia from "use-media";
import Button from "../../components/Button/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./home.scss";
import BannerImage from "../../components/BannerImage/BannerImage";
import { AnimatePresence, motion } from "framer-motion";
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

  const bannerData = [
    {
      title: "Joyerias",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum dolor consequuntur labore error quaerat nisi, eum suscipit tempora, eius rem quos reprehenderit repellendus doloremque sed. Eum provident atque eius voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      src: banner1,
      alt: "Seating system Moto",
    },
    {
      title: "Colección Mujer",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum dolor consequuntur labore error quaerat nisi, eum suscipit tempora, eius rem quos reprehenderit repellendus doloremque sed. Eum provident atque eius voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      src: banner2,
      alt: "Garden Lounge outdoor",
      inverted: true,
    },
    {
      title: "Colección Hombre",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum dolor consequuntur labore error quaerat nisi, eum suscipit tempora, eius rem quos reprehenderit repellendus doloremque sed. Eum provident atque eius voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      src: banner3,
      alt: "Seating system Moto",
    },
    {
      title: "Coleccion Informatica",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum dolor consequuntur labore error quaerat nisi, eum suscipit tempora, eius rem quos reprehenderit repellendus doloremque sed. Eum provident atque eius voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      src: banner4,
      alt: "Garden Lounge outdoor",
      inverted: true,
    },
  ];

  const { theme } = useTheme();
  const isMobile = useMedia({ maxWidth: "1017px" });
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
    carouselRef.current?.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  const scrollOneView = () => {
    window.scrollBy({ top: window.innerHeight * 0.95, behavior: "smooth" });
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
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
          >
            <Text as="h1" className="hero-splash__text">E-COMMERCE EXPERIENCE</Text>
          </motion.div>
        )}
      </AnimatePresence>
      <Hero
        titlePrimary={
          <Text as="h1" style={{ fontSize: isMobile ? "2.5rem" : "4rem" }} themeInverted>
            E-COMMERCE EXPERIENCE
          </Text>
        }
        titleSecondary={
          <Text as="h2" align="center" style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 200 }} themeInverted>
            CURSO 2025
          </Text>
        }
        buttonText="Explorar Productos"
        onButtonClick={scrollOneView}
        poster="/bg5-poster.jpg"
        videoSources={[{ src: "/bg5.webm", type: "video/webm" }, { src: "/bg5.mp4", type: "video/mp4" }]}
        style={{ marginTop: "-54px" }}
        onVideoReady={handleVideoReady}
      />

      <div className="custom-container">
        <Text
          as="p"
          theme={theme}
          style={{ fontSize: "1.45rem", fontWeight: 300, maxWidth: "1100px", fontFamily: '"Libre Franklin", sans-serif' }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum dolor consequuntur labore error quaerat nisi, eum suscipit tempora, eius rem quos reprehenderit repellendus doloremque sed. Eum provident atque eius voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam veniam sint perspiciatis repellat dolor id obcaecati voluptate fugiat quam cupiditate perferendis similique, inventore consectetur architecto reprehenderit! Dignissimos laboriosam esse similique.
        </Text>

        {bannerData.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <BannerImage {...b} />
          </motion.div>
        ))}
      </div>

      <Hero
        titlePrimary={
          <Text as="h1" style={{ fontSize: isMobile ? "2.5rem" : "4rem" }} themeInverted>
            SUMMER IS LEAVING
          </Text>
        }
        titleSecondary={
          <Text as="h2" align="center" style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 200 }} themeInverted>
            IN 2025
          </Text>
        }
        buttonText="Explorar Categorias"
        linkTo="/categories"
        poster="/bg3-poster.jpg"
        videoSources={[{ src: "/bg3.webm", type: "video/webm" }, { src: "/bg3.mp4", type: "video/mp4" }]}
        style={{ marginTop: "100px", width: "100%" }}
      />

      <div className="custom-container">
        <Text as="h2" style={{ fontWeight: 300, marginBottom: "-8rem" }} theme={theme}>
          Colecciones Pasadas
        </Text>

        <div style={{ position: "relative" }} aria-label="Carrusel de colecciones pasadas" role="region">
          <div
            style={{ position: "absolute", top: 0, right: 0, display: "flex", gap: "0.5rem", zIndex: 10 }}
          >
            <Button
              theme={theme}
              color="base"
              onClick={scrollLeft}
              icon={<ArrowLeft size={20} />}
              disabled={!canScrollLeft}
              name="scroll left"
              aria-label="Desplazar a la izquierda"
            />
            <Button
              theme={theme}
              color="base"
              onClick={scrollRight}
              icon={<ArrowRight size={20} />}
              disabled={!canScrollRight}
              name="scroll right"
              aria-label="Desplazar a la derecha"
            />
          </div>

          <motion.div
            ref={carouselRef}
            className="hide-scrollbar"
            style={{ display: "flex", gap: "1rem", overflowX: "auto", scrollBehavior: "smooth", padding: "1rem 0", marginTop: "3rem" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {imageSourcesSlider.map((src, i) => (
              <div
                key={i}
                style={{
                  flex: "1 1 calc(25% - 1rem)",
                  minWidth: "380px",
                  display: "flex",
                  flexDirection: "column",
                  border: `5px solid ${theme === "light" ? "#f0ebe3" : "#212529"}`,
                }}
              >
                <img
                  src={src}
                  alt={`Colección ${i + 1}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  loading="lazy"
                  width={370}
                  height={550}
                />
                <Text as="p" theme={theme}>Título de colección</Text>
              </div>
            ))}
          </motion.div>
        </div>

        <Text
          as="p"
          theme={theme}
          style={{ fontSize: "1.45rem", fontWeight: 300, maxWidth: "1100px", marginBottom: "1rem" }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque iste velit quidem rerum consequatur quo unde veniam omnis, perspiciatis harum in, soluta ducimus fuga molestiae blanditiis cum tenetur animi! Quasi incidunt itaque harum fugit ducimus. In cum esse laborum et ipsum enim dignissimos beatae labore porro. Dicta asperiores obcaecati temporibus porro!
        </Text>

        <Text
          as="p"
          theme={theme}
          style={{ fontSize: "1.45rem", fontWeight: 300, maxWidth: "1100px", marginBottom: "1rem" }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi incidunt itaque harum fugit ducimus. In cum esse laborum et ipsum enim dignissimos beatae labore porro. Dicta asperiores obcaecati temporibus porro!
        </Text>

        <Text
          as="p"
          theme={theme}
          style={{ fontSize: "1.45rem", fontWeight: 300, maxWidth: "1100px", marginBottom: "1rem" }}
        >
          Lorem ipsum dolor sit amet consectetur, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta eaque at facilis hic id facere maiores repellendus, sint error quis repudiandae eligendi voluptates architecto rem eos delectus dolorum veritatis harum? adipisicing elit. Quasi incidunt itaque harum fugit ducimus. In cum esse laborum et ipsum enim dignissimos beatae labore porro. Dicta asperiores obcaecati temporibus porro!
        </Text>
      </div>
    </>
  );
};

export default Home;
