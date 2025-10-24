import { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

      {/* 桌面模式：水平分割的两个区域 */}
      {!isMobile && (
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
      )}

      {/* 手机模式：根据showMap状态显示不同内容 */}
      {isMobile && (
        <div className='flex-1 px-4 pb-4 min-h-0'>
          {!showMap ? (
            /* 卡片列表模式 */
            <div className='bg-white rounded-xl shadow-soft overflow-hidden flex flex-col h-full'>
              <div className='p-4 flex items-center justify-between border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>
                  Lost & Found
                </h2>
                <button
                  onClick={() => setShowMap(true)}
                  className='flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors'
                >
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7'
                    />
                  </svg>
                  View Map
                </button>
              </div>
              <div className='p-4 flex-1 overflow-y-auto'>
                <LostFoundCardList
                  selectedItemId={selectedItemId}
                  onItemSelect={handleItemSelect}
                  isMobile={true}
                />
              </div>
            </div>
          ) : (
            /* 地图模式 */
            <div className='bg-white rounded-xl shadow-soft overflow-hidden flex flex-col h-full'>
              <div className='p-4 flex items-center justify-between border-b border-gray-200'>
                <h2 className='text-lg font-semibold text-gray-900'>
                  Map View
                </h2>
                <button
                  onClick={() => setShowMap(false)}
                  className='flex items-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors'
                >
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 10h16M4 14h16M4 18h16'
                    />
                  </svg>
                  View List
                </button>
              </div>
              <div className='flex-1'>
                <MapContainer
                  center={[mapLocation.latitude, mapLocation.longitude]}
                  locationName={mapLocation.displayName}
                  selectedItemId={selectedItemId}
                  onMarkerClick={handleMarkerClick}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
