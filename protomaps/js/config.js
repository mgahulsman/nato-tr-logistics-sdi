/* --- CONFIGURATIE (DATA) --- */
// const MAP_CONFIG = [
//     { id: 'bridges', color: '#e74c3c', layerIds: ['roads_bridges_major', 'roads_bridges_minor', 'roads_bridges_other'] },
//     { id: 'tunnels', color: '#34495e', layerIds: ['roads_tunnels_major', 'roads_tunnels_minor'] },
//     { id: 'highways', color: '#f1c40f', layerIds: ['roads_motorway', 'roads_trunk'] },
//     { id: 'hospitals', color: '#e73c3c86', layerIds: ['landuse_hospital'] },
//     { id: 'ports', color: '#3498db', layerIds: ['roads_pier', 'landuse_pier'] },
//     { id: 'fuel', color: '#e67e22', layerIds: ['pois'] }
// ];

const MAP_CONFIG = [
    { id: 'bridges', label: 'Bridges', color: '#e74c3c', layerIds: ['roads_bridges_major', 'roads_bridges_minor', 'roads_bridges_other'] },
    { id: 'tunnels', label: 'Tunnels', color: '#34495e', layerIds: ['roads_tunnels_major', 'roads_tunnels_minor'] },
    { id: 'highways', label: 'Highways', color: '#f1c40f', layerIds: ['roads_motorway', 'roads_trunk', 'roads_primary'] },
    { id: 'hospitals', label: 'Hospitals', color: '#2ecc71', layerIds: ['landuse_hospital'] },
    { id: 'power', label: 'Power', color: '#9b59b6', layerIds: ['pois'] }, 
    { id: 'ports', label: 'Ports', color: '#3498db', layerIds: ['roads_pier', 'landuse_pier'] },
    { id: 'fuel', label: 'Fuel', color: '#e67e22', layerIds: ['pois'] }
];

const API_KEY = "8f724fb4da305e5c";
const STYLE_URL = `https://api.protomaps.com/styles/v5/light/en.json?key=${API_KEY}`;

const map = new maplibregl.Map({
    container: 'map',
    style: STYLE_URL,
    center: [28.9784, 41.0082],
    zoom: 12,
    hash: true
});