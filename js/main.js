// article = [Title, Date (year-month-day) , Image-path, Categories-array, Text/Content]
/* indexes:
0 = Title
1 = Date
2 = Image-path
3 = Categories-array
4 = Text
*/


let text0 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
const article0 = ["first article!", [1985, 12, 10], "img/colossalMonkey.jpg", ["milestone", "plans"], text0]

let text1 = "Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut."
const article1 = ["second article", [2004,8,6], "img/colossalMonkey.jpg", ["lighting", "storyboard"], text1]

let text2 = "imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut"
const article2 = ["third article", [2016,1,1], "img/colossalMonket.jpg", ["plans", "summary"], text2]

let text3 = "metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum"
const article3 = ["fourth article", [2021, 11, 23], "img/colossalMonkey.jpg", ["characters", "music", "sound design"], text3]

const articles = [article0, article1, article2]

// get searchResults array (array with indexes of articles in 'articles' array that match with search input)
let searchResults = [0, 1, 3]

for (const index of searchResults) {
    // code that adds css and html for articles in searchResult

    // html

    // create article block with content
    var articleTag = document.createElement("article");

    // add img tag
    var img = document.createElement("img");
    img.href = String( articles[index][2] );

    articleTag.appendChild(img)

    // add title and text tags
    var title = document.createElement("p");
    var titleText = document.createTextNode( String( articles[index][0] ) );
    title.appendChild(titleText)

    var content = document.createElement("p");
    var contentText = document.createTextNode( String( articles[index][4] ) );
    content.appendChild(contentText);

    articleTag.appendChild(title);
    articleTag.appendChild(text);

    // add article block to main section
    var mainElement = document.getElementById("updatesFeedMain");
    mainElement.appendChild(articleTag);


    //css
}