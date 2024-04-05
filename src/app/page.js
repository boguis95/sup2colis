"use client"
import { useState } from 'react';
import { db } from './firebase'; // Assurez-vous que le chemin d'importation est correct
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';


export default function Home() {
  const [trackingId, setTrackingId] = useState('');
  const [parcelData, setParcelData] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser le message d'erreur
    setParcelData(null); // Réinitialiser les données du colis

    if (!trackingId) {
      setError("Veuillez entrer un ID de suivi.");
      return;
    }

    try {
      const docRef = doc(db, 'colis', trackingId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError('Colis non trouvé');
      } else {
        setParcelData(docSnap.data());
      }
    } catch (error) {
      setError('Erreur lors de la recherche du colis');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link href={"/zones"} className="mr-2 p-2 mb-15 text-white bg-blue-500 hover:bg-blue-700 rounded">
                            Gestion des stocks
                </Link>
      <h1 className="text-xl font-bold mt-10 mb-4">Sup2Colis - Suivi de Colis</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleTrack} className="space-y-4">
        <div>
          <label htmlFor="trackingId" className="block mb-2 text-sm font-medium text-gray-900">ID de suivi</label>
          <input
            type="text"
            id="trackingId"
            name="trackingId"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Entrez l'ID de suivi"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Suivre le colis</button>
      </form>
      {parcelData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Informations du colis :</h2>
          <p>Adresse: {parcelData.adresse}</p>
          <p>Poids: {parcelData.poids}kg</p>
          <p>Destination: {parcelData.destination}</p>
          <p>Status: {parcelData.status}</p>
                  </div>
      )}
    </div>
  );
}

