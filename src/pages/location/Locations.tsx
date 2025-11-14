import React from "react";
import {useTheme} from "../../context/ThemeContext";
import {Text} from "../../components/Text/Text";
import {Banner} from "../../components/Banner/Banner";
import "./locations.scss";

const LocationsPage: React.FC = () => {
  const {theme} = useTheme();
  
  return (
    <div style={{ marginBottom: '4rem' }}>
      <Banner
        title="Ubicación"
        imgSrc='https://res.cloudinary.com/dqqnxoj15/image/upload/v1757527164/pexels-suzyhazelwood-1124884_1_lffidt.jpg'
        imgAlt="imagen referente a seccion productos"
      />
      <div className="location-container-custom">
        <div className="text-container">
          <Text as="h2" className="address-title" theme={theme} style={{ margin: 0 }}>
            Ubicación
          </Text>
          <Text as='p' style={{ margin: 0 }}>
          En Magia en Papel, nuestras piñatas se elaboran cuidadosamente en Madrid "Ciudad Lineal", garantizando calidad y detalle en cada diseño. Para poder preparar tu pedido de manera óptima, te recomendamos realizarlo con al menos 5 días de anticipación. Esto nos permite asegurarnos de que cada piñata personalizada o pre-armada esté lista a tiempo para tu celebración.
          </Text>
          <Text as='p' style={{ margin: 0 }}>
          Ofrecemos varias opciones de entrega para tu comodidad. Puedes coordinar el retiro directamente en nuestra ubicación en Madrid o acordar un punto de entrega intermedio que sea conveniente tanto para ti como para nosotros. En algunos casos especiales, también podemos organizar el envío a través de un transporte específico que el cliente prefiera, garantizando que tu pedido llegue de manera segura y puntual.
          </Text>
          <Text as='p' style={{ margin: 0 }}>
          Además, sabemos que la movilidad en Madrid es importante, por lo que también ofrecemos la posibilidad de entregar cerca de estaciones de metro para mayor facilidad. Nuestro objetivo es que recibir tu piñata sea tan sencillo y cómodo como disfrutarla en tu fiesta. Cada entrega está pensada para adaptarse a tus necesidades y asegurar que tu celebración sea perfecta.
</Text>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
