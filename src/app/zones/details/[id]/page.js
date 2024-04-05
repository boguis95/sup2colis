// pages/zones/[id].js
"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { doc, getDoc, deleteDoc} from 'firebase/firestore';
import { db } from '@/app/firebase';


export default function ZoneDetails({params}) {
    const [zone, setZone] = useState(null);
    const [colis, setColis] = useState([]);
    const router = useRouter();
    const id = params.id

    const fetchZoneDetails = async () => {
        if (!id) return;

        const zoneRef = doc(db, 'zones', id);
        const zoneSnap = await getDoc(zoneRef);

        if (zoneSnap.exists()) {
            setZone(zoneSnap.data());
            const promises = zoneSnap.data().colis.map(colisId => getDoc(doc(db, 'colis', colisId)));
            const colisDocs = await Promise.all(promises);
            const colisDetails = colisDocs.map(doc => ({ id: doc.id, ...doc.data() }));
            setColis(colisDetails);
        }
    };
    
    useEffect(() => {
        

        fetchZoneDetails();
    }, [id]);

    const supprimerColis = async (id) => {
        await deleteDoc(doc(db, 'colis', id));
        fetchZoneDetails();
    };


    return (
<div className="container mx-auto p-4">
<Link href={"/colis/ajout"} className="mr-2 p-2 mb-15 text-white bg-blue-500 hover:bg-blue-700 rounded">
                            Ajouter un colis
                </Link>
    <h1 className="text-2xl font-bold mt-10 mb-4">Colis dans la zone: {zone?.nom}</h1>
    <div>
        {colis.map(colis => (
            <div key={colis.id} className="mb-4 p-4 border rounded shadow-lg">
                <p><strong>ID:</strong> {colis.id}</p>
                <p><strong>Adresse:</strong> {colis.adresse}</p>
                <p><strong>Poids:</strong> {colis.poids}</p>
                <p><strong>Destination:</strong> {colis.destination}</p>
                <div className="flex items-center justify-start space-x-2 mt-4">
                    <Link href={`/colis/${colis.id}`}>
                            Mettre à jour
                
                    </Link>
                    <button onClick={() => supprimerColis(colis.id)} className="inline-flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200 ease-in-out">
                        Supprimer
                    </button>
                </div>
            </div>
        ))}
    </div>
</div>

    );
}
