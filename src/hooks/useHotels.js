import { useCallback } from "react";
import useHotelStore from "../store/hotelStore";
import { getAllHotels } from "../services/hotelService";

const useHotels = () => {
  const {
    searchResults,
    loading,
    error,
    setSearchResults,
    setLoading,
    setError
  } = useHotelStore();

  const fetchAllHotels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getAllHotels();
      setSearchResults(results);
      return results;
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch hotels';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setSearchResults, setLoading, setError]);

  return {
    hotels: searchResults,
    loading,
    error,
    fetchAllHotels
  };
};

export default useHotels;