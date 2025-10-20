import { supabase } from '../config/supabase';
import { samplePets } from '../data/samplePets';

// 插入示例宠物数据到数据库
export const insertSamplePets = async () => {
  try {
    console.log('开始插入示例宠物数据...');

    // 先清空现有数据（可选）
    const { error: deleteError } = await supabase
      .from('pets')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 删除所有记录

    if (deleteError) {
      console.log('清空现有数据时出错（可能表为空）:', deleteError.message);
    }

    // 插入示例数据
    const { data, error } = await supabase
      .from('pets')
      .insert(samplePets)
      .select();

    if (error) {
      console.error('插入数据时出错:', error);
      throw error;
    }

    console.log('成功插入', data.length, '条宠物数据');
    return data;
  } catch (error) {
    console.error('插入示例数据失败:', error);
    throw error;
  }
};

// 导出函数供其他组件使用
export default insertSamplePets;
