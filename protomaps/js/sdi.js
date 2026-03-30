function updateMap() {
    const selection = document.getElementById('infra-select').value;
    
    MAP_CONFIG.forEach(item => {
        const isVisible = (selection === 'all' || item.id === selection);
        
        item.layerIds.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
                
                if (isVisible) {
                    const type = map.getLayer(layerId).type;
                    if (type === 'line') {
                        map.setPaintProperty(layerId, 'line-color', item.color);
                        if (!layerId.includes('casing')) map.setPaintProperty(layerId, 'line-width', 2.5);
                    } 
                    else if (type === 'fill') {
                        map.setPaintProperty(layerId, 'fill-color', item.color);
                        map.setPaintProperty(layerId, 'fill-opacity', 0.7);
                    }
                }
            }
        });
    });
}

map.on('load', () => {
    // Initialiseer de kaart met de geselecteerde lagen
    updateMap();
    // Luister naar veranderingen in de dropdown
    document.getElementById('infra-select').onchange = updateMap;
});

map.addControl(new maplibregl.NavigationControl());