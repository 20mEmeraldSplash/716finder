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
import { getAllPets } from '../services/petService';
import { getMarkerColor } from '../utils/lostFoundUtils';
import MapPopup from './MapPopup';

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
    // 优先处理选中物品的聚焦
    if (selectedItem && items.length > 0) {
      const selectedItemData = items.find(item => item.id === selectedItem);
      if (
        selectedItemData &&
        selectedItemData.latitude &&
        selectedItemData.longitude
      ) {
        const itemPosition = [
          selectedItemData.latitude,
          selectedItemData.longitude,
        ];
        map.setView(itemPosition, 16); // 使用更高的缩放级别聚焦
        return; // 如果选中了物品，就不执行下面的初始位置设置
      }
    }

    // 只有在没有选中物品时才设置到初始位置
    if (center && center.length === 2) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, selectedItem, items, map]);

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
        const data = await getAllPets();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
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

        {/* 宠物标记点 */}
        {!isLoading &&
          items.map(pet => {
            const markerColor = getMarkerColor(pet.status, pet.species);
            const isSelected = selectedItemId === pet.id;

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
                key={pet.id}
                position={[pet.latitude, pet.longitude]}
                icon={customIcon}
                eventHandlers={{
                  add: e => {
                    // 为标记添加 petId 选项
                    e.target.options.itemId = pet.id;
                  },
                }}
              >
                <Popup>
                  <MapPopup item={pet} isSelected={false} />
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
