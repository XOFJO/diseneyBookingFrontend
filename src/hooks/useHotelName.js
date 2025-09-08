import { useState, useEffect } from 'react';
import { getHotels } from '../services/hotelService';
import useHotelStore from '../store/hotelStore';

function useHotelNames() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setHotels: setStoreHotels } = useHotelStore();

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const hotelData = await getHotels();
      setHotels(hotelData);
      setStoreHotels(hotelData);
    } catch (err) {
      setError(err);
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return {
    hotels,
    loading,
    error,
    refetch: fetchHotels
  };
}

export default useHotelNames;