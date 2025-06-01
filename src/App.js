import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import CharacterTable from './components/CharacterTable';
import CharacterDetail from './components/CharacterDetail';
import Pagination from './components/Pagination';
import { getCharacters } from './api/characterService';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacters({
          page: currentPage,
          name: nameFilter,
          status: statusFilter,
          gender: genderFilter,
        });
        setCharacters(data.results);
        setLoading(false);
      } catch (err) {
        setError('Veri çekilemedi.');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, nameFilter, statusFilter, genderFilter]);

  return (
    <Router>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#1a0000',
          minHeight: '100vh',
          color: '#fff',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: '#ff4c4c',
                    fontSize: '2.8rem',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(255, 76, 76, 0.8)',
                  }}
                >
                  Rick and Morty Karakterleri
                </motion.h1>

                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                  <input
                    type="text"
                    placeholder="İsme göre filtrele"
                    value={nameFilter}
                    onChange={(e) => {
                      setNameFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{
                      marginRight: '10px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#330000',
                      color: '#fff',
                    }}
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{
                      marginRight: '10px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#330000',
                      color: '#fff',
                    }}
                  >
                    <option value="">Tüm Durumlar</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                  </select>

                  <select
                    value={genderFilter}
                    onChange={(e) => {
                      setGenderFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#330000',
                      color: '#fff',
                    }}
                  >
                    <option value="">Tüm Cinsiyetler</option>
                    <option value="female">Kadın</option>
                    <option value="male">Erkek</option>
                    <option value="genderless">Cinsiyetsiz</option>
                    <option value="unknown">Bilinmeyen</option>
                  </select>
                </div>

                {loading && <p>Yükleniyor...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <CharacterTable characters={characters} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </>
            }
          />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
