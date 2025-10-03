import { useEffect, useState } from 'react';
import { getAllItems } from '../services/lostFoundService';
import LostFoundCard from './LostFoundCard';

function LostFoundCardList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        setError('Failed to load items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <svg
            className='w-8 h-8 animate-spin mx-auto mb-2 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Loading items...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <svg
            className='w-8 h-8 mx-auto mb-2 text-red-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p className='text-sm text-red-500 dark:text-red-400'>{error}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-center'>
          <svg
            className='w-8 h-8 mx-auto mb-2 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
            />
          </svg>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            No items found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* 统计信息 */}
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
          Lost & Found Items
        </h2>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          {items.length} items
        </span>
      </div>

      {/* 卡片列表 - 网格布局 */}
      <div className='grid grid-cols-2 gap-4 max-h-96 overflow-y-auto'>
        {items.map(item => (
          <LostFoundCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default LostFoundCardList;
