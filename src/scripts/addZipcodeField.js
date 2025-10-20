// 这个脚本用于在Supabase中添加zipcode字段到pets表
// 请在Supabase SQL编辑器中运行以下SQL命令：

const addZipcodeFieldSQL = `
-- 添加zipcode字段到pets表
ALTER TABLE pets
ADD COLUMN IF NOT EXISTS zipcode VARCHAR(10);

-- 添加注释
COMMENT ON COLUMN pets.zipcode IS 'Postal code/ZIP code for the location';

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_pets_zipcode ON pets(zipcode);
`;

console.log('请在Supabase SQL编辑器中运行以下SQL命令：');
console.log('=====================================');
console.log(addZipcodeFieldSQL);
console.log('=====================================');

export default addZipcodeFieldSQL;
