/* --- CONFIGURATIE (DATA) --- */
const MAP_CONFIG = [
    {
        category: "🚨 Kritieke Infrastructuur (Paper: Nodes & Logistics)",
        layers: [
            { id: 'grp-bridges', label: 'Bruggen & Viaducten', color: '#e74c3c', checked: true, layerIds: ['roads_bridges_major', 'roads_bridges_minor', 'roads_bridges_other'] },
            { id: 'grp-tunnels', label: 'Tunnels', color: '#3498db', checked: true, layerIds: ['roads_tunnels_major', 'roads_tunnels_minor'] },

            { id: 'grp-ports', label: 'Havens & Piers', color: '#1abc9c', checked: true, layerIds: ['roads_pier', 'landuse_pier'] },
            { id: 'grp-fuel-poi', label: 'Brandstofstations (OSM POI)', color: '#eb4d4b', checked: true, layerIds: ['pois'], filter: ['==', ['get', 'pmap:kind'], 'fuel'] },
            { id: 'grp-hospitals-landuse', label: 'Ziekenhuis Gebieden', color: '#f1c40f', checked: true, layerIds: ['landuse_hospital'] },

        ]
    },
    {
        category: "🏥 Resilience Support (Paper: Medical & Energy)",
        layers: [
            { id: 'grp-hospitals-landuse', label: 'Ziekenhuis Gebieden', color: '#f1c40f', checked: true, layerIds: ['landuse_hospital'] },
        ]
    },

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