// Lost&Found 数据预览组件（用于测试和展示）

import { useEffect, useState } from 'react';
import { getAllItems, getStatistics } from '../services/lostFoundService';
import {
  formatDate,
  getCategoryName,
  getMarkerColor,
  getStatusName,
} from '../utils/lostFoundUtils';

function LostFoundPreview() {
  const [items, setItems] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [itemsData, statsData] = await Promise.all([
        getAllItems(),
        getStatistics(),
      ]);
      setItems(itemsData);
      setStatistics(statsData);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-lg text-gray-600 dark:text-gray-300'>
          加载中...
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      {/* 统计信息 */}
      {statistics && (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='card p-4 text-center'>
            <div className='text-2xl font-bold text-primary-600 dark:text-primary-400'>
              {statistics.total}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              总物品数
            </div>
          </div>
          <div className='card p-4 text-center'>
            <div className='text-2xl font-bold text-red-600 dark:text-red-400'>
              {statistics.lost}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              丢失物品
            </div>
          </div>
          <div className='card p-4 text-center'>
            <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
              {statistics.found}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              捡到物品
            </div>
          </div>
          <div className='card p-4 text-center'>
            <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
              {Object.keys(statistics.categoryStats).length}
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-300'>
              物品类别
            </div>
          </div>
        </div>
      )}

      {/* 物品列表 */}
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          最近物品 ({items.length})
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {items.slice(0, 6).map(item => (
            <div key={item.id} className='card p-4'>
              {/* 状态标签 */}
              <div className='flex items-center justify-between mb-3'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'lost'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {getStatusName(item.status)}
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {formatDate(item.lastSeenAt)}
                </span>
              </div>

              {/* 标题和类别 */}
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>
                {item.title}
              </h3>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                类别: {getCategoryName(item.category)}
              </p>

              {/* 描述 */}
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2'>
                {item.description}
              </p>

              {/* 位置信息 */}
              <div className='text-xs text-gray-500 dark:text-gray-400 mb-3'>
                <div>邮编: {item.zipcode}</div>
                <div>
                  坐标: {item.coordinates.latitude.toFixed(4)},{' '}
                  {item.coordinates.longitude.toFixed(4)}
                </div>
              </div>

              {/* 联系信息 */}
              <div className='text-xs text-gray-500 dark:text-gray-400'>
                <div>联系人: {item.contact.name}</div>
                <div>偏好: {item.contact.preferredContact}</div>
              </div>

              {/* 地图标记预览 */}
              <div className='mt-3 flex items-center justify-center'>
                <div
                  className='w-4 h-4 rounded-full'
                  style={{
                    backgroundColor: getMarkerColor(item.status, item.category),
                  }}
                  title={`${getStatusName(item.status)} - ${getCategoryName(item.category)}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 地图准备提示 */}
      <div className='card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'>
        <h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
          🗺️ 地图功能准备就绪
        </h3>
        <p className='text-blue-700 dark:text-blue-300 text-sm'>
          所有物品都包含坐标信息，可以轻松在地图上显示标记。
          丢失物品显示为红色标记，捡到物品显示为绿色标记。
        </p>
        <div className='mt-3 flex space-x-4 text-xs'>
          <div className='flex items-center'>
            <div className='w-3 h-3 bg-red-500 rounded-full mr-2' />
            <span className='text-gray-600 dark:text-gray-300'>丢失物品</span>
          </div>
          <div className='flex items-center'>
            <div className='w-3 h-3 bg-green-500 rounded-full mr-2' />
            <span className='text-gray-600 dark:text-gray-300'>捡到物品</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LostFoundPreview;
