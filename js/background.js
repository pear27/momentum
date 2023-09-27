const images = [
    "changhui-lee-0CyC5ePmMZQ-unsplash.jpg",
    "changhui-lee-2dPWRb5R_RM-unsplash.jpg",
    "changhui-lee-O7dwrmkqXCg-unsplash.jpg",
    "changhui-lee-oZk492eAgPY-unsplash.jpg",
    "changhui-lee-qX0eUetnjJ8-unsplash.jpg"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

document.getElementById("full").style.backgroundImage = `url(img/${chosenImage})`;