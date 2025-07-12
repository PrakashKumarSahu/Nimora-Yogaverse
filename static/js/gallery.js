// Sample gallery data
const galleryData = [
    { img: 'https://source.unsplash.com/random/600x600/?yoga,1', caption: 'Morning Sun Salutation' },
    { img: 'https://source.unsplash.com/random/600x600/?yoga,2', caption: 'Group Meditation Session' },
    { img: 'https://source.unsplash.com/random/600x600/?yoga,3', caption: 'Advanced Asana Practice' },
    { img: 'https://source.unsplash.com/random/600x600/?yoga,4', caption: 'Yoga Teacher Training' },
    { img: 'https://source.unsplash.com/random/600x600/?yoga,5', caption: 'Beach Yoga Retreat' },
    { img: 'https://source.unsplash.com/random/600x600/?yoga,6', caption: 'Kids Yoga Class' },
    { img: 'https://source.unsplash.com/random/600x600/?yoga,7', caption: 'Partner Yoga' },
    { img: 'https://source.unsplash.com/random/600x600/?yoga,8', caption: 'Yoga in Nature' },
];

const galleryContainer = document.querySelector('.gallery-container');
const loadMoreBtn = document.querySelector('.load-more');
let currentItems = 4;

// Initial gallery render
function renderGallery(items) {
    galleryContainer.innerHTML = '';
    items.slice(0, currentItems).forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.img}" alt="${item.caption}">
            <div class="gallery-caption">${item.caption}</div>
        `;
        galleryContainer.appendChild(galleryItem);
    });
}

// Load more functionality
loadMoreBtn.addEventListener('click', () => {
    currentItems += 4;
    if (currentItems >= galleryData.length) {
        loadMoreBtn.style.display = 'none';
    }
    renderGallery(galleryData);
});

// Initialize gallery
renderGallery(galleryData);
if (galleryData.length <= 4) {
    loadMoreBtn.style.display = 'none';
}