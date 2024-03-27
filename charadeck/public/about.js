const config = fetch('/api/config');

async function displayPicture() {
    try {
        const res = await fetch("https://api.pexels.com/v1/curated", {
            headers: {
                Authorization: config.authorization
            }
        })
        const data = await res.json();

        console.log(data);

        const random = Math.floor(Math.random() * 15);
        const img = data.photos[random].src.large;

        let heading = document.querySelector('.heading-image');
        heading.style.backgroundImage = `url(${img})`;
    } catch (error) {
        console.error("Error when getting picture:", error);
    }
}
displayPicture();