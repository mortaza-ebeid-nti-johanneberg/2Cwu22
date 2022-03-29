let text0 = "Word. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
const article0 = {
    title: "first article",
    date: [1985, 12, 10],
    image: "img/colossalMonket.jpg",
    categories: ["milestone", "plans"],
    content: text0
}

let text1 = "This is also a test! Vulputate eget, arcu. In enim justo, rhoncus ut. Word"
const article1 = {
    title: "it is!",
    date: [2004, 8, 6],
    image: "img/colossalMonket.jpg",
    categories: ["lighting", "storyboard"],
    content: text1
}

let text2 = "The blue pill will grant you unfathomable power, the red will make you invisible. Quis, feugiat a, tellus. Phasellus viverra nulla ut. Word"
const article2 = {
    title: "will you take the blue pill or the red pill?",
    date: [2016, 1, 1],
    image: "img/colossalMonket.jpg",
    categories: ["plans", "summary"],
    content: text2
}

let text3 = "What you're reading is text, and this is a test. Metus varius laoreet. Quisque rutrum. Aenean imperdiet."
const article3 = {
    title: "fourth article",
    date: [2021, 11, 23],
    image: "img/colossalMonkey.jpg",
    categories: ["characters", "music", "sound design"],
    content: text3
}

const articles = [article0, article1, article2, article3];

const titleIndex = 0;
const dateIndex = 1;
const imageIndex = 2;
const categoryIndex = 3;
const contentIndex = 4;

// let searchResults = articles;

// Create searchResults array and fill with objects {id: index, relevence: 0, date: []}
function resetSearchResults() {
    let searchResults = []
    for (let i = 0; i < articles.length; i++) {
        obj = {id: i, relevence: 0, date: []};
        searchResults.push(obj);
    }
    return searchResults
}

let searchResults = resetSearchResults();

console.log(searchResults);

function filterArticles(searchTerm) {
    //searchResults = [];
    // Reset searchResults
    searchResults = [];
    for (let i = 0; i < articles.length; i++) {
        obj = {id: i, relevence: 0, date: []};
        searchResults.push(obj);
    }

    // Make array of search terms
    let searchTerms = searchTerm.toLowerCase().split(/[\s,!/]+/);

    // For each term: search for matches
    searchTerms.forEach(term => {
        // For each article: search for matches
        for (let i = 0; i < articles.length; i++) {

            // Splits information into arrays to go through
            let content = articles[i].content.toLowerCase().split(/[\s,!/]+/);
            let title = articles[i].title.toLowerCase().split(/[\s,!/]+/);
            let categories = articles[i].categories
            let date = articles[i].date

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
                if (term == categories[t].toLowerCase()) {
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

console.log(filterArticles("Word"));

//console.log("test 123! hello/hi".split(/[\s,!/]+/));

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

let filteredArticles = generateDummyPosts(15);

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
        let column = document.createElement('div');
        column.classList.add('column');
        let columnArticles = columnWrappers[`column${i}`];

        columnArticles.forEach(article => {
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
            let stringDate = new Array(1).fill(article.date[0])
            for (let t = 0; t < article.date.length; t++) {
                
            }
            articleDate.innerHTML = 

            let articleTitle = document.createElement('p');
            articleTitle.classList.add('articleTitle');
            articleTitle.innerText = article.title;

            let articleContent = document.createElement('p');
            articleContent.classList.add('articleContent');
            articleContent.innerText = article.content;

            articleImgDiv.appendChild(articleImg);
            masonryItem.appendChild(articleImgDiv);

            articleText.appendChild(articleTitle);
            articleText.appendChild(articleContent);
            masonryItem.appendChild(articleText);
            column.appendChild(masonryItem);
        })

        masonry.appendChild(column);
    }
}

generateMasonryGrid(4, filteredArticles);
*/