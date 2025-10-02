import { useState } from 'react';

function SearchBar() {
  const [zipcode, setZipcode] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = e => {
    e.preventDefault();
    // TODO: 实现搜索逻辑
    // console.log('搜索:', { zipcode, location });
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSearch} className='w-full'>
        {/* 模仿设计的长条搜索框 */}
        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-soft p-2'>
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
                onChange={e => setLocation(e.target.value)}
                placeholder='Search for a location'
                className='w-full text-base border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
              />
            </div>

            {/* 分隔线 */}
            <div className='w-px h-6 bg-gray-300 dark:bg-gray-600 flex-shrink-0'></div>

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
                onChange={e => setZipcode(e.target.value)}
                placeholder='Enter Zip Code'
                className='w-full text-base border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500'
              />
            </div>

            {/* 清除按钮 */}
            <button
              type='button'
              onClick={() => {
                setZipcode('');
                setLocation('');
              }}
              className='p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex-shrink-0'
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
              className='bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 flex-shrink-0'
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
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
