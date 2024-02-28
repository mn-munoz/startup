let usersData = [];

function login() {
    const userName = document.querySelector("#name").value;
    const password = document.querySelector("#pswd").value;
    const loginData = {usrnm : userName, pwd : password};

    const usersDataText = localStorage.getItem('usersData');

    if (usersDataText) {
        usersData = JSON.parse(usersDataText);
    }

    usersData.push(loginData);

    localStorage.setItem('usersData', JSON.stringify(usersData));
    window.location.href = "deck.html";
}