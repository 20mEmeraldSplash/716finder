import { useState } from 'react';
import { insertSamplePets } from '../scripts/insertSampleData';

function DataSetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInsertData = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      await insertSamplePets();
      setMessage('示例宠物数据插入成功！现在您可以查看主页和地图。');
    } catch (error) {
      console.error('插入数据失败:', error);
      setMessage('插入数据失败: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex-1 bg-purple-50 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-soft p-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>数据库设置</h1>

        <div className='space-y-4'>
          <p className='text-gray-600'>
            点击下面的按钮将示例宠物数据插入到Supabase数据库中。
            这将创建10个虚构的走丢/找到的宠物记录。
          </p>

          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.includes('成功')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <button
            onClick={handleInsertData}
            disabled={isLoading}
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? '正在插入数据...' : '插入示例宠物数据'}
          </button>

          <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
            <h3 className='font-semibold text-gray-900 mb-2'>
              包含的示例数据：
            </h3>
            <ul className='text-sm text-gray-600 space-y-1'>
              <li>
                • 5只走丢的狗狗（Golden Retriever, German Shepherd, Bulldog,
                Labrador Mix, Beagle）
              </li>
              <li>
                • 5只找到的猫咪（Maine Coon, Siamese, Domestic Shorthair, Black
                Domestic, Persian）
              </li>
              <li>• 分布在Buffalo地区的不同位置</li>
              <li>• 包含详细的描述和联系信息</li>
            </ul>
          </div>

          <div className='mt-4'>
            <a
              href='/'
              className='inline-block bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors'
            >
              返回主页查看数据
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataSetupPage;
