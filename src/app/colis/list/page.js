// pages/colis/index.js
"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/app/firebase'; // Assurez-vous que le chemin est correct
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Colis() {
    const [colis, setColis] = useState([]);

    // Charger les colis de Firestore
    const fetchColis = async () => {
        const colisCollection = collection(db, 'colis');
        const colisSnapshot = await getDocs(colisCollection);
        const colisList = colisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setColis(colisList);
    };

    useEffect(() => {
        fetchColis();
    }, []);

    // Supprimer un colis
    const supprimerColis = async (id) => {
        await deleteDoc(doc(db, 'colis', id));
        fetchColis(); // Recharger les colis après la suppression
    };

    return (
        <div className="container mx-auto p-4">
            
            <h1 className="text-2xl font-semibold mb-4">Liste des Colis</h1>
            <Link href={"/colis/ajout"} className="mr-2 p-2 mb-15 text-white bg-blue-500 hover:bg-blue-700 rounded">
                            Ajouter un colis
                </Link>
            <div>
                {colis.map((colis) => (
                    <div key={colis.id} className="mb-4 p-2 border rounded">
                        <p><strong>ID:</strong> {colis.id}</p>
                        <p><strong>Adresse:</strong> {colis.adresse}</p>
                        <p><strong>Poids:</strong> {colis.poids}</p>
                        <p><strong>Destination:</strong> {colis.destination}</p>
                        <Link href={`/colis/${colis.id}/`} className="mr-2 p-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
                            Mettre à jour
                </Link>

                        <button onClick={() => supprimerColis(colis.id)} className="p-2 text-white bg-red-500 hover:bg-red-700 rounded">Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
