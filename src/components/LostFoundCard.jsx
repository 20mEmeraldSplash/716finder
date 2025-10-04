import {
  formatDate,
  getCategoryName,
  getStatusName,
} from '../utils/lostFoundUtils';

function LostFoundCard({ item, isSelected = false, onSelect }) {
  // 获取状态颜色
  const getStatusColor = status => {
    return status === 'lost'
      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  };

  // 获取状态图标
  const getStatusIcon = status => {
    return status === 'lost' ? '🔍' : '✅';
  };

  // 格式化地点显示
  const formatLocation = item => {
    if (item.address && item.address.city && item.address.state) {
      return `${item.address.city}, ${item.address.state}`;
    }
    return `ZIP: ${item.zipcode}`;
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(item.id);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-200 dark:ring-blue-800'
          : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
      }`}
      onClick={handleClick}
    >
      {/* 图片区域 */}
      <div className='relative h-32 bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden'>
        {item.photos && item.photos.length > 0 ? (
          <img
            src={item.photos[0]}
            alt={item.title}
            className='w-full h-full object-cover'
            onError={e => {
              // 图片加载失败时显示占位图
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        {/* 占位图 */}
        <div
          className={`w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 ${
            item.photos && item.photos.length > 0 ? 'hidden' : 'flex'
          }`}
        >
          <div className='text-center'>
            <svg
              className='w-12 h-12 mx-auto mb-2'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-sm'>No Image</p>
          </div>
        </div>

        {/* 状态标签 */}
        <div className='absolute top-2 left-2'>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              item.status
            )}`}
          >
            <span className='mr-1'>{getStatusIcon(item.status)}</span>
            {getStatusName(item.status)}
          </span>
        </div>

        {/* 类别标签 */}
        <div className='absolute top-2 right-2'>
          <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
            {getCategoryName(item.category)}
          </span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className='p-3'>
        {/* 标题 */}
        <h3 className='text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>
          {item.title}
        </h3>

        {/* 时间 */}
        <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1'>
          <svg
            className='w-3 h-3 mr-1'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          {formatDate(item.lastSeenAt)}
        </div>

        {/* 地点 */}
        <div className='flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2'>
          <svg
            className='w-3 h-3 mr-1'
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
          {formatLocation(item)}
        </div>

        {/* 描述预览 */}
        <p className='text-xs text-gray-600 dark:text-gray-300 line-clamp-2'>
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default LostFoundCard;
