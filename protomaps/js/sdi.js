function updateMap() {
    const selection = document.getElementById('infra-select').value;
    
    // We loopen door de platte lijst in config.js
    MAP_CONFIG.forEach(layerCfg => {
        const isVisible = (selection === 'all' || layerCfg.id === selection);
        
        layerCfg.layerIds.forEach(layerId => {
            // CRUCIAAL: Check of de laag wel bestaat in de huidige stijl
            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', isVisible ? 'visible' : 'none');
                
                if (isVisible) {
                    const type = map.getLayer(layerId).type;
                    if (type === 'line') {
                        map.setPaintProperty(layerId, 'line-color', layerCfg.color);
                    } else if (type === 'fill') {
                        map.setPaintProperty(layerId, 'fill-color', layerCfg.color);
                    }
                }
            }
        });
    });
}

function initLegend() {
    const legendDiv = document.getElementById('legend');
    if (!legendDiv) return;
    legendDiv.innerHTML = '<h4>Operational Legend</h4>';
    MAP_CONFIG.forEach(layer => {
        const item = document.createElement('div');
        item.style.marginBottom = '5px';
        item.innerHTML = `<i style="background: ${layer.color}"></i> ${layer.label}`;
        legendDiv.appendChild(item);
    });
}

// MapLibre event handler
map.on('load', () => {
    console.log("Kaart geladen, initialiseer interface...");
    initLegend();
    updateMap();
    document.getElementById('infra-select').onchange = updateMap;
});

// Foutafhandeling voor de kaart zelf
map.on('error', (e) => {
    console.error("MapLibre Error:", e.error.message);
});