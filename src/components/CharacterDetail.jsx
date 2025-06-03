import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Karakter verisi alınamadı', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (!character) {
    return <div className="loading">Karakter bulunamadı.</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img src={character.image} alt={character.name} className="detail-image" />
        <h2>{character.name}</h2>
        <p><strong>Durum:</strong> {character.status}</p>
        <p><strong>Cinsiyet:</strong> {character.gender}</p>
        <p><strong>Tür:</strong> {character.species}</p>
        <p><strong>Konum:</strong> {character.location?.name || 'Bilinmiyor'}</p>

        <button className="back-button" onClick={() => navigate('/')}>
          Geri Dön
        </button>
      </div>
    </div>
  );
}

export default CharacterDetail;
