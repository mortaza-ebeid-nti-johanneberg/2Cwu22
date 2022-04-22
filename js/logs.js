/*
this program works like this:
- each log is an object and contains the following:
'title' string
'date' int array
'image path' string
'image alt tag' string
'categories' string array
'contents' string

- put logs in array called articles
- create searchResults array with objects for every log, searchResults contains:
'log index (in articles array)' int
'relevance points' int
'date' empty array (for now)

- add eventlistener to window resize and recalculate 'column' int value everytime window is resized (runs on start too)

- add eventlisteneres and when search, run searchData function that adds relevance points and date to different logs depending on results
- run sortByRelevance function, then deleteIrrelevant
- (there should be a choice on the website for what to sort by and there are functions to do so but functionality has not been added yet)
- feed filtered/searched logs array (filteredArticles) into generateMasonry function

- generateMasonry takes in: 'columns' int & 'articles' array with objects
- generates all HTML elements, adds classes, and handles nesting
- run generateMasonry after every window resize and search input
*/

let text0 = "Word. word word word Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
const article0 = {
    title: "first article",
    date: [1985, 12, 10],
    image: "img/guitarGuyCompressed.jpg",
    alt: "this is a black and white picture of an average looking blond guy looking down while holding a guitar in front of him but a little to the side, and the picture is taken from the front",
    categories: ["milestone", "plans"],
    content: text0
}

let text1 = "This is also a test! Vulputate eget, arcu. In enim justo, rhoncus ut. Word"
const article1 = {
    title: "second it is!",
    date: [2004, 8, 6],
    image: "img/neonSignCompressed.jpg",
    alt: "a wide lens picture of a neon sign surrounded by complete darkness that spells Franks, open late, and has a big arrow attached that points to the building",
    categories: ["lighting", "storyboard"],
    content: text1
}

let text2 = "The blue pill will grant you unfathomable power, the red will make you invisible. Quis, feugiat a, tellus. Phasellus viverra nulla ut. Word"
const article2 = {
    title: "third. will you take the blue pill or the red pill?",
    date: [2016, 1, 1],
    image: "img/plantCompressed.jpg",
    alt: "this is a picture of three plants with big dark greenish leafs sitting in a orange pot",
    categories: ["plans", "summary"],
    content: text2
}

let text3 = "Word. Word What you're reading is text, and this is a test. Metus varius laoreet. Quisque rutrum. Aenean imperdiet."
const article3 = {
    title: "fourth article",
    date: [2021, 11, 23],
    image: "img/yachtCompressed.jpg",
    alt: "this is a picture of a yacht taken from on said yacht, with a narrow view of the sea, sky, and very saturated and fun colors",
    categories: ["big-fix"],
    content: text3
}

const articles = [article0, article1, article2, article3, article1, article0, article3, article1];

var searchResults;
var columns;

// Create searchResults array and fill with objects: {id: ${index}, relevence: 0, date: []}
function resetSearchResults() {
    searchResults = [];
    for (let i = 0; i < articles.length; i++) {
        obj = {id: i, relevence: 0, date: []};
        searchResults.push(obj);
    }
}

// Takes in searchTerm and checks each article for matches
// (adds relevence points and date to searchResults)
function searchData(searchTerm) {
    // Reset searchResults
    resetSearchResults();

    // Make array of search terms
    let splicedTerms = searchTerm.toLowerCase().split(/[\s,\-_"#%()+*^|><@$&=~?!/]+/);
    let searchTerms = [];

    // Remove empty strings: ""
    for (let i = 0; i < splicedTerms.length; i++) {
        if (splicedTerms[i] != "") searchTerms.push(splicedTerms[i]);
    }

    // For each term: search for matches
    searchTerms.forEach(term => {
        // For each article: search for matches
        for (let i = 0; i < articles.length; i++) {

            // Splits information into arrays to go through
            let content = articles[i].content.toLowerCase().split(/[\s,\-_"#%()+*^|><@$&=~?!/]+/);
            let title = articles[i].title.toLowerCase().split(/[\s,\-_"#%()+*^|><@$&=~?!/]+/);
            let categories = articles[i].categories.map(element => element.toLowerCase());
            let date = articles[i].date;

            // content search
            for (let t = 0; t < content.length; t++) {
                if (term == content[t]) {
                    searchResults[i].relevence++;
                    searchResults[i].date = date;
                }
            }


            // title search
            for (let t = 0; t < title.length; t++) {
                if (term == title[t]) {
                    searchResults[i].relevence++;
                    searchResults[i].date = date;
                }
            }

            // categories search
            for (let t = 0; t < categories.length; t++) {
                if (term == categories[t]) {
                    searchResults[i].relevence++;
                    searchResults[i].date = date;
                }
            }

            // date search
            for (let t = 0; t < date.length; t++) {
                if (term == date[t]) {
                    searchResults[i].relevence++;
                    searchResults[i].date = date;
                }
            }
        }
    })
}

// Sort by relevence
function sortByRelevence() {
    searchResults = searchResults.sort((a, b) => b.relevence - a.relevence);
}

// Sort by newest
function sortByNewest() {
    for (let i = 0; i < searchResults.length; i++) {
        let stringDate = searchResults[i].date[0];
        for (let t = 1; t < searchResults[i].date.length; t++) {
            if (searchResults[i].date[t] > 9) stringDate += String(searchResults[i].date[t]);
            else stringDate += "0" + String(searchResults[i].date[t]);
        }
        searchResults[i].date = stringDate;
    }

    searchResults = searchResults.sort((a, b) => b.date - a.date);
    
    for (let i = 0; i < searchResults.length; i++) {
        let arrayDate = new Array(1).fill(parseInt(searchResults[i].date.substr(0, 4)));
        arrayDate.push(parseInt(searchResults[i].date.substr(4, 2)));
        arrayDate.push(parseInt(searchResults[i].date.substr(6, 2)));
        searchResults[i].date = arrayDate;
    }
}

// Sort by oldest
function sortByOldest() {
    for (let i = 0; i < searchResults.length; i++) {
        let stringDate = searchResults[i].date[0];
        for (let t = 1; t < searchResults[i].date.length; t++) {
            if (searchResults[i].date[t] > 9) stringDate += String(searchResults[i].date[t]);
            else stringDate += "0" + String(searchResults[i].date[t]);
        }
        searchResults[i].date = stringDate;
    }

    searchResults = searchResults.sort((a, b) => a.date - b.date);
    
    for (let i = 0; i < searchResults.length; i++) {
        let arrayDate = new Array(1).fill(parseInt(searchResults[i].date.substr(0, 4)));
        arrayDate.push(parseInt(searchResults[i].date.substr(4, 2)));
        arrayDate.push(parseInt(searchResults[i].date.substr(6, 2)));
        searchResults[i].date = arrayDate;
    }
}

// Deletes elements that have no matches with search term
function deleteIrrelevant() {
    while (searchResults[searchResults.length - 1].relevence < 1) searchResults.pop();
}


// Generate dummy posts
// function generateDummyPosts(amount) {
//     let articles = [];
//     for (let i = 0; i < amount; i++) {
//         let item = {
//             title: `title${i}`,
//             image: "img/colossalMonkey.jpg",
//             content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
//             date: [2021, 8, 6],
//             categories: ["lighting", "plans", "Milestone"]
//         }

//         articles.push(item);
//     }

//     return articles
// }


// Generate masonry
function generateMasonry(columns, articles) {
    const masonry = document.querySelector('.masonry');
    masonry.innerHTML = '';

    // Stores arrays that store appropriate articles for each column
    let columnWrappers = {};
    for (let i = 0; i < columns; i++) {
        columnWrappers[`column${i}`] =  []
    }

    // Stores articles in column arrays
    for (let i = 0; i < articles.length; i++) {
        const column = i % columns;
        columnWrappers[`column${column}`].push(articles[i]);
    }

    // Creates html elements
    for (let i = 0; i < columns; i++) {
        // Create columns
        let column = document.createElement('div');
        column.classList.add('column');
        let columnArticles = columnWrappers[`column${i}`];

        // Create and nest html elements
        columnArticles.forEach(article => {
            // Create masonryItems/articles
            let masonryItem = document.createElement('div');
            masonryItem.classList.add('masonryItem');

            let articleImgDiv = document.createElement('div');
            articleImgDiv.classList.add('articleImgDiv');

            let articleImg = document.createElement('img');
            articleImg.classList.add('articleImg');
            articleImg.src = article.image;
            articleImg.alt = article.alt;

            let articleText = document.createElement('div');
            articleText.classList.add('articleText');

            let articleDate = document.createElement('p');
            articleDate.classList.add('articleDate');
            let stringDate = new Array(1).fill(String(article.date[0]));
            for (let t = 1; t < article.date.length; t++) {
                if (article.date[t] > 9) stringDate.push(String(article.date[t]));
                else stringDate.push("0" + String(article.date[t]));
            }
            articleDate.innerHTML = stringDate.join("-");

            let articleTitle = document.createElement('p');
            articleTitle.classList.add('articleTitle');
            articleTitle.innerText = (article.title).toUpperCase();

            let articleContent = document.createElement('p');
            articleContent.classList.add('articleContent');
            articleContent.innerText = (article.content[0]).toUpperCase() + (article.content.substr(1)).toLowerCase();

            let articleCategories = document.createElement('p');
            articleCategories.classList.add('articleCategories');
            articleCategories.innerHTML = article.categories.map(element => element.toLowerCase()).join(", ");

            /*
            column
                masonryItem
                    articleImgDiv
                        articleImg
                    articleText
                        articleDate
                        articleTitle
                        articleContent
                        articleCategories
                
                masonryItem
                .
                .
                .
            */

            // Nesting
            articleImgDiv.appendChild(articleImg);
            masonryItem.appendChild(articleImgDiv);

            articleText.appendChild(articleDate);
            articleText.appendChild(articleTitle);
            articleText.appendChild(articleContent);
            articleText.appendChild(articleCategories);
            masonryItem.appendChild(articleText);

            // Nest article in column
            column.appendChild(masonryItem);
        })

        // Nest column in masonry grid/main
        masonry.appendChild(column);
    }
}

// Equal to articles for startup (print out all logs with no filtering on startup)
var filteredArticles = articles;

// Recalculates columns (and redraws masonry)
function setColumns() {
    let screenWidth = window.innerWidth;

    let firstBound = 600;
    let secondBound = 900;
    let thirdBound = 1100;
    let fourthBound = 1300;

    if (screenWidth <= firstBound) columns = 1;
    else if (screenWidth > firstBound && screenWidth <= secondBound) columns = 2;
    else if (screenWidth > secondBound && screenWidth <= thirdBound) columns = 3;
    else if (screenWidth > thirdBound && screenWidth <= fourthBound) columns = 4;
    else columns = Math.ceil(screenWidth / 300);

    generateMasonry(columns, filteredArticles);
}

// Creates masonry/articles on start
setColumns();
generateMasonry(columns, filteredArticles);

// If window is resized: recalculate columns 
window.addEventListener("resize", setColumns);

// If enter button is pressed && searchBar is in focus: filter/search articles
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        updateSearch();
    }
})

// If search button is pressed: filter/search articles
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", updateSearch)

function updateSearch() {
    let input = document.getElementById('searchBar').value;

    if (input != "") {
        // Create searchResults var
        resetSearchResults();

        // Add relevences points and date to searchResults
        searchData(String(input));

        // Articles with most relevence points first
        sortByRelevence();

        if (searchResults[0].relevence == 0) generateMasonry(columns, []);
        else {
            // Delete articles with 0 relevence points
            deleteIrrelevant();

            // Setup filteredArticles var to feed Masonry function
            filteredArticles = []
            for (let i = 0; i < searchResults.length; i++) {
                filteredArticles.push(articles[searchResults[i].id])
            }

            // Generate Masonry grid and HTML elements (articles)
            generateMasonry(columns, filteredArticles);
        }
    }
    // If searchTerm == empty: show all article
    else generateMasonry(columns, articles);
}
