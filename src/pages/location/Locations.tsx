import React from "react";
import {useTheme} from "../../context/ThemeContext";
import {Text} from "../../components/Text/Text";
import {Banner} from "../../components/Banner/Banner";
import AddressCard from "../../components/AddressCard/AddressCard";
import "./locations.scss";

const LocationsPage: React.FC = () => {
  const {theme} = useTheme();
  const locations = [
    {
      title: "Elm Street Emporium",
      address: "7428 Elm St, Greenfield",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
    {
      title: "Oakwood Outfitters",
      address: "8392 Oakwood Dr, Riverdale",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
    {
      title: "Maple Market",
      address: "5162 Maple Ave, Pinehurst",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
    {
      title: "Cedar Creek Co.",
      address: "1034 Cedar Creek Rd, Brookside",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
    {
      title: "Elm Street Emporium",
      address: "7428 Elm St, Greenfield",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
    {
      title: "Oakwood Outfitters",
      address: "8392 Oakwood Dr, Riverdale",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
    {
      title: "Maple Market",
      address: "5162 Maple Ave, Pinehurst",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
    {
      title: "Cedar Creek Co.",
      address: "1034 Cedar Creek Rd, Brookside",
      phone: "(000) 000-0000",
      nameContact: "Person Name",
      mail: "example@gmail.com",
    },
  ];
  
  return (
    <div style={{ marginBottom: '4rem' }}>
      <Banner
        title="Locations"
        imgSrc='https://res.cloudinary.com/djqiqpilh/image/upload/v1752947980/location_r4awdw.jpg'
        imgAlt="imagen referente a seccion productos"
      />
      <div className="location-container-custom">
        <div className="text-container">
          <Text as="h2" className="address-title" theme={theme}>
            Locations
          </Text>
          <div className="card-container-address">
            {locations.map((loc, idx) => (
              <AddressCard
                key={idx}
                title={loc.title}
                address={loc.address}
                phone={loc.phone}
                nameContact={loc.nameContact}
                mail={loc.mail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
