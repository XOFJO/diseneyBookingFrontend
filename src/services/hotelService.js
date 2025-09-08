import { getHotelNames } from "./api";
import { faHotel, faBuilding, faShield, faUmbrella, faBolt } from '@fortawesome/free-solid-svg-icons';

const defaultIcons = [faBuilding, faShield, faUmbrella, faBolt];

export const getHotels = async () => {
  try {
    const hotels = await getHotelNames();
    return hotels.map((hotel, index) => ({
      ...hotel,
      icon: hotel.id === 'all' ? faHotel : defaultIcons[index % defaultIcons.length]
    }));
  } catch (error) {
    console.error('Failed to fetch hotels:', error);
    return [{ id: 'all', name: 'All Hotels', icon: faHotel }];
  }
};