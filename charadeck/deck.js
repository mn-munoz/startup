function getUser () {
    username = localStorage.getItem('user');
}

function addCard() {
    const deck = document.querySelector('.card-deck');

    deck.innerHTML = deck.innerHTML + '<div class="card"> <div class="card-inner"> <div class="card-front"></div><div class="card-back"><div class="card-body"><h2>Character Name</h2><p>Birthday idk</p><h3>Like</h3><ul class="likes"><li>idk</li><li>idk</li><li>idk</li></ul><h3>Dislikes</h3><ul class="dislikes"><li>idk</li><li>idk</li></ul></div></div></div></div>'
}