import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharacterTable.css';

function CharacterTable() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [nameFilter, setNameFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const MAX_CHARACTERS = 300;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let allCharacters = [];
        let nextUrl = 'https://rickandmortyapi.com/api/character';

        while (nextUrl && allCharacters.length < MAX_CHARACTERS) {
          const { data } = await axios.get(nextUrl);
          allCharacters = [...allCharacters, ...data.results];
          nextUrl = data.info.next;
        }

        setCharacters(allCharacters);
        setFilteredCharacters(allCharacters);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const filtered = characters.filter((char) =>
      char.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (!speciesFilter || char.species === speciesFilter) &&
      (!statusFilter || char.status === statusFilter) &&
      (!genderFilter || char.gender === genderFilter)
    );

    setFilteredCharacters(filtered);
    setCurrentPage(1);
  }, [nameFilter, speciesFilter, statusFilter, genderFilter, characters]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setTimeout(() => {
      document.getElementById('character-detail')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="table-container">
      <h1 className="animated-title">Rick and Morty Karakterleri</h1>

      {/* Filters */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="İsme göre filtrele"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
          <option value="">Tür</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Robot">Robot</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Durum</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">Cinsiyet</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
          <option value={10}>10 sonuç</option>
          <option value={20}>20 sonuç</option>
          <option value={50}>50 sonuç</option>
          <option value={100}>100 sonuç</option>
        </select>
      </div>

      {/* Table */}
      <table className="character-table">
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
          {currentCharacters.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-results">Sonuç bulunamadı.</td>
            </tr>
          ) : (
            currentCharacters.map((char) => (
              <tr key={char.id} onClick={() => handleCharacterClick(char)}>
                <td>
                  <div className="character-image-container">
                    <img className="character-image" src={char.image} alt={char.name} />
                  </div>
                </td>
                <td>{char.name}</td>
                <td>{char.status}</td>
                <td>{char.species}</td>
                <td>{char.gender}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Character Details */}
      {selectedCharacter && (
        <div id="character-detail" className="character-detail-wrapper">
          <div className="character-detail-card">
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <h2>{selectedCharacter.name}</h2>
            <p><strong>Durum:</strong> {selectedCharacter.status}</p>
            <p><strong>Cinsiyet:</strong> {selectedCharacter.gender}</p>
            <p><strong>Tür:</strong> {selectedCharacter.species}</p>
            <p><strong>Konum:</strong> {selectedCharacter.location.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterTable;
