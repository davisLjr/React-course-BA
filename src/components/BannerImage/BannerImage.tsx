import React from "react";
import type {BannerImagePropsTypes} from "./types";
import "./bannerImage.scss";
import {useTheme} from "../../context/ThemeContext";

const BannerImage: React.FC<BannerImagePropsTypes> = ({
  title,
  description,
  src,
  alt,
  inverted = false,
}) => {
  const {theme} = useTheme();
  return (
    <>
      <section
        className={`banner-image ${inverted ? "banner-image--inverted" : ""}`}
      >
        <div className="banner-image__text">
          <h2 className="banner-image__title">{title}</h2>
          <p className="banner-image__description">{description}</p>
        </div>
        <div className="banner-image__media">
          <img src={src} alt={alt} className="banner-image__img" loading="lazy" width={800} height={500} />
        </div>
      </section>

      {theme === "light" ? (
        <div className="separator-light" />
      ) : (
        <div className="separator-dark" />
      )}
    </>
  );
};

export default BannerImage;
