import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => setCharacter(res.data))
      .catch(() => setError('Karakter bilgisi alınamadı.'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!character) return <p>Yükleniyor...</p>;

  return (
    <div className="detail-container">
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <ul>
        <li>Durum: {character.status}</li>
        <li>Tür: {character.species}</li>
        <li>Cinsiyet: {character.gender}</li>
        <li>Menşei: {character.origin.name}</li>
      </ul>
      <button className="back-button" onClick={() => navigate(-1)}>
        Geri Dön
      </button>
    </div>
  );
}

export default CharacterDetail;
