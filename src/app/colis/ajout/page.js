"use client"
import { useState } from 'react';
import { db } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';


export default function AjouterColis() {
  const [colis, setColis] = useState({ adresse: '', poids: '', destination: '' });
  const [colisId, setColisId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setColis({ ...colis, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'colis'), {
        ...colis,
        status: 'en préparation',
      });
      setColisId(docRef.id); // Sauvegarde de l'ID du nouveau colis
      setColis({ adresse: '', poids: '', destination: '' }); // Réinitialisation du formulaire
    } catch (error) {
      console.error("Erreur lors de l'ajout du colis: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Ajouter un Colis</h1>
      {colisId && <p>ID du colis ajouté: {colisId}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champs du formulaire */}
        <div>
          <label htmlFor="adresse" className="block">Adresse</label>
          <input type="text" id="adresse" name="adresse" value={colis.adresse} onChange={handleChange} required className="input" />
        </div>
        <div>
          <label htmlFor="poids" className="block">Poids</label>
          <input type="text" id="poids" name="poids" value={colis.poids} onChange={handleChange} required className="input" />
        </div>
        <div>
          <label htmlFor="destination" className="block">Destination</label>
          <input type="text" id="destination" name="destination" value={colis.destination} onChange={handleChange} required className="input" />
        </div>
        <button type="submit" className="btn">Ajouter le colis</button>
      </form>
    </div>
  );
}