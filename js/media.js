/*
this program works like this:
- takes an array of objects (post/article information) with 'image path' string, 'alt tag' string, and 'caption' string
- THIS SHOULD BE DELETED IN THE FINAL PRODUCT: CREATES DUMMY ARTICLES
- run a setColumns function on startup and every window resize event to calculate amount of columns (int) needed
- on startup and window resize run generateMasonry function, takes in 'columns' int and 'articles' object array (array of all posts)
- generates masonry grid: creates needed html elements, adds classes, and nests them
*/

pic00 = {
    image: "img/guitarGuyCompressed.jpg",
    alt: "this is a black and white picture of an average looking blond guy looking down while holding a guitar in front of him but a little to the side, and the picture is taken from the front",
    caption: "guitar guy"
}

pic01 = {
    image: "img/neonSignCompressed.jpg",
    alt: "a wide lens picture of a neon sign surrounded by complete darkness that spells Franks, open late, and has a big arrow attached that points to the building",
    caption: "neon sign"
}

pic02 = {
    image: "img/plantCompressed.jpg",
    alt: "this is a picture of three plants with big dark greenish leafs sitting in a orange pot",
    caption: "plant"
}

pic03 = {
    image: "img/yachtCompressed.jpg",
    alt: "this is a picture of a yacht taken from on said yacht, with a narrow view of the sea, sky, and very saturated and fun colors",
    caption: "yacht"
}

const media = [pic00, pic01, pic02, pic03]

// Creates dummy articles (THIS SHOULD BE REMOVED)
for (let i = 5; i < 20; i += 1) media[i] = media[0];
for (let i = 4; i < 20; i += 3) media[i] = media[1];
for (let i = 6; i < 20; i += 2) media[i] = media[2];
for (let i = 7; i < 20; i += 4) media[i] = media[3];


// Generate Masonry
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
            masonryItem.classList.add('masonryItem')

            let articleImgDiv = document.createElement('div');
            articleImgDiv.classList.add('articleImgDiv');

            let articleImg = document.createElement('img');
            articleImg.classList.add('articleImg');
            articleImg.src = article.image;
            articleImg.alt = article.alt;

            let overlay = document.createElement('div');
            overlay.classList.add('overlay');

            let overlayText = document.createElement('p');
            overlayText.classList.add('overlayText');
            overlayText.innerText = (article.caption).toLowerCase();


            /*
            column
                masonryItem
                    articleImgDiv
                        articleImg
                    overlay
                        overlayText
                        
                masonryItem
                .
                .
                .
            */

            // Nesting
            masonryItem.appendChild(articleImg);

            overlay.appendChild(overlayText);
            masonryItem.appendChild(overlay);

            // Nest article in column
            column.appendChild(masonryItem);
        })

        // Nest column in masonry grid/main
        masonry.appendChild(column);
    }
}

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

    generateMasonry(columns, media);
}

// Creates masonry/articles on start
setColumns();
generateMasonry(columns, media);

// If window is resized: recalculate columns 
window.addEventListener("resize", setColumns);
