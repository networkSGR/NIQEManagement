import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";


import Cookies from 'js-cookie'; // Import js-cookie

const KmlLayer = () => {
    const [kml, setKml]= React.useState(null);

  React.useEffect(() => {
    const token = Cookies.get('accessToken'); // Replace 'your_token_name' with the actual cookie name

    fetch(
        'http://localhost:3000/api/niqe/download/1729485615492-bb bangli-gianyar (1).kml',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      )
      .then((res) => res.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        setKml(kml);
      });
  }, []);

  return (
    <div>
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        zoom={17}
        center={[37.422, -122.084]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {kml && <ReactLeafletKml kml={kml} />}
      </MapContainer>
    </div>
  );
}

export default KmlLayer;
