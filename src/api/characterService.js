// src/api/characterService.js
import axios from 'axios';

// Temel URL
const BASE_URL = 'https://rickandmortyapi.com/api/character';

// Karakterleri API'den çeken fonksiyon
export const getCharacters = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data; // Gelen veriyi döndür
  } catch (error) {
    console.error('Veri alınırken hata oluştu:', error.message);
    throw error;
  }
};
