import { useEffect, useState } from 'react';
import { getAllPets } from '../services/petService';
import LostFoundCard from './LostFoundCard';
import PetDetailCard from './PetDetailCard';

function LostFoundCardList({ selectedItemId, onItemSelect, isMobile = false }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPets();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
        setError('Failed to load pets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 当selectedItemId改变时，更新selectedPet并显示详情
  useEffect(() => {
    if (selectedItemId && items.length > 0) {
      const pet = items.find(item => item.id === selectedItemId);
      if (pet) {
        setSelectedPet(pet);
        setShowDetail(true); // 自动显示详情
      }
    } else if (!selectedItemId) {
      setSelectedPet(null);
      setShowDetail(false); // 清除详情显示
    }
  }, [selectedItemId, items]);

  const handleCardClick = itemId => {
    // 找到选中的宠物
    const pet = items.find(item => item.id === itemId);
    setSelectedPet(pet);
    setShowDetail(true);

    // 同时触发地图聚焦
    onItemSelect(itemId);
  };

  const handleCloseDetail = () => {
    setSelectedPet(null);
    setShowDetail(false);
    // 清除选中状态，同时更新 URL
    onItemSelect(null);
  };

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
          <p className='text-sm text-gray-500'>Loading items...</p>
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
          <p className='text-sm text-red-500'>{error}</p>
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
          <p className='text-sm text-gray-500'>No items found</p>
        </div>
      </div>
    );
  }

  // 如果显示详细模式，只显示详细卡片
  if (showDetail && selectedPet) {
    return (
      <div>
        <PetDetailCard pet={selectedPet} onClose={handleCloseDetail} />
      </div>
    );
  }

  // 否则显示列表模式
  return (
    <div className='space-y-4'>
      {/* 统计信息 - 只在非手机模式或手机模式下显示 */}
      {!isMobile && (
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Lost & Found Items
          </h2>
          <span className='text-sm text-gray-500'>{items.length} items</span>
        </div>
      )}

      {/* 卡片列表 - 根据设备类型调整布局 */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {items.map(item => (
          <LostFoundCard
            key={item.id}
            item={item}
            isSelected={selectedItemId === item.id}
            onSelect={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default LostFoundCardList;
