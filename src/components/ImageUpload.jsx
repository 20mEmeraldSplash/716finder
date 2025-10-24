import { useRef, useState } from 'react';
import { uploadImage } from '../services/imageService';

function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  petId = 'temp',
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async files => {
    const newImages = Array.from(files).slice(0, maxImages - images.length);

    // 验证文件类型
    const validImages = newImages.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file.`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    if (validImages.length === 0) return;

    setUploading(true);

    try {
      // 上传到Supabase Storage
      const uploadPromises = validImages.map(async file => {
        const result = await uploadImage(file, petId);
        if (result.success) {
          return {
            id: Date.now() + Math.random(),
            url: result.url,
            name: file.name,
            fileName: result.fileName,
          };
        } else {
          throw new Error(result.error);
        }
      });

      const uploadedImages = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedImages]);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = e => {
    const files = e.target.files;
    handleFileSelect(files);
    e.target.value = ''; // Reset input
  };

  const removeImage = imageId => {
    onImagesChange(images.filter(img => img.id !== imageId));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='space-y-4'>
      {/* 上传区域 */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <svg
          className='mx-auto h-12 w-12 text-gray-400'
          stroke='currentColor'
          fill='none'
          viewBox='0 0 48 48'
        >
          <path
            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <div className='mt-2'>
          {uploading ? (
            <div className='flex items-center justify-center'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
              <span className='ml-2 text-blue-600'>Uploading...</span>
            </div>
          ) : (
            <>
              <button
                type='button'
                onClick={openFileDialog}
                className='text-blue-600 hover:text-blue-500 font-medium'
                disabled={uploading}
              >
                Click to upload
              </button>
              <span className='text-gray-500'> or drag and drop</span>
            </>
          )}
        </div>
        <p className='text-xs text-gray-500 mt-1'>
          PNG, JPG, GIF up to 5MB each (max {maxImages} images)
        </p>
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type='file'
        multiple
        accept='image/*'
        onChange={handleFileInputChange}
        className='hidden'
      />

      {/* 图片预览 */}
      {images.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {images.map(image => (
            <div key={image.id} className='relative group'>
              <img
                src={image.url}
                alt={image.name}
                className='w-full h-32 object-cover rounded-lg border border-gray-200'
              />
              <button
                type='button'
                onClick={() => removeImage(image.id)}
                className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors'
              >
                ×
              </button>
              <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg'>
                <p className='truncate'>{image.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 图片数量提示 */}
      {images.length > 0 && (
        <p className='text-sm text-gray-600'>
          {images.length} of {maxImages} images uploaded
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
