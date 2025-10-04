import { useState } from 'react';
import LostFoundCardList from '../components/LostFoundCardList';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [mapLocation, setMapLocation] = useState({
    latitude: 42.8864,
    longitude: -78.8784,
    displayName: 'Buffalo, NY',
  });
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleLocationUpdate = location => {
    setMapLocation(location);
  };

  const handleItemSelect = itemId => {
    setSelectedItemId(itemId);
  };

  return (
    <div className='min-h-screen bg-purple-50 dark:bg-purple-900'>
      <div className='w-full p-4'>
        <SearchBar onLocationUpdate={handleLocationUpdate} />

        {/* 水平分割的两个区域 */}
        <div className='flex mt-4'>
          {/* 左侧白色区域 - 卡片列表 */}
          <div className='flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-soft mr-2'>
            <div className='p-6'>
              <LostFoundCardList
                selectedItemId={selectedItemId}
                onItemSelect={handleItemSelect}
              />
            </div>
          </div>

          {/* 右侧粉色区域 - 地图容器 */}
          <div className='flex-1 rounded-xl shadow-soft ml-2 overflow-hidden'>
            <MapContainer
              center={[mapLocation.latitude, mapLocation.longitude]}
              locationName={mapLocation.displayName}
              selectedItemId={selectedItemId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
