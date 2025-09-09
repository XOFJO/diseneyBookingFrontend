import { getHotelNames, searchHotels,getHotelCities,getHotelThemes } from "./api";
import { faHotel, faBuilding, faShield, faUmbrella, faBolt } from '@fortawesome/free-solid-svg-icons';

const defaultIcons = [faBuilding, faShield, faUmbrella, faBolt];

// 数据适配器：处理不同的后端数据格式
const adaptHotelData = (data) => {
  // 如果是字符串数组格式（当前后端格式）
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
    return [
      { id: 'all', name: 'All Hotels', icon: faHotel },
      ...data.map((hotelName, index) => ({
        id: `hotel-${index + 1}`,
        name: hotelName,
        icon: defaultIcons[index % defaultIcons.length]
      }))
    ];
  }
  
  // 如果是对象数组格式（后端正式格式）
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    const adaptedHotels = data.map((hotel, index) => ({
      id: hotel.hotelId ? hotel.hotelId.toString() : hotel.id,
      name: hotel.hotelName || hotel.name,
      icon: defaultIcons[index % defaultIcons.length]
    }));
    
    return [
      { id: 'all', name: 'All Hotels', icon: faHotel },
      ...adaptedHotels
    ];
  }
  
  // 默认返回
  return [{ id: 'all', name: 'All Hotels', icon: faHotel }];
};

export const getHotels = async () => {
  try {
    const rawData = await getHotelNames();
    return adaptHotelData(rawData);
  } catch (error) {
    console.error('Failed to fetch hotels:', error);
    return [{ id: 'all', name: 'All Hotels', icon: faHotel }];
  }
};

export const getAllHotels = async (searchParams = {}) => {
  try {
    const response = await searchHotels(searchParams);
    console.log('HotelService - getAllHotels response:', response);
    // searchHotels 已经返回了 response.data，所以这里直接使用 response
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Failed to fetch all hotels:', error);
    throw error;
  }
};

export const getCities = async () => {
  //  参考adaptHotelData和getHotels，但获取到的cities应该是一个字符串数组
  try {
    const rawData = await getHotelCities();
    return Array.isArray(rawData) ? rawData : [];
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    return [];
  }
};
export const getThemes = async () => {
  try {
    const rawData = await getHotelThemes();
    return Array.isArray(rawData) ? rawData : [];
  } catch (error) {
    console.error('Failed to fetch themes:', error);
    return [];
  }
};
