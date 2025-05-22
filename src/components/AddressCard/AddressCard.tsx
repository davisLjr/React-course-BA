import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Text } from "../Text/Text";
import type { AddressCardPropTypes } from "./types";
import "./addressCard.scss";

const AddressCard: React.FC<AddressCardPropTypes> = ({
  title,
  address,
  phone,
  nameContact,
  mail
}) => {
  const { theme } = useTheme();
  const containerClass = `location-component location-component--${theme}`;

  return (
    <div className={containerClass}>
      <div className="address-text">
        <Text as="h3" className="address-title" theme={theme}>
          {title}
        </Text>
        <Text as="p" className="simple-address" theme={theme}>
          {address}
        </Text>
        <Text as="p" className="simple-address" theme={theme}>
          {phone}
        </Text>
        <Text as="p" className="simple-address" theme={theme}>
          {nameContact}
        </Text>
        <Text as="p" className="simple-address" theme={theme}>
          {mail}
        </Text>
      </div>
    </div>
  );
};

export default AddressCard;
