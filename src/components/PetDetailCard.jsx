import { formatAddress } from '../utils/addressFormatter';
import { formatDate, getStatusName } from '../utils/lostFoundUtils';

function PetDetailCard({ pet, onClose }) {
  if (!pet) return null;

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

  return (
    <div className='bg-white'>
      {/* 返回按钮 */}
      <div className='flex items-center justify-between mb-4'>
        <div
          onClick={onClose}
          className='flex items-center text-gray-600 hover:text-gray-800 cursor-pointer'
        >
          <svg
            className='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back to List
        </div>
        <button
          onClick={onClose}
          className='text-gray-400 hover:text-gray-600 transition-colors p-1'
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
      </div>

      {/* 图片区域 */}
      <div className='relative h-48 bg-gray-100 overflow-hidden mb-4'>
        {pet.photos && pet.photos.length > 0 ? (
          <img
            src={pet.photos[0]}
            alt={pet.name}
            className='w-full h-full object-cover'
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        {/* 占位图 */}
        <div
          className={`w-full h-full flex items-center justify-center text-gray-400 ${
            pet.photos && pet.photos.length > 0 ? 'hidden' : 'flex'
          }`}
        >
          <div className='text-center'>
            <svg
              className='w-16 h-16 mx-auto mb-2'
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
        <div className='absolute top-3 left-3'>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              pet.status
            )}`}
          >
            <span className='mr-2'>{getStatusIcon(pet.status)}</span>
            {getStatusName(pet.status)}
          </span>
        </div>

        {/* 种类标签 */}
        <div className='absolute top-3 right-3'>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
            {pet.species
              ? pet.species.charAt(0).toUpperCase() + pet.species.slice(1)
              : 'Pet'}
          </span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className='px-4 pb-4'>
        {/* 标题和基本信息 */}
        <div className='mb-4'>
          <h2 className='text-xl font-bold text-gray-900 mb-2'>{pet.name}</h2>

          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <span className='font-medium text-gray-700'>Species:</span>
              <span className='ml-2 text-gray-600'>
                {pet.species
                  ? pet.species.charAt(0).toUpperCase() + pet.species.slice(1)
                  : 'Unknown'}
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Breed:</span>
              <span className='ml-2 text-gray-600'>
                {pet.breed || 'Unknown'}
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Color:</span>
              <span className='ml-2 text-gray-600'>
                {pet.color || 'Unknown'}
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Size:</span>
              <span className='ml-2 text-gray-600'>
                {pet.size || 'Unknown'}
              </span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Age:</span>
              <span className='ml-2 text-gray-600'>{pet.age || 'Unknown'}</span>
            </div>
            <div>
              <span className='font-medium text-gray-700'>Gender:</span>
              <span className='ml-2 text-gray-600'>
                {pet.gender || 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        {/* 时间信息 */}
        <div className='mb-4'>
          <div className='flex items-center text-sm text-gray-600 mb-1'>
            <svg
              className='w-4 h-4 mr-2'
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
            <span className='font-medium'>Last Seen:</span>
            <span className='ml-2'>{formatDate(pet.last_seen_at)}</span>
          </div>
        </div>

        {/* 地点信息 */}
        <div className='mb-4'>
          <div className='flex items-start text-sm text-gray-600'>
            <svg
              className='w-4 h-4 mr-2 mt-0.5 flex-shrink-0'
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
            <div>
              <span className='font-medium'>Location:</span>
              <div className='mt-1'>
                {pet.location_name ? (
                  <div>
                    <div className='text-gray-800'>
                      {formatAddress(pet.location_name)}
                    </div>
                    {pet.zipcode && (
                      <div className='text-xs text-gray-500 mt-1'>
                        ZIP: {pet.zipcode}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='text-gray-500'>Location unknown</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 描述 */}
        {pet.description && (
          <div className='mb-4'>
            <h3 className='font-medium text-gray-700 mb-2'>Description:</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>
              {pet.description}
            </p>
          </div>
        )}

        {/* 联系信息 */}
        {(pet.contact_name || pet.contact_email || pet.contact_phone) && (
          <div className='border-t pt-4'>
            <h3 className='font-medium text-gray-700 mb-3'>
              Contact Information:
            </h3>
            <div className='space-y-2 text-sm'>
              {pet.contact_name && (
                <div>
                  <span className='font-medium text-gray-600'>Name:</span>
                  <span className='ml-2 text-gray-800'>{pet.contact_name}</span>
                </div>
              )}
              {pet.contact_email && (
                <div>
                  <span className='font-medium text-gray-600'>Email:</span>
                  <span className='ml-2 text-gray-800'>
                    {pet.contact_email}
                  </span>
                </div>
              )}
              {pet.contact_phone && (
                <div>
                  <span className='font-medium text-gray-600'>Phone:</span>
                  <span className='ml-2 text-gray-800'>
                    {pet.contact_phone}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PetDetailCard;
