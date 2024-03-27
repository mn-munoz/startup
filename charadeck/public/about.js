
// function displayPicture() {
//     fetch('/api/images')
//     .then(response => response.json())
//         .then(data => {
//             const headingImage = document.querySelector('.heading-image');
//             headingImage.style.backgroundImage = `url(${data.imageUrl})`;
//         })
//         .catch(error => {
//             console.error("Error fetching image:", error);
//         });
// }


async function displayPicture() {
    try {
        const res = await fetch("https://api.pexels.com/v1/curated", {
            headers: {
                Authorization: 'a0oTtsCqFPHADv5rg33dEI4FUQEL5reTCdEZnCjD1tcCUN2u6zcF3yy0'
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