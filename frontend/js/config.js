const MAP_SETTINGS = {
    center: [41.0122, 28.9760],
    zoom: 13,
    tiles: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
};

const DATA_PATHS = {
    infrastructure: (type) => `../data/geo/raw/raw_${type}.json`,
    readiness: (metric) => `../data/istanbul/analysis_${metric}.geojson`
};

const STYLE_PALETTE = {
    bridges: '#e74c3c',
    tunnels: '#34495e',
    highways: '#f1c40f',
    hospitals: '#2ecc71',
    power: '#9b59b6',
    ports: '#3498db',
    fuel: '#e67e22'
};