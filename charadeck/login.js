let usersData = [];

function login() {
    const userName = document.querySelector("#name").value;
    const password = document.querySelector("#pswd").value

    let loginData = {usrnm : userName, pwd : password}

    usersData.push(loginData);
    
    localStorage.setItem("usersData", usersData);
    window.location.href = "deck.html";
}