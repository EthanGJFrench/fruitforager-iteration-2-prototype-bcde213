import { TreeSelectMenu } from "./tree_select_menu.js";

/**
 * Handles the Interactive Map functionality.
 * 
 * @author: Ethan French
 * @version: 1.0
 */
export default class InteractiveMap {
    
    /**
     * Initalises the InteractiveMap co.
     * 
     * Retrives the selectAllTrees checkbox DOM element.
     * Retrives all of the fruitOption checkbox DOM elements.
     * Adds toggleSelectAll() eventListenter to selectAllTrees checkbox DOM element.
     */
    constructor() {
        // Init map page elements
        this.map = L.map('map', { zoomControl: false }).setView([-43.532, 172.636], 12);
            // Set up Leaflet map features
            L.control.zoom({
                position: 'bottomright'
            }).addTo(this.map)
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 15,
                minZoom: 10,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <br> “FruitForager” &copy; 2026 by <a href="https://github.com/EthanGJFrench">Ethan French</a><br> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/deed.en">CC BY 4.0</a>.',
            }).addTo(this.map)
            
        this.treeSelectMenu = new TreeSelectMenu()

        this.treeSelectMenu.treeFilterForm.addEventListener("submit", (e) => {
            e.preventDefault()
            this.renderTrees()
            // hide select dropdown when submitted
            const DROPDOWNBUTTON = document.getElementById("treeFilterDropdownBtn")
            const DROPDOWN = bootstrap.Dropdown.getOrCreateInstance(DROPDOWNBUTTON)
            DROPDOWN.hide();
        })
    }

    async getGeoJsonPromise() {
        try {
            const TREEGEOJSON = await fetch("../../geojson/tree_mock_data.geojson");
            return await TREEGEOJSON.json();
        } catch (error) {
            console.error("Something went wrong - Cannot get tree GeoJSON data!");
        }
    }

    async renderTrees() {
        const TREEFORMDATA = this.treeSelectMenu.getFormData()
        const TREEDATA = await this.getGeoJsonPromise()

        TREEDATA.features.forEach(tree => {
            this.addTreeToMap(tree)
        })
    }

    addTreeToMap(tree) {
        const [lng, lat] = tree.geometry.coordinates;
        L.marker([lat, lng]).addTo(this.map)
    }
}