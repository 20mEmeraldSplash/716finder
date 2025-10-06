import { useEffect, useState } from 'react';
import {
  geocodeAddress,
  getZipcodeValidationError,
  isValidAddress,
} from '../services/geocodingService';

function SearchBar({ onLocationUpdate }) {
  const [zipcode, setZipcode] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 从 URL 参数初始化搜索条件
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlZipcode = urlParams.get('zip');
    const urlLocation = urlParams.get('location');

    if (urlZipcode) {
      setZipcode(urlZipcode);
    }
    if (urlLocation) {
      setLocation(urlLocation);
    }

    // 如果有 URL 参数，自动执行搜索
    if (urlZipcode || urlLocation) {
      handleSearchFromURL(urlZipcode, urlLocation);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 更新 URL 参数
  const updateURLParams = (newZipcode, newLocation) => {
    const url = new URL(window.location);
    const params = url.searchParams;

    if (newZipcode) {
      params.set('zip', newZipcode);
    } else {
      params.delete('zip');
    }

    if (newLocation) {
      params.set('location', newLocation);
    } else {
      params.delete('location');
    }

    // 更新 URL 但不刷新页面
    window.history.replaceState({}, '', url.toString());
  };

  // 从 URL 参数执行搜索
  const handleSearchFromURL = async (urlZipcode, urlLocation) => {
    const searchQuery = urlZipcode || urlLocation;
    if (!searchQuery) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await geocodeAddress(searchQuery);
      if (onLocationUpdate) {
        onLocationUpdate({
          latitude: result.latitude,
          longitude: result.longitude,
          displayName: result.display_name,
        });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async e => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 优先使用邮编，如果没有邮编则使用位置描述
      const searchQuery = zipcode.trim() || location.trim();

      if (!searchQuery) {
        setError('Please enter a ZIP code or address');
        return;
      }

      // 验证邮编（仅在搜索时验证）
      const zipcodeValidationError = getZipcodeValidationError(zipcode);
      if (zipcodeValidationError) {
        setError(zipcodeValidationError);
        return;
      }

      // 验证地址
      if (location && !isValidAddress(location)) {
        setError('Please enter a valid address');
        return;
      }

      // 地理编码
      const result = await geocodeAddress(searchQuery);

      // 更新地图位置
      if (onLocationUpdate) {
        onLocationUpdate({
          latitude: result.latitude,
          longitude: result.longitude,
          displayName: result.display_name,
        });
      }

      // 更新 URL 参数
      updateURLParams(zipcode, location);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理邮编输入变化
  const handleZipcodeChange = e => {
    const value = e.target.value;
    setZipcode(value);
    setError(''); // 清除搜索错误
  };

  // 处理地址输入变化
  const handleLocationChange = e => {
    setLocation(e.target.value);
    setError(''); // 清除搜索错误
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSearch} className='w-full'>
        {/* 模仿设计的长条搜索框 */}
        <div className='bg-white  rounded-xl shadow-soft p-2'>
          <div className='flex items-center gap-4'>
            {/* 搜索图标 */}
            <svg
              className='w-5 h-5 text-gray-400 flex-shrink-0'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>

            {/* 位置描述输入框 - 主要输入区域 */}
            <div className='flex-1'>
              <input
                type='text'
                value={location}
                onChange={handleLocationChange}
                placeholder='Search for a location'
                className='w-full text-base border-none outline-none bg-transparent text-gray-900  placeholder-gray-400 '
              />
            </div>

            {/* 分隔线 */}
            <div className='w-px h-6 bg-gray-300  flex-shrink-0'></div>

            {/* 位置图标 */}
            <svg
              className='w-4 h-4 text-gray-400 flex-shrink-0'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>

            {/* 邮编输入框 - 较小 */}
            <div className='w-32'>
              <input
                type='text'
                value={zipcode}
                onChange={handleZipcodeChange}
                placeholder='Enter Zip Code'
                className='w-full text-base border-none outline-none bg-transparent text-gray-900  placeholder-gray-400 '
              />
            </div>

            {/* 清除按钮 */}
            <button
              type='button'
              onClick={() => {
                setZipcode('');
                setLocation('');
                setError('');
                // 清除 URL 参数
                updateURLParams('', '');
              }}
              className='p-2 text-gray-400 hover:text-gray-600  transition-colors duration-200 flex-shrink-0'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>

            {/* 搜索按钮 - 只有图标 */}
            <button
              type='submit'
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
              } text-white`}
            >
              {isLoading ? (
                <svg
                  className='w-5 h-5 animate-spin'
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
              ) : (
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 错误信息显示 */}
        {error && (
          <div className='mt-3 p-3 bg-red-100  border border-red-300  rounded-lg'>
            <p className='text-sm text-red-700 '>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
