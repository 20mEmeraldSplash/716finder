// Lost&Found 数据服务

import mockItems from '../data/mockItems.json';

/**
 * 获取所有物品
 * @returns {Promise<Array>} 物品数组
 */
export async function getAllItems() {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockItems;
}

/**
 * 根据 ID 获取单个物品
 * @param {string} id - 物品 ID
 * @returns {Promise<Object|null>} 物品对象或 null
 */
export async function getItemById(id) {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockItems.find(item => item.id === id) || null;
}

/**
 * 根据状态获取物品
 * @param {string} status - 状态 ('lost' | 'found')
 * @returns {Promise<Array>} 物品数组
 */
export async function getItemsByStatus(status) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockItems.filter(item => item.status === status);
}

/**
 * 根据类别获取物品
 * @param {string} category - 类别
 * @returns {Promise<Array>} 物品数组
 */
export async function getItemsByCategory(category) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockItems.filter(item => item.category === category);
}

/**
 * 根据邮编获取物品
 * @param {string} zipcode - 邮编
 * @returns {Promise<Array>} 物品数组
 */
export async function getItemsByZipcode(zipcode) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockItems.filter(item => item.zipcode === zipcode);
}

/**
 * 搜索物品
 * @param {string} searchTerm - 搜索关键词
 * @returns {Promise<Array>} 物品数组
 */
export async function searchItems(searchTerm) {
  await new Promise(resolve => setTimeout(resolve, 150));
  if (!searchTerm.trim()) return mockItems;

  const term = searchTerm.toLowerCase();
  return mockItems.filter(
    item =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
  );
}

/**
 * 获取最近添加的物品
 * @param {number} limit - 限制数量
 * @returns {Promise<Array>} 物品数组
 */
export async function getRecentItems(limit = 10) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockItems
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

/**
 * 获取统计信息
 * @returns {Promise<Object>} 统计信息
 */
export async function getStatistics() {
  await new Promise(resolve => setTimeout(resolve, 100));

  const total = mockItems.length;
  const lost = mockItems.filter(item => item.status === 'lost').length;
  const found = mockItems.filter(item => item.status === 'found').length;

  // 按类别统计
  const categoryStats = mockItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // 按邮编统计
  const zipcodeStats = mockItems.reduce((acc, item) => {
    acc[item.zipcode] = (acc[item.zipcode] || 0) + 1;
    return acc;
  }, {});

  return {
    total,
    lost,
    found,
    categoryStats,
    zipcodeStats,
  };
}

/**
 * 创建新物品（模拟）
 * @param {Object} itemData - 物品数据
 * @returns {Promise<Object>} 创建的物品
 */
export async function createItem(itemData) {
  await new Promise(resolve => setTimeout(resolve, 200));

  const newItem = {
    id: `item-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...itemData,
  };

  // 在真实应用中，这里会调用 API
  // mockItems.push(newItem);

  return newItem;
}

/**
 * 更新物品（模拟）
 * @param {string} id - 物品 ID
 * @param {Object} updates - 更新数据
 * @returns {Promise<Object|null>} 更新后的物品
 */
export async function updateItem(id, updates) {
  await new Promise(resolve => setTimeout(resolve, 200));

  const itemIndex = mockItems.findIndex(item => item.id === id);
  if (itemIndex === -1) return null;

  const updatedItem = {
    ...mockItems[itemIndex],
    ...updates,
  };

  // 在真实应用中，这里会调用 API
  // mockItems[itemIndex] = updatedItem;

  return updatedItem;
}

/**
 * 删除物品（模拟）
 * @param {string} id - 物品 ID
 * @returns {Promise<boolean>} 是否删除成功
 */
export async function deleteItem(id) {
  await new Promise(resolve => setTimeout(resolve, 200));

  const itemIndex = mockItems.findIndex(item => item.id === id);
  if (itemIndex === -1) return false;

  // 在真实应用中，这里会调用 API
  // mockItems.splice(itemIndex, 1);

  return true;
}

/**
 * 获取地图标记数据
 * @param {Object} filters - 筛选条件
 * @returns {Promise<Array>} 地图标记数组
 */
export async function getMapMarkers(filters = {}) {
  await new Promise(resolve => setTimeout(resolve, 100));

  let items = mockItems;

  // 应用筛选条件
  if (filters.status) {
    items = items.filter(item => item.status === filters.status);
  }

  if (filters.category) {
    items = items.filter(item => item.category === filters.category);
  }

  if (filters.zipcode) {
    items = items.filter(item => item.zipcode === filters.zipcode);
  }

  // 转换为地图标记格式
  return items.map(item => ({
    id: item.id,
    position: item.coordinates,
    status: item.status,
    category: item.category,
    title: item.title,
    item: item,
  }));
}
