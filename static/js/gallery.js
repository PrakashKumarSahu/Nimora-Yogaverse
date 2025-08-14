document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const imageModal = document.getElementById('imageModal');
  const modalClose = document.querySelector('.modal-close');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareBtn = document.getElementById('shareBtn');
  
  // Current items to show (for load more functionality)
  let visibleItems = 8;
  
  // Initialize gallery
  initGallery();
  
  // Event Listeners
  filterButtons.forEach(button => {
    button.addEventListener('click', filterGallery);
  });
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreItems);
  }
  
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', openModal);
  });
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
      closeModal();
    }
  });
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadImage);
  }
  
  if (shareBtn) {
    shareBtn.addEventListener('click', shareImage);
  }
  
  // Keyboard accessibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal.style.display === 'block') {
      closeModal();
    }
  });
  
  // Functions
  function initGallery() {
    // Hide all items initially
    galleryItems.forEach((item, index) => {
      if (index >= visibleItems) {
        item.style.display = 'none';
      }
    });
    
    // Hide load more button if not enough items
    if (galleryItems.length <= visibleItems) {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  function filterGallery() {
    const filter = this.dataset.filter;
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    // Filter items
    galleryItems.forEach(item => {
      item.style.display = 'none';
      
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      }
    });
    
    // Reset visible items counter
    visibleItems = 8;
    updateLoadMoreButton();
  }
  
  function loadMoreItems() {
    visibleItems += 8;
    const itemsToShow = document.querySelectorAll(`.gallery-item[style="display: block"], .gallery-item[style=""]`);
    
    itemsToShow.forEach((item, index) => {
      if (index < visibleItems) {
        item.style.display = 'block';
      }
    });
    
    updateLoadMoreButton();
  }
  
  function updateLoadMoreButton() {
    const visibleItemsCount = document.querySelectorAll(`.gallery-item[style="display: block"], .gallery-item[style=""]`).length;
    const totalItems = document.querySelectorAll('.gallery-item').length;
    
    if (visibleItemsCount >= totalItems) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }
  }
  
  function openModal() {
    const imageUrl = this.dataset.image;
    const title = this.dataset.title;
    const description = this.dataset.description;
    
    modalImage.src = imageUrl;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Update download button with current image
    downloadBtn.dataset.image = imageUrl;
    downloadBtn.dataset.filename = title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
  }
  
  function closeModal() {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  function downloadImage() {
    const imageUrl = this.dataset.image;
    const filename = this.dataset.filename || 'yogconnect-image.jpg';
    
    // Create temporary link
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function shareImage() {
    const title = modalTitle.textContent;
    const text = modalDescription.textContent;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url
      }).catch(err => {
        console.log('Error sharing:', err);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  }
  
  function fallbackShare() {
    // Fallback for browsers that don't support Web Share API
    const shareUrl = `https://wa.me/?text=Check out this yoga image from YogConnect: ${window.location.href}`;
    window.open(shareUrl, '_blank');
  }
});