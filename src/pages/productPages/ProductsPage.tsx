import React from "react";
import ProductList from "../../components/ProductList/ProductList";
import {Banner} from "../../components/Banner/Banner";
import {Text} from "../../components/Text/Text";
import {useTheme} from "../../context/ThemeContext";
import "./productPage.scss";

const ProductsPage: React.FC = () => {
  const {theme} = useTheme();
  return (
    <div style={{marginBottom: "4rem"}}>
      <Banner
        title="Productos"
        imgSrc="https://res.cloudinary.com/dqqnxoj15/image/upload/v1757526948/pexels-nietjuhart-25956371_1_eehqfo.jpg"
        imgAlt="imagen referente a seccion productos"
      />

      <div className="product-container-custom">
        <div className="text-container">
          <Text
            style={{
              fontSize: "1.45rem",
              fontWeight: 300,
              maxWidth: "1100px",
              fontFamily: '"Libre Franklin", sans-serif',
              margin: 0
            }}
            theme={theme}
          >
            Bienvenido a la sección de productos de Magia en Papel, el lugar
            donde la diversión y la creatividad se transforman en piñatas
            únicas. Aquí encontrarás una gran variedad de piñatas listas para
            darle vida a tu celebración. Contamos con diseños exclusivos para
            chicas, llenos de colores suaves, unicornios y princesas mágicas.
            Para los chicos, tenemos héroes, aventuras y personajes que
            convierten cada cumpleaños en pura emoción. También ofrecemos
            opciones unisex, ideales para fiestas compartidas y temáticas
            neutrales.
          </Text>
        </div>
        <div className="product-list-container">
          <Text as="h2" className="title-products-area" theme={theme}>
            Productos
          </Text>
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
