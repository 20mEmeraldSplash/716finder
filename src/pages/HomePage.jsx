import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';

function HomePage() {
  return (
    <div className='min-h-screen bg-purple-50 dark:bg-purple-900'>
      <div className='w-full p-4'>
        <SearchBar />

        {/* 水平分割的两个区域 */}
        <div className='flex h-96 mt-4'>
          {/* 左侧白色区域 */}
          <div className='flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-soft mr-2'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                左侧区域
              </h2>
              <p className='text-gray-600 dark:text-gray-300'>
                这里是白色背景的内容区域
              </p>
            </div>
          </div>

          {/* 右侧粉色区域 - 地图容器 */}
          <div className='flex-1 rounded-xl shadow-soft ml-2 overflow-hidden'>
            <MapContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
