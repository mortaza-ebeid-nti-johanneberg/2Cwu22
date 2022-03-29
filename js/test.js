let itemsArray = [
    ["jason", 1],
    ["jeff", 5],
    ["arnold", 5],
    ["bella", 4],
    ["daniel", 0]
]

itemsArray = itemsArray.sort(function compareFn(a, b) {
    return b[1] - a[1];
})

console.log(itemsArray);

console.log("a" == "A".toLowerCase());