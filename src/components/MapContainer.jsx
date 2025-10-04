import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import {
  MapContainer as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { getAllItems } from '../services/lostFoundService';
import { getMarkerColor } from '../utils/lostFoundUtils';

// 修复 Leaflet 默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 默认位置 - 布法罗市坐标
const DEFAULT_COORDINATES = [42.8864, -78.8784];

// 创建自定义图标
const createCustomIcon = color => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// 地图中心更新组件
function MapUpdater({ center, zoom, selectedItem, items }) {
  const map = useMap();

  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);

  // 当选中物品时，聚焦到该物品的坐标
  useEffect(() => {
    if (selectedItem && items.length > 0) {
      const selectedItemData = items.find(item => item.id === selectedItem);
      if (selectedItemData) {
        const itemPosition = [
          selectedItemData.coordinates.latitude,
          selectedItemData.coordinates.longitude,
        ];
        map.setView(itemPosition, 16); // 使用更高的缩放级别聚焦
      }
    }
  }, [selectedItem, items, map]);

  return null;
}

// 弹窗控制组件
function PopupController({ selectedItemId, items }) {
  const map = useMap();

  useEffect(() => {
    // 关闭所有弹窗
    map.closePopup();

    // 如果选中了物品，延迟打开对应的弹窗
    if (selectedItemId && items.length > 0) {
      setTimeout(() => {
        // 查找所有标记并打开选中物品的弹窗
        map.eachLayer(layer => {
          if (
            layer instanceof L.Marker &&
            layer.options.itemId === selectedItemId
          ) {
            layer.openPopup();
          }
        });
      }, 600); // 稍微延迟确保地图已经聚焦
    }
  }, [selectedItemId, items, map]);

  return null;
}

function MapContainer({
  center = DEFAULT_COORDINATES,
  zoom = 13,
  locationName = 'Buffalo, NY',
  selectedItemId = null,
}) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className='w-full h-full'>
      <LeafletMap
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className='z-0'
      >
        {/* 地图中心更新器 */}
        <MapUpdater
          center={center}
          zoom={zoom}
          selectedItem={selectedItemId}
          items={items}
        />

        {/* 弹窗控制器 */}
        <PopupController selectedItemId={selectedItemId} items={items} />

        {/* 地图瓦片层 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* 默认中心标记点 */}
        <Marker position={center}>
          <Popup>
            <div className='text-center'>
              <h3 className='font-semibold text-gray-900'>{locationName}</h3>
              <p className='text-sm text-gray-600'>
                坐标: {center[0].toFixed(4)}, {center[1].toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* 物品标记点 */}
        {!isLoading &&
          items.map(item => {
            const markerColor = getMarkerColor(item.status, item.category);
            const isSelected = selectedItemId === item.id;

            const customIcon = L.divIcon({
              className: 'custom-marker',
              html: `<div style="
                background-color: ${markerColor};
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              "></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            });

            return (
              <Marker
                key={item.id}
                position={[
                  item.coordinates.latitude,
                  item.coordinates.longitude,
                ]}
                icon={customIcon}
                eventHandlers={{
                  add: e => {
                    // 为标记添加 itemId 选项
                    e.target.options.itemId = item.id;
                  },
                }}
              >
                <Popup>
                  {isSelected ? (
                    // 选中时只显示图片
                    <div className='text-center'>
                      {item.photos && item.photos.length > 0 ? (
                        <img
                          src={item.photos[0]}
                          alt={item.title}
                          className='w-32 h-32 object-cover rounded-lg'
                        />
                      ) : (
                        <div className='w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center'>
                          <span className='text-gray-500 text-sm'>
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    // 未选中时显示完整信息
                    <div className='text-center'>
                      <h3 className='font-semibold text-gray-900 mb-2'>
                        {item.title}
                      </h3>
                      <p className='text-sm text-gray-600 mb-2'>
                        {item.status === 'lost' ? '🔍 丢失' : '✅ 找到'}
                      </p>
                      <p className='text-xs text-gray-500 mb-2'>
                        {item.description}
                      </p>
                      <p className='text-xs text-gray-400'>
                        {new Date(item.lastSeenAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </Popup>
              </Marker>
            );
          })}
      </LeafletMap>

      {/* 添加脉冲动画样式 */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default MapContainer;
