import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FlyToLocation = ({ coord }) => {
  const map = useMap();
  if (coord) map.flyTo(coord, 14, { duration: 2 });
  return null;
};

const Coverage = () => {
  const axiosSecure = useAxiosSecure();
  const defaultPosition = [23.6850, 90.3563]; // Center of Bangladesh
  const [searchCoord, setSearchCoord] = useState(null);

  const { data: serviceCenters = [], isLoading } = useQuery({
    queryKey: ['coverage'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coverage');
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    const district = serviceCenters.find(c =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) setSearchCoord([district.latitude, district.longitude]);
  };

  if (isLoading) {
    return <div className="text-center py-20 text-xl text-primary">Loading map...</div>;
  }

  return (
    <div className="px-6 md:px-20 py-20 bg-gradient-to-b from-primary/10 via-base-100 to-secondary/10 min-h-screen">
      
      {/* Hero Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-secondary mb-10">
        We are available in 64 districts
      </h2>

      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-16"
      >
        <div className="flex items-center w-full max-w-xl bg-base-100 rounded-full shadow-md px-4 py-2 gap-3 border border-primary">
          <input
            type="search"
            placeholder="Search district"
            name="location"
            className="input input-ghost w-full px-0 focus:outline-none text-sm"
          />
          <button
            className="btn rounded-full px-6 bg-primary border-none text-secondary hover:bg-primary-focus"
          >
            Search
          </button>
        </div>
      </form>

      <div className="border-t border-dashed border-secondary my-16"></div>

      <h3 className="text-3xl font-bold text-center text-primary mb-8">
        We deliver almost all over Bangladesh
      </h3>

      {/* Map */}
      <div className="border-2 border-secondary rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={defaultPosition}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[700px] w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {searchCoord && <FlyToLocation coord={searchCoord} />}

          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong className="text-primary">{center.district}</strong>
                <br />
                Service Area: {center.covered_area?.join(', ') || 'N/A'}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
