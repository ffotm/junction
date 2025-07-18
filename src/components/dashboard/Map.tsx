'use client'
import React, { useState } from 'react';
import Map, { Marker, Popup, ViewStateChangeEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Pin } from 'lucide-react';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9yZGFuLWZpcyIsImEiOiJjbWJmaW1rZHAyODZrMmxzYnNhOXltMjZxIn0.FT7CLX_l4Fl4O-Z98UFJYQ';

const MapView = () => {
  const [viewport, setViewport] = useState({
    longitude: 3.263,
    latitude: 34.67279,
    zoom: 13,
  });
  const [showPopup, setShowPopup] = useState(true);

  return (
    <Map
      {...viewport}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={evt => setViewport(evt.viewState)}
    >
      <Marker longitude={3.263} latitude={34.67279} onClick={() => setShowPopup(true)}>
        <Pin className="text-blue-500 w-8 h-8" />
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
