const MAP_SETTINGS = {
    center: [41.0122, 28.9760], // Central Istanbul / Bosphorus
    zoom: 13,
    tiles: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
};

const DATA_PATHS = {
    infrastructure: (type) => `../data/istanbul/infra_${type}.geojson`,
    readiness: (metric) => `../data/istanbul/analysis_${metric}.geojson`
};

const STYLE_PALETTE = {
    bridges: '#e74c3c',
    tunnels: '#34495e',
    highways: '#f1c40f',
    water: '#3498db'
};