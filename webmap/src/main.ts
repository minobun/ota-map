import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'

const map = new Map({
  container:'map',
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap contributors',
      },
    },
    layers:[
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
      },
    ],
  },
  center: [139.73, 35.56],
  zoom: 12,
})