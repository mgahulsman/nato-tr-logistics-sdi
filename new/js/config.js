const MAP_CONFIG = [
    {
        category: "🚨 Kritieke Infrastructuur",
        layers: [
            { id: 'grp-bridges', label: 'Bruggen & Viaducten', color: '#e74c3c', checked: true, layerIds: ['roads_bridges_major', 'roads_bridges_link', 'roads_bridges_other', 'roads_bridges_major_casing', 'roads_bridges_link_casing', 'roads_bridges_other_casing'] },
            { id: 'grp-tunnels', label: 'Tunnels & Onderdoorgangen', color: '#3498db', checked: true, layerIds: ['roads_tunnels_major', 'roads_tunnels_link', 'roads_tunnels_minor', 'roads_tunnels_other', 'roads_tunnels_major_casing', 'roads_tunnels_link_casing', 'roads_tunnels_minor_casing', 'roads_tunnels_other_casing'] },
            { id: 'grp-piers', label: 'Havens & Piers', color: '#1abc9c', checked: true, layerIds: ['roads_pier'] },
            { id: 'grp-rail', label: 'Spoorwegen', color: '#9b59b6', checked: true, layerIds: ['roads_rail'] }
        ]
    },
    {
        category: "🏥 Maatschappelijk",
        layers: [
            { id: 'grp-hospitals', label: 'Ziekenhuizen', color: '#f1c40f', checked: true, layerIds: ['landuse_hospital'] },
            { id: 'grp-schools', label: 'Onderwijs', color: '#e67e22', checked: true, layerIds: ['landuse_school'] }
        ]
    },
    {
        category: "🗺️ Basis Kaart",
        layers: [
            { id: 'grp-roads-major', label: 'Hoofdwegen (E80/D100)', color: '#444444', checked: true, layerIds: ['roads_major', 'roads_major_casing_late', 'roads_link', 'roads_link_casing'] },
            { id: 'grp-roads-minor', label: 'Binnenwegen', color: '#95a5a6', checked: true, layerIds: ['roads_minor', 'roads_minor_service', 'roads_other'] },
            { id: 'grp-buildings', label: 'Gebouwen', color: '#bdc3c7', checked: true, layerIds: ['buildings'] },
            { id: 'grp-water', label: 'Waterlichamen', color: '#a2d9ff', checked: true, layerIds: ['water'] },
            { id: 'grp-green', label: 'Parken & Groen', color: '#2ecc71', checked: true, layerIds: ['landuse_urban_green', 'landuse_park'] }
        ]
    },
    {
        category: "🏭 Industrie & Logistiek",
        layers: [
            {
                id: 'grp-industrial',
                label: 'Industriegebieden',
                color: '#a39382',
                checked: true,
                layerIds: ['landuse_industrial']
            },
            {
                id: 'grp-aviation',
                label: 'Luchthavens',
                color: '#576574',
                checked: true,
                layerIds: ['aeroway_runway', 'aeroway_taxiway']
            },
            {
                id: 'grp-ferries',
                label: 'Veerroutes',
                color: '#54a0ff',
                checked: true,
                layerIds: ['roads_ferry']
            }
        ]
    }
];

const API_KEY = "d42e766a567023ee";
const STYLE_URL = `https://api.protomaps.com/styles/v5/light/en.json?key=${API_KEY}`;

const map = new maplibregl.Map({
    container: 'map',
    style: STYLE_URL,
    center: [28.9784, 41.0082],
    zoom: 12,
    hash: true
});