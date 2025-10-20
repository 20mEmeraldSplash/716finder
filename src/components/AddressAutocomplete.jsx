import { useEffect, useRef, useState } from 'react';

function AddressAutocomplete({
  value,
  onChange,
  onLocationSelect,
  placeholder = 'Enter location name...',
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // 使用Nominatim API进行地址搜索
  const searchAddress = async query => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // 修复API参数冲突问题 - 只使用q参数
      const searchQuery = `${query}, Buffalo, NY, USA`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`;

      console.log('Searching for:', searchQuery);
      console.log('API URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': '716Finder/1.0',
          Accept: 'application/json',
        },
        mode: 'cors',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data || data.length === 0) {
        console.log('No results found for query:', query);
        setSuggestions([]);
        return;
      }

      // 过滤结果，优先显示Buffalo地区的结果
      const filteredData = data.filter(item => {
        const address = item.address;
        const displayName = item.display_name.toLowerCase();

        // 优先显示Buffalo, NY的结果
        return (
          (address?.city?.toLowerCase().includes('buffalo') ||
            address?.state?.toLowerCase().includes('ny') ||
            displayName.includes('buffalo') ||
            displayName.includes('ny')) &&
          address?.country?.toLowerCase().includes('us')
        );
      });

      // 如果过滤后没有结果，使用原始数据
      const finalData =
        filteredData.length > 0 ? filteredData : data.slice(0, 5);

      const formattedSuggestions = finalData.map(item => ({
        id: item.place_id,
        display_name: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        address: {
          house_number: item.address?.house_number,
          road: item.address?.road,
          suburb: item.address?.suburb,
          city: item.address?.city,
          state: item.address?.state,
          postcode: item.address?.postcode,
          country: item.address?.country,
        },
      }));

      console.log('Formatted suggestions:', formattedSuggestions);
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Address search error:', error);

      // 如果API失败，提供一些默认的Buffalo地区地址
      const fallbackAddresses = [
        {
          id: 'fallback-1',
          display_name: 'Delaware Park, Buffalo, NY, USA',
          lat: 42.93,
          lon: -78.86,
          address: { city: 'Buffalo', state: 'NY', country: 'USA' },
        },
        {
          id: 'fallback-2',
          display_name: 'Elmwood Village, Buffalo, NY, USA',
          lat: 42.92,
          lon: -78.87,
          address: { city: 'Buffalo', state: 'NY', country: 'USA' },
        },
        {
          id: 'fallback-3',
          display_name: 'University at Buffalo, Buffalo, NY, USA',
          lat: 42.89,
          lon: -78.87,
          address: { city: 'Buffalo', state: 'NY', country: 'USA' },
        },
      ];

      console.log('Using fallback addresses');
      setSuggestions(fallbackAddresses);
    } finally {
      setIsLoading(false);
    }
  };

  // 防抖搜索
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAddress(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  // 处理输入变化
  const handleInputChange = e => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  // 处理建议选择
  const handleSuggestionClick = suggestion => {
    onChange(suggestion.display_name);
    onLocationSelect({
      latitude: suggestion.lat,
      longitude: suggestion.lon,
      location_name: suggestion.display_name,
      zipcode: suggestion.address?.postcode || null,
    });
    setIsOpen(false);
  };

  // 处理键盘导航
  const handleKeyDown = e => {
    if (!isOpen) return;

    const suggestions = suggestionsRef.current?.children;
    if (!suggestions) return;

    const activeElement = document.activeElement;
    const currentIndex = Array.from(suggestions).indexOf(activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < suggestions.length - 1) {
          suggestions[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          suggestions[currentIndex - 1].focus();
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (activeElement && activeElement.dataset.suggestion) {
          const suggestion = JSON.parse(activeElement.dataset.suggestion);
          handleSuggestionClick(suggestion);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // 点击外部关闭建议
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        type='text'
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        autoComplete='off'
      />

      {isLoading && (
        <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600'></div>
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type='button'
              data-suggestion={JSON.stringify(suggestion)}
              onClick={() => handleSuggestionClick(suggestion)}
              className='w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none'
              tabIndex={0}
            >
              <div className='text-sm text-gray-900'>
                {suggestion.display_name}
              </div>
              <div className='text-xs text-gray-500'>
                Lat: {suggestion.lat.toFixed(4)}, Lon:{' '}
                {suggestion.lon.toFixed(4)}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen &&
        !isLoading &&
        suggestions.length === 0 &&
        value.length >= 3 && (
          <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3'>
            <div className='text-sm text-gray-500'>No addresses found</div>
          </div>
        )}
    </div>
  );
}

export default AddressAutocomplete;
