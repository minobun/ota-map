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
});

// ポリゴンデータを表示する
map.on('load', function () {
  map.addSource('ku', {
      type: 'geojson',
      data: './data/N03-23_13_230101.geojson',
  });
  map.addSource('machi', {
    type: 'geojson',
    data: './data/h27ka13111.json',
  });
  map.addLayer({
      id: 'ku',
      type: 'line',
      source: 'ku',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
          'line-color': '#297bb2',
          'line-width': 5,
      },
  });
  map.addLayer({
    id: 'machi',
    type: 'line',
    source: 'machi',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
        'line-color': '#000000',
        'line-width': 1,
    },
  });
});

