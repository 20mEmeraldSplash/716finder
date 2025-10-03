import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import {
  MapContainer as LeafletMap,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

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

// 地图中心更新组件
function MapUpdater({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);

  return null;
}

function MapContainer({
  center = DEFAULT_COORDINATES,
  zoom = 13,
  locationName = 'Buffalo, NY',
}) {
  return (
    <div className='w-full h-full'>
      <LeafletMap
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className='z-0'
      >
        {/* 地图中心更新器 */}
        <MapUpdater center={center} zoom={zoom} />

        {/* 地图瓦片层 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* 位置标记点 */}
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
      </LeafletMap>
    </div>
  );
}

export default MapContainer;
