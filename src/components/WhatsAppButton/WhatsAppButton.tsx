import React from 'react';
import { MessageCircle } from 'lucide-react';
import './whatsAppButton.scss';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'floating' | 'inline';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '+34 603 73 19 97',
  message = 'Hola! Me gustaría hacer una consulta sobre sus piñatas.',
  className = '',
  children,
  variant = 'inline'
}) => {
  const handleWhatsAppClick = () => {
    // Remove '+' and any spaces from phone number for WhatsApp URL
    const cleanPhoneNumber = phoneNumber.replace(/[\s+]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`whatsapp-btn whatsapp-btn--${variant} ${className}`}
      type="button"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={variant === 'floating' ? 24 : 20} />
      {children && <span className="whatsapp-btn__text">{children}</span>}
    </button>
  );
};

export default WhatsAppButton;