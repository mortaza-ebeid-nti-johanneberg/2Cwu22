let text0 = "Word. word word word Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
const article0 = {
    title: "first article",
    date: [1985, 12, 10],
    image: "img/colossalMonkey.jpg",
    categories: ["milestone", "plans"],
    content: text0
}

let text1 = "This is also a test! Vulputate eget, arcu. In enim justo, rhoncus ut. Word"
const article1 = {
    title: "second it is!",
    date: [2004, 8, 6],
    image: "img/colossalMonkey.jpg",
    categories: ["lighting", "storyboard"],
    content: text1
}

let text2 = "The blue pill will grant you unfathomable power, the red will make you invisible. Quis, feugiat a, tellus. Phasellus viverra nulla ut. Word"
const article2 = {
    title: "third will you take the blue pill or the red pill?",
    date: [2016, 1, 1],
    image: "img/colossalMonkey.jpg",
    categories: ["plans", "summary"],
    content: text2
}

let text3 = "Word. Word What you're reading is text, and this is a test. Metus varius laoreet. Quisque rutrum. Aenean imperdiet."
const article3 = {
    title: "fourth article",
    date: [2021, 11, 23],
    image: "img/colossalMonkey.jpg",
    categories: ["characters", "music", "sound design"],
    content: text3
}

const articles = [article0, article1, article2, article3];

// Create searchResults array and fill with objects: {id: ${index}, relevence: 0, date: []}
function resetSearchResults() {
    let searchResults = [];
    for (let i = 0; i < articles.length; i++) {
        obj = {id: i, relevence: 0, date: []};
        searchResults.push(obj);
    }

    return searchResults;
}

function search(searchTerm) {
    // Reset searchResults
    searchResults = [];
    for (let i = 0; i < articles.length; i++) {
        obj = {id: i, relevence: 0, date: []};
        searchResults.push(obj);
    }

    // Make array of search terms
    let splicedTerms = searchTerm.toLowerCase().split(/[\s,!/]+/);
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
            let content = articles[i].content.toLowerCase().split(/[\s.,!/]+/);
            let title = articles[i].title.toLowerCase().split(/[\s.,!/]+/);
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

    return searchResults;
}

// Sort by relevence
function sortByRelevence(searchResults) {
    return searchResults.sort((a, b) => b.relevence - a.relevence);
}

// Sort by newest
function sortByNewest(searchResults) {
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

    return searchResults
}

// Sort by oldest
function sortByOldest(searchResults) {
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

    return searchResults
}

// Generate dummy posts
function generateDummyPosts(amount) {
    let articles = [];
    for (let i = 0; i < amount; i++) {
        let item = {
            title: `title${i}`,
            image: "img/colossalMonkey.jpg",
            content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
            date: [2021, 8, 6],
            categories: ["lighting", "plans", "Milestone"]
        }

        articles.push(item);
    }

    return articles
}

// Generate masonry
function generateMasonryGrid(columns, articles) {
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
            masonryItem.classList.add('masonryItem')

            let articleImgDiv = document.createElement('div');
            articleImgDiv.classList.add('articleImgDiv');

            let articleImg = document.createElement('img');
            articleImg.classList.add('articleImg');
            articleImg.src = article.image;

            let articleText = document.createElement('div');
            articleText.classList.add('articleText');

            let articleDate = document.createElement('p');
            articleDate.classList.add('articleDate');
            let stringDate = new Array(1).fill(String(article.date[0]))
            for (let t = 1; t < article.date.length; t++) {
                if (article.date[t] > 9) stringDate.push(String(article.date[t]));
                else stringDate.push("0" + String(article.date[t]));
            }
            articleDate.innerHTML = stringDate.join("-");

            let articleTitle = document.createElement('p');
            articleTitle.classList.add('articleTitle');
            articleTitle.innerText = article.title;

            let articleContent = document.createElement('p');
            articleContent.classList.add('articleContent');
            articleContent.innerText = article.content;

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

let searchResults = resetSearchResults();
console.log(searchResults);

searchResults = search("Word");
console.log(searchResults);

searchResults = sortByRelevence(searchResults);
console.log(searchResults);

searchResults = sortByNewest(searchResults);
console.log(searchResults);

searchResults = sortByOldest(searchResults);
console.log(searchResults);

searchResults = resetSearchResults();
console.log(searchResults);


let filteredArticles = []
for (let i = 0; i < searchResults.length; i++) {
    filteredArticles.push(articles[searchResults[i].id])
}
console.log(filteredArticles)

generateMasonryGrid(3, filteredArticles);
