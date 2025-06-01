import React from 'react';
import './CharacterTable.css';
import { useNavigate } from 'react-router-dom';

const CharacterTable = ({ characters }) => {
  const navigate = useNavigate();

  const handleRowClick = (character) => {
    navigate(`/character/${character.id}`, { state: { character } });
  };

  return (
    <div className="table-container">
      <table className="character-table">
        <thead>
          <tr>
            <th>Görsel</th>
            <th>İsim</th>
            <th>Durum</th>
            <th>Cinsiyet</th>
            <th>Tür</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => (
            <tr key={char.id} onClick={() => handleRowClick(char)}>
              <td>
                <img
                  className="character-image"
                  src={char.image}
                  alt={char.name}
                />
              </td>
              <td>{char.name}</td>
              <td>{char.status}</td>
              <td>{char.gender}</td>
              <td>{char.species}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
