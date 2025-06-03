import './CharacterDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(res.data);
      } catch (error) {
        console.error("Karakter verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <p className="loading">Yükleniyor...</p>;
  }

  if (!character) {
    return <p className="loading">Karakter bulunamadı.</p>;
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img
          src={character.image}
          alt={character.name}
          className="detail-image"
        />
        <h2>{character.name}</h2>
        <p><strong>Durum:</strong> {character.status}</p>
        <p><strong>Cinsiyet:</strong> {character.gender}</p>
        <p><strong>Tür:</strong> {character.species}</p>
        <p><strong>Menşei:</strong> {character.origin.name}</p>
        <p><strong>Lokasyon:</strong> {character.location.name}</p>
        <Link to="/">
          <button className="back-button">← Geri Dön</button>
        </Link>
      </div>
    </div>
  );
}

export default CharacterDetail;
