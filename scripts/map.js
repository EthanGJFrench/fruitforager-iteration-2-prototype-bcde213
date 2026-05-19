// Init map
var map = L.map('map', { zoomControl: false }).setView([-43.532, 172.636], 12);

// Add zoom controls to bottom right of page
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Add OpenStreetMap tile
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    minZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// class InteractiveMap {
//     constructor() {
         
//     }
// }