const map = new maplibregl.Map({
            container: 'map',
            style: STYLE_URL,
            center: [28.9784, 41.0082], 
            zoom: 12,
            hash: true
        });

function initDashboard() {
    const container = document.getElementById('ui-container');

    MAP_CONFIG.forEach(section => {
        const box = document.createElement('div');
        box.className = 'category-box';
        box.innerHTML = `<h4>${section.category}</h4>`;

        section.layers.forEach(layer => {
            const item = document.createElement('div');
            item.className = 'layer-item';
            item.innerHTML = `
                <input type="checkbox" id="${layer.id}" ${layer.checked ? 'checked' : ''}>
                <div class="color-dot" style="background: ${layer.color};"></div>
                <label for="${layer.id}">${layer.label}</label>
            `;

            item.querySelector('input').addEventListener('change', () => applyLayerState(layer));
            box.appendChild(item);
        });
        container.appendChild(box);
    });
}

function applyLayerState(layerCfg) {
    const isVisible = document.getElementById(layerCfg.id).checked;
    
    layerCfg.layerIds.forEach(id => {
        if (map.getLayer(id)) {
            map.setLayoutProperty(id, 'visibility', isVisible ? 'visible' : 'none');
            
            if (isVisible) {
                const type = map.getLayer(id).type;
                
                // Kleur toepassen op basis van het type laag
                if (type === 'line') {
                    map.setPaintProperty(id, 'line-color', layerCfg.color);
                    if (!id.includes('casing')) map.setPaintProperty(id, 'line-width', 2.5);
                } 
                else if (type === 'fill') {
                    map.setPaintProperty(id, 'fill-color', layerCfg.color);
                    map.setPaintProperty(id, 'fill-opacity', 0.7);
                }
            }
        }
    });
}

map.on('load', () => {
    initDashboard();
    MAP_CONFIG.forEach(section => {
        section.layers.forEach(layer => applyLayerState(layer));
    });
});

map.addControl(new maplibregl.NavigationControl());