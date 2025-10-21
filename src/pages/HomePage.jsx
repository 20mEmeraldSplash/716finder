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

  const handleMarkerClick = itemId => {
    setSelectedItemId(itemId);
  };

  return (
    <div className='flex-1 bg-purple-50 flex flex-col overflow-hidden'>
      <div className='w-full p-4 flex-shrink-0'>
        <SearchBar onLocationUpdate={handleLocationUpdate} />
      </div>

      {/* 水平分割的两个区域 */}
      <div className='flex flex-1 px-4 pb-4 gap-4 min-h-0'>
        {/* 左侧白色区域 - 卡片列表 */}
        <div className='w-1/2 bg-white rounded-xl shadow-soft overflow-hidden flex flex-col'>
          <div className='p-6 flex-1 overflow-y-auto'>
            <LostFoundCardList
              selectedItemId={selectedItemId}
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>

        {/* 右侧地图容器 - 占满剩余高度 */}
        <div className='w-1/2 rounded-xl shadow-soft overflow-hidden'>
          <MapContainer
            center={[mapLocation.latitude, mapLocation.longitude]}
            locationName={mapLocation.displayName}
            selectedItemId={selectedItemId}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
