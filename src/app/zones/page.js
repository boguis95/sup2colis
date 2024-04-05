// pages/index.js
"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ZoneDetails from './details/[id]/page';


export default function Home() {
    const [zones, setZones] = useState([]);

    useEffect(() => {
        const fetchZones = async () => {
            const querySnapshot = await getDocs(collection(db, 'zones'));
            setZones(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchZones();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Zones de Stockage</h1>
            {zones.map(zone => (
                <div key={zone.id} className="mb-4 p-4 border rounded">
                    <h2 className="text-xl font-semibold">{zone.name}</h2>
                    <Link href={`/zones/details/${zone.id}`} className="text-blue-500 hover:underline">
                     Voir les colis
                    </Link>
                </div>
            ))}
        </div>
    );
}
