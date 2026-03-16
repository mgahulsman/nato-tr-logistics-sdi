const MAP_CONFIG = [
            {
                category: "🚨 Kritieke Infrastructuur",
                layers: [
                    { id: 'grp-bridges', label: 'Bruggen & Viaducten', color: '#e74c3c', checked: true, layerIds: ['roads_bridges_major', 'roads_bridges_link', 'roads_bridges_other', 'roads_bridges_major_casing', 'roads_bridges_link_casing', 'roads_bridges_other_casing'] },
                    { id: 'grp-tunnels', label: 'Tunnels & Onderdoorgangen', color: '#3498db', checked: true, layerIds: ['roads_tunnels_major', 'roads_tunnels_link', 'roads_tunnels_minor', 'roads_tunnels_other', 'roads_tunnels_major_casing', 'roads_tunnels_link_casing', 'roads_tunnels_minor_casing', 'roads_tunnels_other_casing'] },
                    { id: 'grp-piers', label: 'Havens & Piers', color: '#1abc9c', checked: false, layerIds: ['roads_pier'] },
                    { id: 'grp-rail', label: 'Spoorwegen', color: '#9b59b6', checked: false, layerIds: ['roads_rail'] }
                ]
            },
            {
                category: "🏥 Maatschappelijk",
                layers: [
                    { id: 'grp-hospitals', label: 'Ziekenhuizen', color: '#f1c40f', checked: false, layerIds: ['landuse_hospital'] },
                    { id: 'grp-schools', label: 'Onderwijs', color: '#e67e22', checked: false, layerIds: ['landuse_school'] }
                ]
            },
            {
                category: "🗺️ Basis Kaart",
                layers: [
                    { id: 'grp-roads-major', label: 'Hoofdwegen (E80/D100)', color: '#444444', checked: true, layerIds: ['roads_major', 'roads_major_casing_late', 'roads_link', 'roads_link_casing'] },
                    { id: 'grp-roads-minor', label: 'Binnenwegen', color: '#95a5a6', checked: false, layerIds: ['roads_minor', 'roads_minor_service', 'roads_other'] },
                    { id: 'grp-buildings', label: 'Gebouwen', color: '#bdc3c7', checked: true, layerIds: ['buildings'] },
                    { id: 'grp-water', label: 'Waterlichamen', color: '#a2d9ff', checked: true, layerIds: ['water'] },
                    { id: 'grp-green', label: 'Parken & Groen', color: '#2ecc71', checked: false, layerIds: ['landuse_urban_green', 'landuse_park'] }
                ]
            }
        ];

const API_KEY = "d42e766a567023ee";
const STYLE_URL = `https://api.protomaps.com/styles/v5/light/en.json?key=${API_KEY}`;