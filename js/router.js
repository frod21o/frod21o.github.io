let pageUrls = {
    about: '/index.html?about',
    contact:'/index.html?contact',
    gallery:'/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact){ RenderContactPage(); }
    if(loc === pageUrls.about){ RenderAboutPage(); }
    if(loc === pageUrls.gallery){ RenderGalleryPage(); }
}
window.onpopstate = popStateHandler;

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
    <h1 class="title">About Me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
    <h1 class="title">Contact with me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
    <div class="gallery" id="gallery"></div>
    <div class="modal" id="modal">
        <div class="modal-content">
            <button class="close-btn" id="closeBtn">Zamknij</button>
            <img src="" alt="Powiększone zdjęcie" id="modalImg">
        </div>
    </div>`;

    createGallery();
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
    <h1 class="title">Contact with me</h1>
    <form id="contact-form">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
    <button type="submit">Send</button>
    </form>`;

    document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Form submitted!');
    });
}


const imageUrls = [
    'images/1.jpg', 'images/2.jpg', 'images/3.jpg',
    'images/4.jpg', 'images/5.jpg', 'images/6.jpg',
    'images/7.jpg', 'images/8.jpg', 'images/9.jpg'
    ];


// Asynchroniczne ładowanie obrazów jako BLOB + lazy loading
function loadImage(url) {
return fetch(url)
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob));
}

async function createGallery() {
for (const url of imageUrls) {
    const img = document.createElement('img');
    img.loading = 'lazy'; // Lazy loading
    img.dataset.src = await loadImage(url); // Ustaw jako data-src na początku
    img.alt = 'Miniatura';
    img.addEventListener('click', openModal);
    document.getElementById('gallery').appendChild(img);
}
observeImages();
}

// Lazy loading za pomocą IntersectionObserver
function observeImages() {
    const imgs = document.querySelectorAll('.gallery img');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            obs.unobserve(img);
        }
        });
    }, { rootMargin: "100px" });
    imgs.forEach(img => observer.observe(img));
}

// Modal logic
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.getElementById('closeBtn');

function openModal(event) {
modalImg.src = event.target.src;
modal.style.display = 'flex';
}

function closeModal(event) {
if (event.target === modal || event.target === closeBtn) {
    modal.style.display = 'none';
    modalImg.src = '';
}
}

modal.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);