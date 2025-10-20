// 地址格式化工具函数

/**
 * 格式化地址显示，将详细地址转换为简洁格式
 * @param {string} address - 原始地址字符串
 * @returns {string} 格式化后的地址
 */
export function formatAddress(address) {
  if (!address) return 'Location unknown';

  // 处理复杂的地址格式，如：Walgreens, 1556, Hertel Avenue, North Park, North Buffalo, Buffalo, Erie County, New York, 14216, United States
  const parts = address.split(',').map(part => part.trim());

  // 查找门牌号（数字开头的部分）
  let streetNumber = '';
  let streetName = '';
  let city = '';
  let state = '';
  let zipcode = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // 查找门牌号
    if (/^\d+$/.test(part) && !streetNumber) {
      streetNumber = part;
      // 下一个部分通常是街道名
      if (i + 1 < parts.length) {
        streetName = parts[i + 1];
      }
    }

    // 查找邮编（5位数字）
    if (/^\d{5}$/.test(part)) {
      zipcode = part;
    }

    // 查找州名
    if (part.includes('New York') || part.includes('NY')) {
      state = 'NY';
    }

    // 查找城市（通常在州之前，排除County、Park等）
    if (state && !city && i > 0) {
      // 向前查找城市名
      for (let j = i - 1; j >= 0; j--) {
        const candidate = parts[j];
        if (
          candidate &&
          !candidate.includes('County') &&
          !candidate.includes('Park') &&
          !candidate.includes('North') &&
          !candidate.includes('South') &&
          !candidate.includes('East') &&
          !candidate.includes('West') &&
          !candidate.includes('Avenue') &&
          !candidate.includes('Street') &&
          !candidate.includes('Road') &&
          !candidate.includes('Drive') &&
          !candidate.includes('Boulevard')
        ) {
          city = candidate;
          break;
        }
      }
    }
  }

  // 如果没有找到城市，使用Buffalo作为默认
  if (!city) {
    city = 'Buffalo';
  }

  // 构建格式化地址
  if (streetNumber && streetName) {
    if (zipcode) {
      return `${streetNumber} ${streetName}, ${city}, ${state}, ${zipcode}`;
    } else {
      return `${streetNumber} ${streetName}, ${city}, ${state}`;
    }
  }

  // 如果无法解析，尝试提取最后几个有意义的部分
  const meaningfulParts = parts.filter(
    part =>
      part &&
      !part.includes('United States') &&
      !part.includes('County') &&
      !part.includes('Park') &&
      part !== 'New York' &&
      !part.includes('North') &&
      !part.includes('South') &&
      !part.includes('East') &&
      !part.includes('West')
  );

  if (meaningfulParts.length > 0) {
    return meaningfulParts.slice(-3).join(', ');
  }

  // 如果完全无法解析，返回原始地址
  return address;
}

/**
 * 测试地址格式化功能
 */
export function testAddressFormatting() {
  const testCases = [
    'Wegmans, 601, Amherst Street, Buffalo, Erie County, New York, 14207, United States',
    'Walgreens, 1556, Hertel Avenue, North Park, North Buffalo, Buffalo, Erie County, New York, 14216, United States',
    '123 Main Street, Buffalo, NY, 14201',
    '456 Elm Avenue, Amherst, Erie County, New York, 14226',
    '789 Oak Road, Cheektowaga, NY, 14225',
  ];

  console.log('Address Formatting Test Results:');
  testCases.forEach((address, index) => {
    const formatted = formatAddress(address);
    console.log(`${index + 1}. Original: ${address}`);
    console.log(`   Formatted: ${formatted}`);
    console.log('---');
  });
}
