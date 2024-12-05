import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockContacts } from '../data/mockContacts';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock coordinates for demonstration
const contactCoordinates: Record<string, [number, number]> = {
  'New York, USA': [40.7128, -74.0060],
  'San Francisco, USA': [37.7749, -122.4194],
  'Berlin, Germany': [52.5200, 13.4050],
  'Tokyo, Japan': [35.6762, 139.6503],
  'Barcelona, Spain': [41.3851, 2.1734],
};

export function ContactMap() {
  const center: [number, number] = [20, 0];
  const zoom = 2;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Contact Locations</h3>
      <div className="h-[500px] rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {mockContacts.map((contact) => {
            const coordinates = contactCoordinates[contact.location];
            if (!coordinates) return null;

            return (
              <Marker key={contact.email} position={coordinates}>
                <Popup>
                  <div className="p-2">
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-gray-600">{contact.location}</div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}