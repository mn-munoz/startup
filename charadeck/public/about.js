const { response } = require("express");

function displayPicture() {
    fetch("https://api.pexels.com/v1/curated?per_page=1")
    .then((response) => response.json())
    .then (console.log(response));
}

displayPicture();