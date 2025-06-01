import './CharacterDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
      setCharacter(res.data);
    });
  }, [id]);

  if (!character) return <p>Yükleniyor...</p>;

  return (
    <div>
      <Link to="/">← Geri dön</Link>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} style={{ width: '150px' }} />
      <p><strong>Durum:</strong> {character.status}</p>
      <p><strong>Cinsiyet:</strong> {character.gender}</p>
      <p><strong>Tür:</strong> {character.species}</p>
      <p><strong>Menşei:</strong> {character.origin.name}</p>
      <p><strong>Lokasyon:</strong> {character.location.name}</p>
    </div>
  );
}

export default CharacterDetail;
