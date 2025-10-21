import { useState } from 'react';
import AddressAutocomplete from '../components/AddressAutocomplete';
import { addPet } from '../services/petService';

function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    color: '',
    size: '',
    age: '',
    gender: '',
    status: 'lost',
    description: '',
    last_seen_at: '',
    location_name: '',
    latitude: '',
    longitude: '',
    zipcode: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    photos: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationSelect = locationData => {
    setFormData(prev => ({
      ...prev,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      location_name: locationData.location_name,
      zipcode: locationData.zipcode,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // 处理坐标数据
      const petData = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        last_seen_at: formData.last_seen_at || new Date().toISOString(),
      };

      await addPet(petData);
      setMessage('Pet added successfully!');
      setFormData({
        name: '',
        species: '',
        breed: '',
        color: '',
        size: '',
        age: '',
        gender: '',
        status: 'lost',
        description: '',
        last_seen_at: '',
        location_name: '',
        latitude: '',
        longitude: '',
        zipcode: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        photos: [],
      });
    } catch (error) {
      console.error('Error adding pet:', error);
      setMessage('Error adding pet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex-1 bg-purple-50 p-8 overflow-y-auto'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-soft p-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Add Lost/Found Pet
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.includes('successfully')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* 基本信息 */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Pet Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Species
              </label>
              <select
                name='species'
                value={formData.species}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              >
                <option value=''>Select Species</option>
                <option value='dog'>Dog</option>
                <option value='cat'>Cat</option>
                <option value='bird'>Bird</option>
                <option value='other'>Other</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Breed
              </label>
              <input
                type='text'
                name='breed'
                value={formData.breed}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Color
              </label>
              <input
                type='text'
                name='color'
                value={formData.color}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Size
              </label>
              <select
                name='size'
                value={formData.size}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>Select Size</option>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Age
              </label>
              <input
                type='text'
                name='age'
                value={formData.age}
                onChange={handleInputChange}
                placeholder='e.g., 2 years old'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Gender
              </label>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='unknown'>Unknown</option>
              </select>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Status
            </label>
            <select
              name='status'
              value={formData.status}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='lost'>Lost</option>
              <option value='found'>Found</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Describe the pet, any special markings, collar, etc.'
            />
          </div>

          {/* 位置信息 */}
          <div className='border-t pt-4'>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Location Information
            </h3>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Location Name
                </label>
                <AddressAutocomplete
                  value={formData.location_name}
                  onChange={value =>
                    setFormData(prev => ({ ...prev, location_name: value }))
                  }
                  onLocationSelect={handleLocationSelect}
                  placeholder='Start typing address...'
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Start typing to see address suggestions
                </p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Last Seen Date
                </label>
                <input
                  type='datetime-local'
                  name='last_seen_at'
                  value={formData.last_seen_at}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            {/* 显示自动填充的坐标和邮编 */}
            {formData.latitude && formData.longitude && (
              <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-lg'>
                <div className='text-sm text-green-800'>
                  <strong>Auto-filled location data:</strong>
                </div>
                <div className='text-xs text-green-600 mt-1'>
                  Latitude: {formData.latitude} | Longitude:{' '}
                  {formData.longitude}
                  {formData.zipcode && ` | Zipcode: ${formData.zipcode}`}
                </div>
              </div>
            )}
          </div>

          {/* 联系信息 */}
          <div className='border-t pt-4'>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Contact Information
            </h3>

            <div className='grid grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Contact Name
                </label>
                <input
                  type='text'
                  name='contact_name'
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone
                </label>
                <input
                  type='tel'
                  name='contact_phone'
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  name='contact_email'
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>
          </div>

          <div className='pt-6'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Adding Pet...' : 'Add Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPage;
