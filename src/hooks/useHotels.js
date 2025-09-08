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

  const searchHotels = useCallback(async (searchParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const results = await getAllHotels(searchParams);
      setSearchResults(results);
      return results;
    } catch (err) {
      const errorMessage = err.message || 'Failed to search hotels';
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
    searchHotels
  };
};

export default useHotels;