import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const FlyToLocation = ({ coord }) => {
    const map = useMap();

    if (coord) {
        map.flyTo(coord, 14);
    }
    return null;
};

const Coverage = () => {
    const axiosSecure = useAxiosSecure();
    const position = [23.6850, 90.3563];
    const [searchCoord, setSearchCoord] = useState(null);

    const { data: serviceCenters = [], isLoading } = useQuery({
        queryKey: ['coverage'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coverage');
            return res.data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;

        const district = serviceCenters.find(c =>
            c.district.toLowerCase().includes(location.toLowerCase())
        );

        if (district) {
            setSearchCoord([district.latitude, district.longitude]);
        }
    };

    if (isLoading) {
        return <div className="text-center py-20 text-xl">Loading map...</div>;
    }

    return (
        <div>
            <h2 className='text-5xl font-bold text-secondary my-20'>
                We are available in 64 districts
            </h2>

            {/* Search */}
            <form onSubmit={handleSearch}>
                <div className="flex items-center w-full max-w-xl bg-gray-100 rounded-full shadow px-4 py-2 gap-3">
                    <input
                        type="search"
                        placeholder="Search district"
                        name='location'
                        className="input input-ghost w-full px-0 focus:outline-none text-sm"
                    />
                    <button className="btn rounded-full px-6 bg-primary border-none text-secondary">
                        Search
                    </button>
                </div>
            </form>

            <div className="border-t border-dashed border-secondary w-full my-20"></div>

            <h2 className='text-3xl font-bold text-primary mb-8'>
                We deliver almost all over Bangladesh
            </h2>

            {/* Map */}
            <div className='border border-secondary w-full h-[800px]'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px]'
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {searchCoord && <FlyToLocation coord={searchCoord} />}

                    {serviceCenters.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}
                        >
                            <Popup>
                                <strong>{center.district}</strong>
                                <br />
                                Service Area: {center.covered_area?.join(', ')}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
