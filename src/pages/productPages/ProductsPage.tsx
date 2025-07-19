import React from "react";
import ProductList from "../../components/ProductList/ProductList";
import {Banner} from "../../components/Banner/Banner";
import {Text} from "../../components/Text/Text";
import {useTheme} from "../../context/ThemeContext";
import "./productPage.scss";

const ProductsPage: React.FC = () => {
  const {theme} = useTheme();
  return (
    <div style={{ marginBottom: '4rem' }}>
      <Banner
        title="Productos"
        imgSrc='https://res.cloudinary.com/djqiqpilh/image/upload/v1752947981/producto_onwzka.jpg'
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
