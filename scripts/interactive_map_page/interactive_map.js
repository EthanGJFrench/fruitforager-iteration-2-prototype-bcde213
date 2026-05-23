import { TreeSelectMenu } from "./tree_select_menu.js";

/**
 * Handles the Interactive Map functionality.
 * 
 * @author: Ethan French
 * @version: 1.0
 */
export default class InteractiveMap {
    
    /**
     * Initalises the InteractiveMap.
     * 
     * Retrives the selectAllTrees checkbox DOM element.
     * Retrives all of the fruitOption checkbox DOM elements.
     * Adds toggleSelectAll() eventListenter to selectAllTrees checkbox DOM element.
     */
    constructor() {
        this.map = L.map('map', { zoomControl: false }).setView([-43.532, 172.636], 12);
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
            // select dropdown when submitted
            const DROPDOWN_BUTTON = document.getElementById("treeFilterDropdownBtn")
            const DROPDOWN = bootstrap.Dropdown.getOrCreateInstance(DROPDOWN_BUTTON)
            DROPDOWN.hide();
        })

        this.treeMarkers = []
    }

    normaliseString(string) {
        try {
            return string.replace(/\s+/g, "").toLowerCase()
        }
        catch (error) {
            console.error(`Cannot normalise ${string} of type ${typeof string}`)
        }
    }

    /**
     * Gets the JSON data from tree GeoJSON file. 
     * 
     * Uses a fetch promise to get the GeoJSON data.
     * Console logs an error if the fetch fails.
     * 
     * @returns {object, else console.error} retruns GeoJSON object with tree information, else console error if data cannot be fetched.
     */
    async getGeoJsonPromise() {
        try {
            const TREE_GEOJSON = await fetch("./geojson/tree_mock_data.geojson");
            return await TREE_GEOJSON.json();
        } catch (error) {
            console.error("Something went wrong - cannot get tree GeoJSON data!");
        }  
    }

    getTreeColor(treeType) {
        switch (treeType) {

            case "apple":
                return "red"

            case "apricot":
                return "orange"

            case "crabapple":
                return "crimson"

            case "chestnut":
                return "saddlebrown"

            case "cherry":
                return "deeppink"

            case "olive":
                return "olive"

            case "peach":
                return "blue"

            case "pear":
                return "yellowgreen"

            case "plum":
                return "darkviolet"

            default:
                return "grey"
        }
    }

    addTreeToMap(tree, zoom) {
        const [LNG, LAT] = tree.geometry.coordinates; // get tree cordernates

        switch (this.normaliseString(tree.properties.CommonName)) {// add markers based on 
            case this.normaliseString("apple"): { // if apple
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "red"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("apricot"): { // if apricot
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "orange"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("crabapple"): { // if crabapple
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "crimson"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("chestnut"): { // if chestnut
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "saddlebrown"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("cherry"): { // if cherry
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "deeppink"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("olive"): { // if olive
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "olive"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("peach"): { // if peach
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "blue"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("pear"): { // if pear
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "yellowgreen"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            case this.normaliseString("plum"): { // if plum
                const MARKER = L.circleMarker([LAT, LNG], { 
                    radius: 3,
                    color: "darkviolet"
                }).addTo(this.map)
                this.treeMarkers.push(MARKER)
                break
            }

            default: {
                const MARKER = L.circleMarker([LAT, LNG], {
                    radius: 3,
                    color: 'grey'
                }).addTo(this.map)
                break
            }
        }
    }

    async renderTrees() {
    
        this.treeMarkers.forEach(marker => { // remove existing markers before redrawing map
            this.map.removeLayer(marker)
        })
        
        const TREEFORMDATA = this.treeSelectMenu.getFormData() // get the tree select form data
        
        if (!TREEFORMDATA) { // if there is no form data -> show user an error and return
            console.error('No fruit trees selected!')
            return
        }

        const TREEFORMDATANORMALISED = TREEFORMDATA.map(treeOption => this.normaliseString(treeOption)) // normalise the data by removing white space and changing all characters to lowercase
        const TREEDATA = await this.getGeoJsonPromise()

        TREEDATA.features.forEach(tree => { // Check each tree normalised CommonName property and add tree to map if it exist in formdata
            const TREECOMMONNAME = this.normaliseString(tree.properties.CommonName)  
            if (TREEFORMDATANORMALISED.includes(TREECOMMONNAME)) {
                this.addTreeToMap(tree)
            }
        })
    }
}