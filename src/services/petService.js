import { supabase } from '../config/supabase';

// 获取所有宠物
export const getAllPets = async () => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }

  return data;
};

// 根据状态获取宠物（lost/found）
export const getPetsByStatus = async status => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pets by status:', error);
    throw error;
  }

  return data;
};

// 添加新宠物
export const addPet = async petData => {
  const { data, error } = await supabase
    .from('pets')
    .insert([petData])
    .select();

  if (error) {
    console.error('Error adding pet:', error);
    throw error;
  }

  return data[0];
};

// 更新宠物信息
export const updatePet = async (id, petData) => {
  const { data, error } = await supabase
    .from('pets')
    .update(petData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating pet:', error);
    throw error;
  }

  return data[0];
};

// 删除宠物
export const deletePet = async id => {
  const { error } = await supabase.from('pets').delete().eq('id', id);

  if (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }

  return true;
};

// 根据位置搜索宠物
export const searchPetsByLocation = async (
  latitude,
  longitude,
  radius = 10
) => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null);

  if (error) {
    console.error('Error searching pets by location:', error);
    throw error;
  }

  // 简单的距离计算（可以后续优化）
  const filteredPets = data.filter(pet => {
    if (!pet.latitude || !pet.longitude) return false;

    const distance = calculateDistance(
      { latitude, longitude },
      { latitude: pet.latitude, longitude: pet.longitude }
    );

    return distance <= radius;
  });

  return filteredPets;
};

// 计算两点间距离（公里）
const calculateDistance = (coord1, coord2) => {
  const R = 6371; // 地球半径（公里）
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = degrees => {
  return degrees * (Math.PI / 180);
};
