pic00 = {
    image: "img/colossalMonkey.jpg",
    alt: "this is a picture of a big monkey plush toy",
    caption: "banana"
}

const media = [pic00]

// Creates dummy articles
for (let i = 1; i < 20; i++) media[i] = media[0];

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
