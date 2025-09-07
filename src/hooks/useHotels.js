import { useEffect } from "react";
import useHotelStore from "../store/hotelStore";
import { getHotels } from "../services/hotelService";

const useHotels = () => {
  const { hotels, setHotels } = useHotelStore();

  useEffect(() => {
    getHotels().then(setHotels);
  }, [setHotels]);

  return hotels;
};

export default useHotels;