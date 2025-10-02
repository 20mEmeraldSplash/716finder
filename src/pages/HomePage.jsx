import LostFoundPreview from '../components/LostFoundPreview';

function HomePage() {
  return (
    <div className='min-h-screen bg-purple-50 dark:bg-purple-900'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* 欢迎区域 */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              欢迎来到 716Finder
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6'>
              这是一个现代化的失物招领平台，帮助您找回丢失的物品或归还捡到的物品。
            </p>
            <div className='flex justify-center space-x-4'>
              <button className='btn btn-primary'>发布丢失信息</button>
              <button className='btn btn-secondary'>发布捡到信息</button>
            </div>
          </div>

          {/* Lost&Found 数据预览 */}
          <LostFoundPreview />

          {/* 功能展示区域 */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
            <div className='card p-6 text-center'>
              <div className='w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-primary-600 dark:text-primary-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                快速发布
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                简单几步即可发布丢失或捡到信息
              </p>
            </div>

            <div className='card p-6 text-center'>
              <div className='w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-success-600 dark:text-success-400'
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
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                地图定位
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                精确显示物品丢失或捡到的位置
              </p>
            </div>

            <div className='card p-6 text-center'>
              <div className='w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-warning-600 dark:text-warning-400'
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
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                智能搜索
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                按类别、位置、时间等条件筛选
              </p>
            </div>
          </div>

          {/* 技术栈展示 */}
          <div className='card p-8'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
              技术栈
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div className='text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2'>
                  React
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-300'>
                  用户界面库
                </div>
              </div>
              <div className='text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div className='text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2'>
                  Vite
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-300'>
                  构建工具
                </div>
              </div>
              <div className='text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div className='text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2'>
                  Tailwind
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-300'>
                  CSS 框架
                </div>
              </div>
              <div className='text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                <div className='text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2'>
                  Router
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-300'>
                  路由管理
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
