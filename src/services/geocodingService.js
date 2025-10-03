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
      throw new Error('Please enter a valid address or ZIP code');
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
      throw new Error('Address or ZIP code not found');
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error(error.message || 'Geocoding failed');
  }
}

/**
 * 验证美国邮编格式
 * @param {string} zipcode - 邮编
 * @returns {boolean}
 */
export function isValidZipcode(zipcode) {
  // 美国邮编格式: 5位数字 (ZIP+4 格式也支持)
  const zipcodeRegex = /^\d{5}(-\d{4})?$/;
  return zipcodeRegex.test(zipcode.trim());
}

/**
 * 获取邮编验证错误信息
 * @param {string} zipcode - 邮编
 * @returns {string|null} 错误信息或null
 */
export function getZipcodeValidationError(zipcode) {
  if (!zipcode || !zipcode.trim()) {
    return null; // 空值不显示错误
  }

  const trimmed = zipcode.trim();

  // 检查是否只包含数字和连字符
  if (!/^[\d-]+$/.test(trimmed)) {
    return 'ZIP code must contain only numbers and hyphens';
  }

  // 检查长度
  if (trimmed.length < 5) {
    return 'ZIP code must be at least 5 digits';
  }

  if (trimmed.length > 10) {
    return 'ZIP code cannot exceed 10 characters';
  }

  // 检查格式
  if (!isValidZipcode(trimmed)) {
    return 'Please enter a valid US ZIP code (e.g., 10024 or 10024-1234)';
  }

  return null;
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
