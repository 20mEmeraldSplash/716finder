function HomePage() {
  return (
    <div className='min-h-screen bg-purple-50 dark:bg-purple-900'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* 欢迎区域 */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              欢迎来到 716Finder
            </h1>
            <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              这是一个现代化的 React 应用，集成了 Tailwind CSS、React Router
              和完整的开发工具链。
            </p>
          </div>

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
                快速开发
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                使用 Vite + React 构建，开发体验极佳
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
                    d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                响应式设计
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                完美适配各种设备尺寸
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
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                深色模式
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                支持明暗主题切换
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
