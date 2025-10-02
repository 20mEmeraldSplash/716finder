# Lost&Found 数据结构指南

本项目已为失物招领功能建立了完整的数据结构和工具链，为将来的地图功能做好了准备。

## 📋 数据结构

### LostFoundItem 类型

```typescript
interface LostFoundItem {
  id: string; // 唯一标识符
  status: 'lost' | 'found'; // 状态：丢失或捡到
  title: string; // 物品标题
  category: ItemCategory; // 物品类别
  description: string; // 详细描述
  photos: string[]; // 图片 URL 数组
  lastSeenAt: string; // 最后见到时间 (ISO 8601)
  coordinates: Coordinates; // 坐标位置
  zipcode: string; // 邮编
  createdAt: string; // 创建时间 (ISO 8601)
  contact: Contact; // 联系信息
}
```

### 坐标类型

```typescript
interface Coordinates {
  latitude: number; // 纬度
  longitude: number; // 经度
}
```

### 联系信息类型

```typescript
interface Contact {
  name: string; // 联系人姓名
  email: string; // 邮箱
  phone?: string; // 电话（可选）
  preferredContact: 'email' | 'phone' | 'both'; // 偏好联系方式
}
```

### 物品类别

```typescript
type ItemCategory =
  | 'electronics' // 电子产品
  | 'clothing' // 服装
  | 'accessories' // 配饰
  | 'documents' // 证件
  | 'keys' // 钥匙
  | 'pets' // 宠物
  | 'books' // 书籍
  | 'jewelry' // 珠宝
  | 'sports' // 运动用品
  | 'other'; // 其他
```

## 🗺️ 地图功能准备

### 地图标记类型

```typescript
interface MapMarker {
  id: string;
  position: Coordinates;
  status: ItemStatus;
  category: ItemCategory;
  title: string;
  item: LostFoundItem;
}
```

### 标记颜色方案

- **红色标记** (`#ef4444`): 丢失物品
- **绿色标记** (`#10b981`): 捡到物品

## 📁 文件结构

```
src/
├── types/
│   └── lostFound.ts           # TypeScript 类型定义
├── data/
│   └── mockItems.json         # 模拟数据
├── services/
│   └── lostFoundService.js    # 数据服务层
├── utils/
│   └── lostFoundUtils.js      # 工具函数
└── components/
    └── LostFoundPreview.jsx   # 数据预览组件
```

## 🛠️ 工具函数

### 距离计算

```javascript
import { calculateDistance } from './utils/lostFoundUtils';

const distance = calculateDistance(
  { latitude: 40.7829, longitude: -73.9654 },
  { latitude: 40.7505, longitude: -73.9934 }
);
// 返回距离（公里）
```

### 地图标记转换

```javascript
import { itemsToMapMarkers } from './utils/lostFoundUtils';

const markers = itemsToMapMarkers(items);
// 将物品数组转换为地图标记数组
```

### 筛选功能

```javascript
import { filterItems } from './utils/lostFoundUtils';

const filteredItems = filterItems(items, {
  status: 'lost',
  category: 'electronics',
  zipcode: '10024',
  searchTerm: 'iPhone',
});
```

## 📊 数据服务

### 获取所有物品

```javascript
import { getAllItems } from './services/lostFoundService';

const items = await getAllItems();
```

### 获取统计信息

```javascript
import { getStatistics } from './services/lostFoundService';

const stats = await getStatistics();
// 返回: { total, lost, found, categoryStats, zipcodeStats }
```

### 获取地图标记

```javascript
import { getMapMarkers } from './services/lostFoundService';

const markers = await getMapMarkers({
  status: 'lost',
  category: 'electronics',
});
```

## 🎯 地图集成示例

### 使用 Leaflet 地图

```javascript
import L from 'leaflet';
import { getMapMarkers } from './services/lostFoundService';

// 创建地图
const map = L.map('map').setView([40.7829, -73.9654], 13);

// 获取标记数据
const markers = await getMapMarkers();

// 添加标记到地图
markers.forEach(marker => {
  const icon = L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${getMarkerColor(marker.status, marker.category)}"></div>`,
    iconSize: [20, 20],
  });

  L.marker(marker.position, { icon }).addTo(map).bindPopup(`
      <h3>${marker.title}</h3>
      <p>状态: ${getStatusName(marker.status)}</p>
      <p>类别: ${getCategoryName(marker.category)}</p>
    `);
});
```

### 使用 Google Maps

```javascript
import { getMapMarkers } from './services/lostFoundService';

// 创建地图
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 40.7829, lng: -73.9654 },
  zoom: 13,
});

// 获取标记数据
const markers = await getMapMarkers();

// 添加标记
markers.forEach(marker => {
  new google.maps.Marker({
    position: marker.position,
    map: map,
    title: marker.title,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: getMarkerColor(marker.status, marker.category),
      fillOpacity: 1,
      strokeWeight: 2,
      scale: 10,
    },
  });
});
```

## 📱 响应式设计

所有组件都支持响应式设计：

- **移动端**: 单列布局，触摸友好的交互
- **平板端**: 双列布局
- **桌面端**: 多列布局，更多信息展示

## 🌙 深色模式支持

所有组件都支持深色模式：

- 自动检测系统偏好
- 手动切换功能
- 一致的颜色主题

## 🔍 搜索和筛选

支持多种搜索和筛选方式：

- **文本搜索**: 标题和描述关键词
- **状态筛选**: 丢失/捡到
- **类别筛选**: 按物品类别
- **位置筛选**: 按邮编或坐标范围
- **时间筛选**: 按日期范围
- **距离筛选**: 按半径搜索

## 🚀 未来扩展

数据结构已为以下功能做好准备：

1. **实时通知**: WebSocket 集成
2. **图片上传**: 云存储集成
3. **用户系统**: 认证和授权
4. **消息系统**: 用户间通信
5. **推荐系统**: 智能匹配
6. **分析统计**: 数据可视化

## 📝 使用示例

查看 `src/components/LostFoundPreview.jsx` 了解完整的使用示例，包括：

- 数据加载和显示
- 统计信息展示
- 地图标记预览
- 响应式布局
- 深色模式支持
