import { Map,Marker,Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'
import ota from '../data/ota.json';

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
    //glyphs
    glyphs: "https://glyphs.geolonia.com/{fontstack}/{range}.pbf",
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
    data: ota,
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
  // ポリゴンの中心に地名を表示
  ota.features.forEach((feature: any) => {
    const coordinates = feature.geometry.coordinates[0].reduce(
      (acc: [number, number], coord: [number, number]) => {
        acc[0] += coord[0];
        acc[1] += coord[1];
        return acc;
      },
      [0, 0]
    );
    const center:[number,number] = [coordinates[0] / feature.geometry.coordinates[0].length, coordinates[1] / feature.geometry.coordinates[0].length];

    map.addSource(`place-${feature.properties.S_NAME}`, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: feature.properties.S_NAME
            },
            geometry: {
              type: 'Point',
              coordinates: center
            }
          }
        ]
      }
    });

    map.addLayer({
      id: `place-label-${feature.properties.S_NAME}`,
      type: 'symbol',
      source: `place-${feature.properties.S_NAME}`,
      layout: {
        'text-field': feature.properties.S_NAME,
        'text-font': ['Noto Sans CJK JP Regular'],
      },
    });

  });
});

