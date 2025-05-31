// src/components/CharacterTable.jsx
import React from 'react';

function CharacterTable({ characters, onRowClick }) {
  if (!characters || characters.length === 0) {
    return <p>Görüntülenecek karakter bulunamadı.</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Resim</th>
          <th>İsim</th>
          <th>Durum</th>
          <th>Tür</th>
          <th>Cinsiyet</th>
        </tr>
      </thead>
      <tbody>
        {characters.map((char) => (
          <tr key={char.id} onClick={() => onRowClick(char)} style={{ cursor: 'pointer' }}>
            <td>
              <img src={char.image} alt={char.name} width={50} />
            </td>
            <td>{char.name}</td>
            <td>{char.status}</td>
            <td>{char.species}</td>
            <td>{char.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CharacterTable;
