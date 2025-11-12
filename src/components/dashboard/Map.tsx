'use client'
import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Pin } from 'lucide-react';

// It's recommended to move this to an environment variable
const MAPTILER_API_KEY = '1pQFj1hxt4HqUv6OOFx3'; // TODO: Replace with your MapTiler API key

const MapView = () => {
  const [showPopup, setShowPopup] = useState(true);

  const mapStyle = `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`;

  return (
    <Map
      initialViewState={{
        longitude: 3.263,
        latitude: 34.67279,
        zoom: 13,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={mapStyle}
    >
      <Marker longitude={3.263} latitude={34.67279}>
        <div onClick={() => setShowPopup(true)} style={{ cursor: 'pointer' }}>
            <Pin className="text-blue-500 w-8 h-8" />
        </div>
      </Marker>
      {showPopup && (
        <Popup
          longitude={3.263}
          latitude={34.67279}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          Djelfa, Algeria
        </Popup>
      )}
    </Map>
  );
};

export default MapView;
