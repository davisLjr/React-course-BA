import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Banner } from "../../components/Banner/Banner";
import { Text } from "../../components/Text/Text";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";
import { MessageCircle, Phone, Mail, Clock, MapPin } from "lucide-react";
import "./contactanos.scss";

const ContactanosPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`contactanos-page contactanos-page--${theme}`}>
      <Banner
        title="Contáctanos"
        imgSrc="https://res.cloudinary.com/dqqnxoj15/image/upload/v1757533632/pexels-padli-772478_ibzxxl.jpg"
        imgAlt="Sección de contacto"
      />

      <div className="contactanos-page__container">
        {/* Hero Section */}
        <section className="contactanos-page__hero">
          <Text
            as="h1"
            className="contactanos-page__title"
            theme={theme}
          >
            ¡Estamos aquí para ayudarte!
          </Text>
          <Text
            className="contactanos-page__subtitle"
            theme={theme}
          >
            En Magia en Papel queremos hacer de tu celebración algo único y especial. 
            Contáctanos para cualquier consulta, pedido personalizado o información sobre nuestras piñatas.
          </Text>
        </section>

        {/* Contact Methods */}
        <section className="contactanos-page__methods">
          <div className="contact-card">
            <div className="contact-card__icon">
              <MessageCircle size={32} />
            </div>
            <Text as="h3" className="contact-card__title" theme={theme}>
              WhatsApp
            </Text>
            <Text className="contact-card__description" theme={theme}>
              La forma más rápida de contactarnos. Te respondemos al instante.
            </Text>
            <WhatsAppButton className="contact-card__button">
              Escribenos ahora
            </WhatsAppButton>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <Phone size={32} />
            </div>
            <Text as="h3" className="contact-card__title" theme={theme}>
              Teléfono
            </Text>
            <Text className="contact-card__description" theme={theme}>
              Llámanos para consultas inmediatas
            </Text>
            <Text className="contact-card__info" theme={theme}>
              +34 603 73 19 97
            </Text>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <Mail size={32} />
            </div>
            <Text as="h3" className="contact-card__title" theme={theme}>
              Email
            </Text>
            <Text className="contact-card__description" theme={theme}>
              Para consultas detalladas y presupuestos
            </Text>
            <Text className="contact-card__info" theme={theme}>
              info@magiaenpapel.com
            </Text>
          </div>
        </section>

        {/* Information Section */}
        <section className="contactanos-page__info">
          <div className="info-grid">
            <div className="info-item">
              <Clock className="info-item__icon" size={24} />
              <div>
                <Text as="h4" className="info-item__title" theme={theme}>
                  Horarios de Atención
                </Text>
                <Text className="info-item__text" theme={theme}>
                  Lunes a Viernes: 9:00 - 18:00
                </Text>
                <Text className="info-item__text" theme={theme}>
                  Sábados: 10:00 - 14:00
                </Text>
              </div>
            </div>

            <div className="info-item">
              <MapPin className="info-item__icon" size={24} />
              <div>
                <Text as="h4" className="info-item__title" theme={theme}>
                  Ubicación
                </Text>
                <Text className="info-item__text" theme={theme}>
                  Hacemos entregas en toda España
                </Text>
                <Text className="info-item__text" theme={theme}>
                  Consulta disponibilidad en tu zona
                </Text>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="contactanos-page__faq">
          <Text as="h2" className="section-title" theme={theme}>
            Preguntas Frecuentes
          </Text>
          
          <div className="faq-grid">
            <div className="faq-item">
              <Text as="h4" className="faq-item__question" theme={theme}>
                ¿Cómo puedo hacer un pedido?
              </Text>
              <Text className="faq-item__answer" theme={theme}>
                Puedes hacer tu pedido a través de WhatsApp, enviándonos los detalles de la piñata que deseas. 
                También puedes agregar productos al carrito y enviarnos el resumen por WhatsApp.
              </Text>
            </div>

            <div className="faq-item">
              <Text as="h4" className="faq-item__question" theme={theme}>
                ¿Hacen piñatas personalizadas?
              </Text>
              <Text className="faq-item__answer" theme={theme}>
                ¡Sí! Nos especializamos en piñatas personalizadas. Contáctanos con tu idea y 
                crearemos la piñata perfecta para tu celebración.
              </Text>
            </div>

            <div className="faq-item">
              <Text as="h4" className="faq-item__question" theme={theme}>
                ¿Cuál es el tiempo de entrega?
              </Text>
              <Text className="faq-item__answer" theme={theme}>
                El tiempo de entrega varía según el producto. Las piñatas estándar tardan 2-3 días, 
                mientras que las personalizadas pueden tardar 5-7 días.
              </Text>
            </div>

            <div className="faq-item">
              <Text as="h4" className="faq-item__question" theme={theme}>
                ¿Qué métodos de pago aceptan?
              </Text>
              <Text className="faq-item__answer" theme={theme}>
                Aceptamos transferencia bancaria, Bizum y pago contra reembolso. 
                Los detalles se confirman al hacer el pedido.
              </Text>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="contactanos-page__cta">
          <div className="cta-card">
            <Text as="h3" className="cta-card__title" theme={theme}>
              ¿Listo para hacer tu pedido?
            </Text>
            <Text className="cta-card__text" theme={theme}>
              Contáctanos ahora y hagamos realidad la piñata de tus sueños
            </Text>
            <WhatsAppButton 
              message="Hola! Me gustaría hacer un pedido personalizado para mi celebración."
              className="cta-card__button"
            >
              Hacer Pedido por WhatsApp
            </WhatsAppButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactanosPage;