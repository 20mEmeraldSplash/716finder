import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer as LeafletMap,
  Marker,
  Popup,
  TileLayer,
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

// 布法罗市坐标
const BUFFALO_COORDINATES = [42.8864, -78.8784];

function MapContainer() {
  return (
    <div className='w-full h-full'>
      <LeafletMap
        center={BUFFALO_COORDINATES}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className='z-0'
      >
        {/* 地图瓦片层 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* 默认标记点 - 布法罗市中心 */}
        <Marker position={BUFFALO_COORDINATES}>
          <Popup>
            <div className='text-center'>
              <h3 className='font-semibold text-gray-900'>Buffalo, NY</h3>
              <p className='text-sm text-gray-600'>默认中心点</p>
            </div>
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
}

export default MapContainer;
