/** 
 * Handles the fruit filter selection functionality.
 * 
 * @author: Ethan French
 * @version: 1.0
 */
export class TreeSelectMenu {
    /**
     * Initalises the tree select menu.
     * 
     * Retrives the selectAllTrees checkbox DOM element.
     * Retrives all of the fruitOption checkbox DOM elements.
     * Adds toggleSelectAll() eventListenter to selectAllTrees checkbox DOM element. 
     */
    constructor() {
        this.selectAllTrees = document.getElementById("selectAllTreesCheck")
        this.fruitOptions = document.querySelectorAll(".ff-fruit-option-check")

        this.selectAllTrees.addEventListener("change", () => {
            this.toggleSelectAll()
        })
    }

    /**
     * Toggles all fruit option checkboxes to make current state of selectAllTrees checkbox.
     */
    toggleSelectAll() {
        this.fruitOptions.forEach(fruitOptionCheckbox => {
            fruitOptionCheckbox.checked = this.selectAllTrees.checked
        });
    }
}