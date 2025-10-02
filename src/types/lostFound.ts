// Lost&Found Item 类型定义

export type ItemStatus = 'lost' | 'found';

export type ItemCategory =
  | 'electronics'
  | 'clothing'
  | 'accessories'
  | 'documents'
  | 'keys'
  | 'pets'
  | 'books'
  | 'jewelry'
  | 'sports'
  | 'other';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Contact {
  name: string;
  email: string;
  phone?: string;
  preferredContact: 'email' | 'phone' | 'both';
}

export interface LostFoundItem {
  id: string;
  status: ItemStatus;
  title: string;
  category: ItemCategory;
  description: string;
  photos: string[]; // 图片 URL 数组
  lastSeenAt: string; // ISO 8601 格式的日期时间
  coordinates: Coordinates;
  zipcode: string;
  createdAt: string; // ISO 8601 格式的日期时间
  contact: Contact;
}

// 地图标记相关类型
export interface MapMarker {
  id: string;
  position: Coordinates;
  status: ItemStatus;
  category: ItemCategory;
  title: string;
  item: LostFoundItem;
}

// 搜索和筛选类型
export interface SearchFilters {
  status?: ItemStatus;
  category?: ItemCategory;
  zipcode?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  radius?: number; // 搜索半径（公里）
  center?: Coordinates; // 搜索中心点
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
