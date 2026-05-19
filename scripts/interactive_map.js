import { TreeSelectMenu } from "./tree_select_menu.js";

export default class InteractiveMap {
    constructor() {
        // Init page elements
        this.map = L.map('map', { zoomControl: false }).setView([-43.532, 172.636], 12);
        this.treeSelect = new TreeSelectMenu();
        
        // Set up Leaflet map features
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 15,
            minZoom: 10,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
    }
}