'use client';
import { useState } from 'react';
import { useStorage } from './utils/useStorage';

const StorageApp = () => {
  const [inputValue, setInputValue] = useState('');
  const { 
    store, 
    isStoring, 
    isStoreSuccess, 
    storedValue, 
    isRetrieving, 
    isRetrieveSuccess 
  } = useStorage();

  const handleStore = async () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num)) {
      alert('Veuillez entrer un nombre valide.');
      return;
    }
    try {
      await store(num);
    } catch (error) {
      console.error('Erreur lors du stockage', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interaction avec le Smart Contract</h1>
      
      <div className="mb-4">
        <label htmlFor="storeInput" className="block mb-2">
          Stocker une valeur :
        </label>
        <input
          id="storeInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 mr-2 rounded to-black"
        />
        <button 
          onClick={handleStore} 
          disabled={isStoring}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isStoring ? 'En cours...' : 'Stocker'}
        </button>
        {isStoreSuccess && (
          <p className="text-green-500 mt-2">Valeur stockée avec succès !</p>
        )}
      </div>

      <div>
        {isRetrieving ? (
          <p>Récupération en cours...</p>
        ) : (
          isRetrieveSuccess && storedValue && (
            <p>Valeur stockée actuelle : {storedValue.toString()}</p>
          )
        )}
      </div>
    </div>
  );
};

export default StorageApp;