function getUser () {
    username = localStorage.getItem('user');
}

function addCard() {
    const deck = document.querySelector('.card-deck');

    let charName = prompt("Give a name to your character", "Enter name");
    let birthday = prompt(`What is ${charName}'s Birthday?`, `Enter birthday`);

    // I know this is like bad code I promise I will fix it. Same with the dislikes

    let likeOne = prompt("What does your character like? (1/3", "Enter name");
    let likeTwo = prompt("What does your character like? (2/3", "Enter name");
    let likeThree = prompt("What does your character like? (3/3", "Enter name");

    let dislikeOne = prompt("What dos your character hate? (1/2)");
    let dislikeTwo = prompt("What dos your character hate? (2/2)");

    deck.innerHTML = deck.innerHTML + `<div class="card"> <div class="card-inner"> <div class="card-front"></div><div class="card-back"><div class="card-body"><h2 class="char-name">${charName}</h2><p>${birthday}</p><h3>Like</h3><ul class="likes"><li>${likeOne}</li><li>${likeTwo}</li><li>${likeThree}</li></ul><h3>Dislikes</h3><ul class="dislikes"><li>${dislikeOne}</li><li>${dislikeTwo}</li></ul></div></div></div></div>`

    
}

function loadCards() {

}