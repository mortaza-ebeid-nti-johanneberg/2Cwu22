let post00 = {
    categories: ["story", "milestone"],
    contents: "lorem lorem ipsum bananas"
}

let post01 = {
    categories: ["graphics"],
    contents: "ray-traced bananas will be added to the game"
}

let post02 = {
    categories: ["bugs", "graphics"],
    contents: "bananas not working"
}

const posts = [post00, post01, post02]

// Creates array with all categories from posts with no doubles
function createCategoriesArr() {
    // Create array 'categories' with all the different post categories
    let categories = [posts[0].categories[0]]

    // Go through all posts
    for (let i = 0; i < posts.length; i++) {

        // Go through all categories for each post
        for (let s = 0; s < posts[i].categories.length; s++) {
            let isInArr = false

            // Go through all categories in categories array, adds category if not in array already
            for (let t = 0; t < categories.length; t++) {            
                if (categories[t] == posts[i].categories[s]) {
                    isInArr = true
                    break
                }
            }

            if (!isInArr) categories.push(posts[i].categories[s]);
        }
    }

    return categories
}

function createListEntries() {
    // Create list and nest in list section
    const roadmapTextSection = document.getElementById('roadmapTextSection')
    const list = document.createElement('ul')
    list.classList.add('roadmapList')
    roadmapTextSection.appendChild(list)

    // Create list entry elements, add category classes, and nest in list
    for (let i = 0; i < posts.length; i++) {

        // Create list entry
        listEntry = document.createElement('li')
        listEntry.innerText = posts[i].contents.toLowerCase()

        // Add classes/categories
        listEntry.classList.add('listEntry')
        for (let t = 0; t < posts[i].categories.length; t++) {
            listEntry.classList.add(posts[i].categories[t].toLowerCase())
        }

        // Nest
        list.appendChild(listEntry)
    }
}

function createSidebarButtons() {
    // Create sidebar buttons for cateogories + "all" category
    const sidebar = document.querySelector('.sidebar')

    // Add buttons and eventlisteners
    for (let i = 0; i < categories.length; i++) {

        // HTML FORMAT:
        // <button type="button" id="allButton" class="sidebarButton">
        //     <p class="buttonText">all</p>
        // </button>

        // Button element creation
        let sidebarButton = document.createElement('button')
        sidebarButton.type = 'button'
        sidebarButton.classList.add('sidebarButton')
        sidebarButton.setAttribute('id', categories[i].toLowerCase() + 'Id')

        let buttonText = document.createElement('p')
        buttonText.classList.add('buttonText')
        buttonText.innerText = categories[i].toLowerCase()

        // Nesting
        sidebarButton.appendChild(buttonText);
        sidebar.appendChild(sidebarButton);

        // Eventlisteners
        sidebarButton.addEventListener('click', () => {
            // if (document.querySelector('.selected') == allButton) {
            //     selectedCategories.pop()
            //     allButton.classList.remove('selected')
            // }
            

            if (sidebarButton.classList.contains('selected')) {
                selectedCategories = selectedCategories.filter(category => category != categories[i])
            }
            else selectedCategories.push(categories[i]);
            
            recalculateSelected()
            sidebarButton.classList.toggle('selected')
        })
    }

    allButton.addEventListener('click', () => {
        if (document.querySelector('.selected') == allButton) {
            selectedCategories = selectedCategories.filter(category => category != "all")
            allButton.classList.remove('selected')
        }
        else {
            selectedCategories.push("all")
            allButton.classList.add('selected')
        }

        recalculateSelected()
    })
}

function recalculateSelected() {
    console.log(selectedCategories)

    if (selectedCategories.includes("all")) {
        for (let i = 0; i < posts.length; i++) {
            listEntries[i].classList.add('show')
        }
    }

    else {
        for (let i = 0; i < posts.length; i++) {
            let isSelected = false
            for (let t = 0; t < posts[i].categories.length; t++) {
                for (let s = 0; s < selectedCategories.length; s++) {
                    if (posts[i].categories[t] == selectedCategories[s]) {
                        isSelected = true
                        break
                    }
                }
            }
            if (isSelected) listEntries[i].classList.add('show');
            else listEntries[i].classList.remove('show');
        }
    }
}

// Setup Startup state (all button selected and element added to list)
var selectedCategories = ["all"]
const sidebar = document.querySelector('.sidebar')
const allButton = document.createElement('button')
allButton.classList.add('sidebarButton', 'selected')

let allButtonText = document.createElement('p')
allButtonText.classList.add('buttonText')
allButtonText.innerText = "all"

allButton.appendChild(allButtonText)
sidebar.appendChild(allButton)
sidebar.appendChild(allButton)

// magic
var categories = createCategoriesArr()
createListEntries()
listEntries = document.querySelector('.roadmapList').childNodes
createSidebarButtons()
recalculateSelected()


/*
Something like this:
// create all content items with category classes
// create arrays with elements (list items) for corresponding buttons/categories
// "toggle" .show when button is pressed
// (
// in css: 
// .roadmapItem {display: none;}
// .roadmapItem.show {display: list-item}
// )
*/
