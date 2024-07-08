let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.gallery-slide img');
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
    });
}

// Function to fetch and display images from img/pictures directory
function fetchImages() {
    fetch('img.json') // Assuming img.json is in the same directory as your HTML file
        .then(response => response.json())
        .then(images => {
            const gallerySlide = document.getElementById('gallerySlide');
            gallerySlide.innerHTML = ''; // Clear existing content
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `img/PizzaImg/${image}`; // Path to images in img/PizzaImg/Pictures folder
                img.alt = image.split('.')[0]; // Use the file name (without extension) as the alt text
                gallerySlide.appendChild(img);
            });
            showSlides(slideIndex); // Refresh slides after loading new images
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}

// Load images when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
});

// Smooth scrolling for anchor links in navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 70, // Adjust based on your header height
            behavior: 'smooth'
        });
    });
});
