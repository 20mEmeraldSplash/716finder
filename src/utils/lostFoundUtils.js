// Lost&Found 数据处理工具函数

/**
 * 计算两点之间的距离（公里）
 * @param {Object} coord1 - 第一个坐标点 {latitude, longitude}
 * @param {Object} coord2 - 第二个坐标点 {latitude, longitude}
 * @returns {number} 距离（公里）
 */
export function calculateDistance(coord1, coord2) {
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
}

/**
 * 角度转弧度
 * @param {number} degrees - 角度
 * @returns {number} 弧度
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * 根据坐标和半径筛选附近的物品
 * @param {Array} items - 物品数组
 * @param {Object} center - 中心坐标 {latitude, longitude}
 * @param {number} radiusKm - 半径（公里）
 * @returns {Array} 筛选后的物品数组
 */
export function filterItemsByRadius(items, center, radiusKm) {
  return items.filter(item => {
    const distance = calculateDistance(center, item.coordinates);
    return distance <= radiusKm;
  });
}

/**
 * 将 LostFoundItem 转换为地图标记
 * @param {Object} item - LostFoundItem 对象
 * @returns {Object} MapMarker 对象
 */
export function itemToMapMarker(item) {
  return {
    id: item.id,
    position: item.coordinates,
    status: item.status,
    category: item.category,
    title: item.title,
    item: item,
  };
}

/**
 * 批量转换物品为地图标记
 * @param {Array} items - 物品数组
 * @returns {Array} 地图标记数组
 */
export function itemsToMapMarkers(items) {
  return items.map(itemToMapMarker);
}

/**
 * 根据状态筛选物品
 * @param {Array} items - 物品数组
 * @param {string} status - 状态 ('lost' | 'found')
 * @returns {Array} 筛选后的物品数组
 */
export function filterItemsByStatus(items, status) {
  return items.filter(item => item.status === status);
}

/**
 * 根据类别筛选物品
 * @param {Array} items - 物品数组
 * @param {string} category - 类别
 * @returns {Array} 筛选后的物品数组
 */
export function filterItemsByCategory(items, category) {
  return items.filter(item => item.category === category);
}

/**
 * 根据邮编筛选物品
 * @param {Array} items - 物品数组
 * @param {string} zipcode - 邮编
 * @returns {Array} 筛选后的物品数组
 */
export function filterItemsByZipcode(items, zipcode) {
  return items.filter(item => item.zipcode === zipcode);
}

/**
 * 根据日期范围筛选物品
 * @param {Array} items - 物品数组
 * @param {string} startDate - 开始日期 (ISO 8601)
 * @param {string} endDate - 结束日期 (ISO 8601)
 * @returns {Array} 筛选后的物品数组
 */
export function filterItemsByDateRange(items, startDate, endDate) {
  return items.filter(item => {
    const itemDate = new Date(item.lastSeenAt);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return itemDate >= start && itemDate <= end;
  });
}

/**
 * 搜索物品（根据标题和描述）
 * @param {Array} items - 物品数组
 * @param {string} searchTerm - 搜索关键词
 * @returns {Array} 筛选后的物品数组
 */
export function searchItems(items, searchTerm) {
  if (!searchTerm.trim()) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(
    item =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
  );
}

/**
 * 综合筛选函数
 * @param {Array} items - 物品数组
 * @param {Object} filters - 筛选条件
 * @returns {Array} 筛选后的物品数组
 */
export function filterItems(items, filters) {
  let filteredItems = [...items];

  if (filters.status) {
    filteredItems = filterItemsByStatus(filteredItems, filters.status);
  }

  if (filters.category) {
    filteredItems = filterItemsByCategory(filteredItems, filters.category);
  }

  if (filters.zipcode) {
    filteredItems = filterItemsByZipcode(filteredItems, filters.zipcode);
  }

  if (filters.dateRange) {
    filteredItems = filterItemsByDateRange(
      filteredItems,
      filters.dateRange.start,
      filters.dateRange.end
    );
  }

  if (filters.searchTerm) {
    filteredItems = searchItems(filteredItems, filters.searchTerm);
  }

  if (filters.center && filters.radius) {
    filteredItems = filterItemsByRadius(
      filteredItems,
      filters.center,
      filters.radius
    );
  }

  return filteredItems;
}

/**
 * 格式化日期显示
 * @param {string} dateString - ISO 8601 日期字符串
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '今天';
  } else if (diffDays === 1) {
    return '昨天';
  } else if (diffDays < 7) {
    return `${diffDays} 天前`;
  } else {
    return date.toLocaleDateString('zh-CN');
  }
}

/**
 * 获取类别的中文名称
 * @param {string} category - 英文类别
 * @returns {string} 中文类别名称
 */
export function getCategoryName(category) {
  const categoryNames = {
    electronics: '电子产品',
    clothing: '服装',
    accessories: '配饰',
    documents: '证件',
    keys: '钥匙',
    pets: '宠物',
    books: '书籍',
    jewelry: '珠宝',
    sports: '运动用品',
    other: '其他',
  };

  return categoryNames[category] || '未知';
}

/**
 * 获取状态的中文名称
 * @param {string} status - 状态
 * @returns {string} 中文状态名称
 */
export function getStatusName(status) {
  return status === 'lost' ? '丢失' : '捡到';
}

/**
 * 生成地图标记的图标颜色
 * @param {string} status - 状态
 * @param {string} category - 类别
 * @returns {string} 颜色代码
 */
export function getMarkerColor(status, category) {
  if (status === 'lost') {
    return '#ef4444'; // 红色 - 丢失
  } else {
    return '#10b981'; // 绿色 - 找到
  }
}

/**
 * 验证坐标是否有效
 * @param {Object} coordinates - 坐标对象
 * @returns {boolean} 是否有效
 */
export function isValidCoordinates(coordinates) {
  return (
    coordinates &&
    typeof coordinates.latitude === 'number' &&
    typeof coordinates.longitude === 'number' &&
    coordinates.latitude >= -90 &&
    coordinates.latitude <= 90 &&
    coordinates.longitude >= -180 &&
    coordinates.longitude <= 180
  );
}
