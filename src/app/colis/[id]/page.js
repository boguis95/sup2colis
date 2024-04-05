"use client";
import Colis from '../list/page';
import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import { db } from '@/app/firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ModifierColis({params}) {
    const [colis, setColis] = useState({ adresse: '', poids: '', destination: '' });
    const router = useRouter();
    const id = params.id 

    useEffect(() => {
        const chargerColis = async () => {
            if (router.isReady && id) {
                const colisRef = doc(db, 'colis', id);
                const colisSnap = await getDoc(colisRef);
                if (colisSnap.exists()) {
                    setColis(colisSnap.data()); 
                } else {
                    console.log("Le colis n'existe pas !");
                }
            }
        };

        chargerColis();
    }, [router.isReady, id]); // Exécutez useEffect quand `id` est prêt

    const handleChange = (e) => {
        const { name, value } = e.target;
        setColis(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateDoc(doc(db, 'colis', id), colis);
            router.push('/colis/list'); // Assurez-vous que le chemin est correct
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Mettre à jour le colis</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>Adresse</label>
                    <input
                        type="text"
                        name="adresse"
                        value={colis.adresse}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label>Poids</label>
                    <input
                        type="text"
                        name="poids"
                        value={colis.poids}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label>Destination</label>
                    <input
                        type="text"
                        name="destination"
                        value={colis.destination}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="btn">Mettre à jour</button>
            </form>
        </div>
    );
}
