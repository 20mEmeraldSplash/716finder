import { formatAddress } from '../utils/addressFormatter';
import { formatDate, getStatusName } from '../utils/lostFoundUtils';

function MapPopup({ item, isSelected = false }) {
  // 获取状态颜色
  const getStatusColor = status => {
    return status === 'lost'
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  };

  // 获取状态图标
  const getStatusIcon = status => {
    return status === 'lost' ? '🔍' : '✅';
  };

  // 格式化地点显示
  const formatLocation = item => {
    if (item.location_name) {
      return formatAddress(item.location_name);
    }
    if (item.zipcode) {
      return `ZIP: ${item.zipcode}`;
    }
    return 'Location unknown';
  };

  if (isSelected) {
    // 选中时只显示图片
    return (
      <div className='text-center'>
        {item.photos && item.photos.length > 0 ? (
          <img
            src={item.photos[0]}
            alt={item.name}
            className='w-32 h-32 object-cover rounded-lg'
          />
        ) : (
          <div className='w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center'>
            <span className='text-gray-500 text-sm'>No Image</span>
          </div>
        )}
      </div>
    );
  }

  // 未选中时显示完整信息（与卡片保持一致）
  return (
    <div className='w-64'>
      {/* 图片区域 */}
      <div className='relative h-28 bg-gray-100 rounded-t-lg overflow-hidden mb-3'>
        {item.photos && item.photos.length > 0 ? (
          <img
            src={item.photos[0]}
            alt={item.name}
            className='w-full h-full object-cover rounded-lg'
            onError={e => {
              // 图片加载失败时显示占位图
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        {/* 占位图 */}
        <div
          className={`w-full h-full flex items-center justify-center text-gray-400 ${
            item.photos && item.photos.length > 0 ? 'hidden' : 'flex'
          }`}
        >
          <div className='text-center'>
            <svg
              className='w-8 h-8 mx-auto mb-1'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-xs'>No Image</p>
          </div>
        </div>

        {/* 状态标签 */}
        <div className='absolute top-2 left-2'>
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              item.status
            )}`}
          >
            <span className='mr-1'>{getStatusIcon(item.status)}</span>
            {getStatusName(item.status)}
          </span>
        </div>

        {/* 类别标签 */}
        <div className='absolute top-2 right-2'>
          <span className='inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
            {item.species
              ? item.species.charAt(0).toUpperCase() + item.species.slice(1)
              : 'Pet'}
          </span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className='px-2 pb-2'>
        {/* 标题 */}
        <h3 className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2'>
          {item.name}
        </h3>

        {/* 时间 */}
        <div className='flex items-center text-xs text-gray-500 mb-1'>
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
          {formatDate(item.last_seen_at)}
        </div>

        {/* 地点 */}
        <div className='flex items-center text-xs text-gray-500 mb-2'>
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
        <p className='text-xs text-gray-600 line-clamp-2'>{item.description}</p>
      </div>
    </div>
  );
}

export default MapPopup;
