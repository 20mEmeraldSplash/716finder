// 地理编码服务 - 将地址/邮编转换为坐标

import axios from 'axios';

/**
 * 使用 Nominatim (OpenStreetMap) 地理编码服务
 * @param {string} query - 地址或邮编
 * @returns {Promise<{latitude: number, longitude: number, display_name: string}>}
 */
export async function geocodeAddress(query) {
  try {
    if (!query.trim()) {
      throw new Error('请输入有效的地址或邮编');
    }

    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          q: query,
          format: 'json',
          limit: 1,
          countrycodes: 'us', // 限制在美国
          addressdetails: 1,
        },
        headers: {
          'User-Agent': '716Finder/1.0',
        },
      }
    );

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        display_name: result.display_name,
        address: result.address,
      };
    } else {
      throw new Error('未找到该地址或邮编');
    }
  } catch (error) {
    console.error('地理编码错误:', error);
    throw new Error(error.message || '地理编码失败');
  }
}

/**
 * 验证邮编格式
 * @param {string} zipcode - 邮编
 * @returns {boolean}
 */
export function isValidZipcode(zipcode) {
  // 美国邮编格式: 5位数字或5位数字-4位数字
  const zipcodeRegex = /^\d{5}(-\d{4})?$/;
  return zipcodeRegex.test(zipcode);
}

/**
 * 验证地址格式
 * @param {string} address - 地址
 * @returns {boolean}
 */
export function isValidAddress(address) {
  // 基本地址验证：至少包含一些字母和数字
  return address.trim().length >= 3;
}

/**
 * 格式化地址显示
 * @param {string} displayName - 完整地址
 * @returns {string}
 */
export function formatAddress(displayName) {
  if (!displayName) return '';

  // 提取主要地址部分，去掉过于详细的描述
  const parts = displayName.split(',');
  if (parts.length > 3) {
    return parts.slice(0, 3).join(',').trim();
  }
  return displayName;
}

/**
 * 获取默认位置（Buffalo, NY）
 * @returns {{latitude: number, longitude: number, display_name: string}}
 */
export function getDefaultLocation() {
  return {
    latitude: 42.8864,
    longitude: -78.8784,
    display_name: 'Buffalo, NY, USA',
    address: {
      city: 'Buffalo',
      state: 'New York',
      country: 'United States',
    },
  };
}
