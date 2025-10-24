import { supabase } from '../config/supabase';

const BUCKET_NAME = 'pet-photos';

/**
 * 上传单张图片到Supabase Storage
 * @param {File} file - 图片文件
 * @param {string} petId - 宠物ID（用于文件命名）
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export async function uploadImage(file, petId) {
  try {
    // 生成唯一文件名
    const fileExt = file.name.split('.').pop();
    const fileName = `${petId}_${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

    // 上传文件到Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }

    // 获取公开URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return {
      success: true,
      url: urlData.publicUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 批量上传图片
 * @param {File[]} files - 图片文件数组
 * @param {string} petId - 宠物ID
 * @returns {Promise<{success: boolean, urls?: string[], errors?: string[]}>}
 */
export async function uploadMultipleImages(files, petId) {
  const results = [];
  const urls = [];
  const errors = [];

  // 并行上传所有图片
  const uploadPromises = files.map(file => uploadImage(file, petId));
  const uploadResults = await Promise.all(uploadPromises);

  // 处理结果
  uploadResults.forEach((result, index) => {
    if (result.success) {
      urls.push(result.url);
    } else {
      errors.push(`Image ${index + 1}: ${result.error}`);
    }
  });

  return {
    success: urls.length > 0,
    urls,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * 删除图片
 * @param {string} fileName - 文件名
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteImage(fileName) {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * 从URL中提取文件名
 * @param {string} url - 图片URL
 * @returns {string} 文件名
 */
export function extractFileNameFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 1];
}
