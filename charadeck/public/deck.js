function getUser () {
    username = localStorage.getItem('user');
    return username;
}

function addCard() {
    let cards = [];
    let usersData = [];
    let userCards = {usnm: null, crds: null};
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


    let usersDecks = localStorage.getItem('Decks');
    let decks = [];

    if (usersDecks) {
        decks = JSON.parse(usersDecks);
        usersData = decks;

        usersData.forEach(deck => {
            if (deck.usnm === getUser()) {
                cards = deck.crds;
            }
        });
    }
    
    card = {chrn : charName, bd: birthday , l1: likeOne, l2: likeTwo, l3: likeThree, d1: dislikeOne, d2: dislikeTwo};
    cards.push(card);

    let found = false;

    usersData.forEach(deck => {
        if (deck.usnm === getUser()) {
            deck.crds = cards;
            found = true;
        }
    });

    if (!found) {
        userCards.usnm = getUser();
        userCards.crds = cards;
        usersData.push(userCards);
        
    }

    localStorage.setItem('Decks', JSON.stringify(usersData));
    
}
