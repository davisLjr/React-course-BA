import React from "react";
import {useTheme} from "../../context/ThemeContext";
import {Text} from "../Text/Text";
import "./productCard.scss";
import type {Product} from "../../services/productsService";

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const {theme} = useTheme();
  const classes = ["product-card", `product-card--${theme}`].join(" ");

  return (
    <div className={classes}>
      <img
        className="product-card__image"
        src={product.image}
        alt={product.title}
        loading="lazy"
        width={340}
        height={320}
      />
      <div className="product-card__body">
        <Text as="h3" className="product-card__title" theme={theme}>
          {product.title}
        </Text>
        <Text as="p" className="product-card__price" theme={theme}>
          ${product.price.toFixed(2)}
        </Text>
      </div>
    </div>
  );
};

export default ProductCard;
