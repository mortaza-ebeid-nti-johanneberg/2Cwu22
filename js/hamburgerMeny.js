const menuButton = document.querySelector('#menuButton');
menuButton.addEventListener('click', () => {
    //show hamburger menu
    let hamburgerMenu = document.querySelector('#hamburgerMenu');
    hamburgerMenu.classList.add('show');
})

const closeButton = document.querySelector('#closeButton')
closeButton.addEventListener('click', () => {
    //close hamburger menu
    let hamburgerMenu = document.querySelector('#hamburgerMenu');
    hamburgerMenu.classList.remove('show');
})
