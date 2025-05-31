import React, { useEffect, useState } from 'react';
import { getCharacters } from './api/characterService';
import CharacterTable from './components/CharacterTable';
import Pagination from './components/Pagination';

function App() {
  // Burada karakter listesini ve yüklenme durumunu tutuyoruz
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Seçilen karakter detaylarını göstermek için bu state var
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Filtreler için ayrı ayrı state'ler kullandım, böyle daha rahat yönetilir
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Sayfa veya filtreler değişince API'den tekrar veri çekmek için useEffect kullandım
  useEffect(() => {
    // Asenkron fonksiyon, verileri çekerken hata kontrolü yapıyoruz
    const fetchData = async () => {
      try {
        // API çağrısını yapıyoruz, filtreleri ve sayfayı parametre olarak yolluyoruz
        const data = await getCharacters({
          page: currentPage,
          name: nameFilter,
          status: statusFilter,
          gender: genderFilter
        });

        // Veriyi aldık, listeyi güncelliyoruz ve yükleniyor durumunu kapatıyoruz
        setCharacters(data.results);
        setLoading(false);
        setError(null); // Önceki hatayı sıfırlıyoruz
      } catch (err) {
        // Bir sorun çıkarsa kullanıcıya bilgi veriyoruz
        setCharacters([]);
        setError('Veri çekilemedi ya da sonuç bulunamadı. Lütfen filtreleri kontrol edin.');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, nameFilter, statusFilter, genderFilter]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rick and Morty Karakterleri</h1>

      {/* Filtreleme için inputlar */}
      <div style={{ marginBottom: '20px' }}>
        {/* İsim filtresi */}
        <input
          type="text"
          placeholder="İsme göre filtrele"
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
            setCurrentPage(1); // Filtre değişince sayfayı başa alıyoruz
          }}
          style={{ marginRight: '10px', padding: '5px' }}
        />

        {/* Durum filtresi */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="">Tüm Durumlar</option>
          <option value="alive">Canlı</option>
          <option value="dead">Ölü</option>
          <option value="unknown">Bilinmeyen</option>
        </select>

        {/* Cinsiyet filtresi */}
        <select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: '5px' }}
        >
          <option value="">Tüm Cinsiyetler</option>
          <option value="female">Kadın</option>
          <option value="male">Erkek</option>
          <option value="genderless">Cinsiyetsiz</option>
          <option value="unknown">Bilinmeyen</option>
        </select>
      </div>

      {/* Eğer veri yükleniyorsa kullanıcıya bilgi veriyoruz */}
      {loading && <p>Yükleniyor, lütfen bekleyin...</p>}

      {/* Bir hata varsa burda gösteriyoruz */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Yükleme bitmiş ve veri varsa tabloyu gösteriyoruz */}
      {!loading && characters.length > 0 && (
        <>
          <CharacterTable
            characters={characters}
            onRowClick={(char) => setSelectedCharacter(char)} // Tablo satırına tıklanınca detayları aç
          />
          <Pagination
            currentPage={currentPage}
            totalPages={10} // API’de toplam 10 sayfa var
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {/* Kullanıcı bir karakter seçtiyse detayları göster */}
      {selectedCharacter && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h2>Karakter Detayları</h2>
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            style={{ width: '150px', borderRadius: '8px' }}
          />
          <p><strong>İsim:</strong> {selectedCharacter.name}</p>
          <p><strong>Durum:</strong> {selectedCharacter.status}</p>
          <p><strong>Cinsiyet:</strong> {selectedCharacter.gender}</p>
          <p><strong>Tür:</strong> {selectedCharacter.species}</p>
          <p><strong>Menşei:</strong> {selectedCharacter.origin.name}</p>
          <p><strong>Lokasyon:</strong> {selectedCharacter.location.name}</p>

          {/* Detayları kapatmak için buton */}
          <button onClick={() => setSelectedCharacter(null)} style={{ marginTop: '10px' }}>
            Detayı Kapat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
