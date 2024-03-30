function getUser () {
    username = localStorage.getItem('userName');
    return username;
}

async function addCard () {
    try {
        const username = getUser(); // Assuming this function gets the username from localStorage
        const card = {
            charName: prompt("Give a name to your character", "Enter name"),
            birthday: prompt(`What is your character's Birthday?`, `Enter birthday`),
            likeOne: prompt("What does your character like? (1/3)", "Enter name"),
            likeTwo: prompt("What does your character like? (2/3)", "Enter name"),
            likeThree: prompt("What does your character like? (3/3)", "Enter name"),
            dislikeOne: prompt("What does your character hate? (1/2)"),
            dislikeTwo: prompt("What does your character hate? (2/2)")
        };
 
        const resp = await fetch('/api/decks/cards/addCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, card }),
        });

        console.log(await resp);
        if (!resp.ok) {
            throw new Error("Network Response was not succesful");
        }

        saveDecksLocal(username,card );
        updateHTML(card);

    } catch(error) {
        console.error("POST request not succesfull", error.message);
    }

}

function updateHTML(card) {
    const deck = document.querySelector('.card-deck');

    let cardHTML = `
        <div class="card">
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <div class="card-body">
                        <h2 class="char-name">${card.charName}</h2>
                        <p>${card.birthday}</p>
                        <h3>Like</h3>
                        <ul class="likes">
                            <li>${card.likeOne}</li>
                            <li>${card.likeTwo}</li>
                            <li>${card.likeThree}</li>
                        </ul>
                        <h3>Dislikes</h3>
                        <ul class="dislikes">
                            <li>${card.dislikeOne}</li>
                            <li>${card.dislikeTwo}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    deck.innerHTML = cardHTML +  deck.innerHTML;
}

function saveDecksLocal(username, card) {
    let decks = JSON.parse(localStorage.getItem('decks')) || {};

    if (!decks[username]) {
        decks[username] = [];
    }

    decks[username].push(card);

    localStorage.setItem('decks', JSON.stringify(decks));
}