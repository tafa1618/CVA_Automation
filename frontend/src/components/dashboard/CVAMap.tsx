"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockMachines } from '@/lib/mockData';

// Fix for default marker icons
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const CVAMapInner = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-full h-full bg-black/20 animate-pulse rounded-2xl" />;

    return (
        <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-border shadow-inner relative group">
            <MapContainer
                center={[12, -5]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {mockMachines.map((machine) => (
                    <Marker
                        key={machine.serial_number}
                        position={[machine.latitude, machine.longitude]}
                        icon={icon}
                    >
                        <Popup className="custom-popup">
                            <div className="p-1">
                                <p className="font-bold text-black text-sm">{machine.client}</p>
                                <p className="text-[10px] text-gray-500 font-mono">{machine.model} • {machine.serial_number}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="w-full h-1 bg-gray-200 rounded-full">
                                        <div
                                            className="h-full bg-neemba-yellow rounded-full"
                                            style={{ width: `${machine.fulfillment_score}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold">{machine.fulfillment_score}%</span>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Floating UI on map */}
            <div className="absolute top-4 right-4 z-[1000] bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-lg flex flex-col gap-1">
                <div className="flex items-center gap-2 px-2 py-1">
                    <div className="w-2 h-2 rounded-full bg-neemba-yellow shadow-[0_0_8px_rgba(255,205,0,0.5)]" />
                    <span className="text-[10px] text-white font-bold uppercase">Live Machines</span>
                </div>
            </div>
        </div>
    );
};

export default CVAMapInner;
