import { formatAddress } from '../utils/addressFormatter';

function AddressTestPage() {
  const testAddresses = [
    'Wegmans, 601, Amherst Street, Buffalo, Erie County, New York, 14207, United States',
    '123 Main Street, Buffalo, NY, 14201',
    '456 Elm Avenue, Amherst, Erie County, New York, 14226',
    '789 Oak Road, Cheektowaga, NY, 14225',
    'University at Buffalo, Buffalo, NY, 14214',
    'Delaware Park, Buffalo, NY, 14214',
  ];

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
          Address Formatting Test
        </h1>

        <div className='bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Test Results
          </h2>

          <div className='space-y-4'>
            {testAddresses.map((address, index) => (
              <div key={index} className='border-b border-gray-200 pb-4'>
                <div className='text-sm text-gray-600 mb-1'>
                  <strong>Original:</strong>
                </div>
                <div className='text-sm text-gray-800 mb-2 font-mono bg-gray-100 p-2 rounded'>
                  {address}
                </div>

                <div className='text-sm text-gray-600 mb-1'>
                  <strong>Formatted:</strong>
                </div>
                <div className='text-sm text-green-700 font-mono bg-green-50 p-2 rounded'>
                  {formatAddress(address)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressTestPage;
