document.addEventListener('DOMContentLoaded', function() {
  // View Toggle Functionality
  const gridViewBtn = document.querySelector('.grid-view');
  const listViewBtn = document.querySelector('.list-view');
  const classesContainer = document.querySelector('.classes-container');

  if (gridViewBtn && listViewBtn && classesContainer) {
    gridViewBtn.addEventListener('click', function() {
      classesContainer.classList.remove('list-view');
      classesContainer.classList.add('grid-view');
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', function() {
      classesContainer.classList.remove('grid-view');
      classesContainer.classList.add('list-view');
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
    });
  }

  // Filter Functionality
  const searchForm = document.querySelector('.class-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = this.querySelector('.search-input').value.toLowerCase();
      const styleFilter = this.querySelector('.style-filter').value;
      const levelFilter = this.querySelector('.level-filter').value;
      
      const classCards = document.querySelectorAll('.class-card');
      
      classCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.class-description').textContent.toLowerCase();
        const style = card.querySelector('.class-description').textContent.toLowerCase();
        const level = card.querySelector('.class-level').classList[1];
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesStyle = !styleFilter || style.includes(styleFilter);
        const matchesLevel = !levelFilter || level === levelFilter;
        
        if (matchesSearch && matchesStyle && matchesLevel) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Modal Booking Functionality
  const bookingModal = document.getElementById('bookingModal');
  const closeModal = document.querySelector('.close-modal');
  const bookButtons = document.querySelectorAll('.book-btn');
  
  // Open modal when book button is clicked
  bookButtons.forEach(button => {
    button.addEventListener('click', function() {
      const classCard = this.closest('.class-card');
      const className = classCard.querySelector('h3').textContent;
      const classInstructor = classCard.querySelector('.class-meta span:first-child').textContent.replace(' ', '');
      
      document.getElementById('class-name').value = `${className} with ${classInstructor}`;
      bookingModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal when X is clicked
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      bookingModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === bookingModal) {
      bookingModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Form Submission
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = {
        className: this.querySelector('#class-name').value,
        name: this.querySelector('#booking-name').value,
        email: this.querySelector('#booking-email').value,
        phone: this.querySelector('#booking-phone').value,
        date: this.querySelector('#booking-date').value,
        notes: this.querySelector('#booking-notes').value
      };
      
      // Here you would typically send this data to your server
      console.log('Booking submitted:', formData);
      
      // Show success message
      alert(`Thank you, ${formData.name}! Your booking for ${formData.className} has been received. We'll contact you shortly to confirm.`);
      
      // Reset and close modal
      this.reset();
      bookingModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Pagination Functionality
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const pageNumbers = document.querySelectorAll('.page-numbers span');
  
  if (prevBtn && nextBtn && pageNumbers.length) {
    let currentPage = 1;
    
    // Update pagination state
    function updatePagination() {
      pageNumbers.forEach((num, index) => {
        if (index + 1 === currentPage) {
          num.classList.add('active');
        } else {
          num.classList.remove('active');
        }
      });
      
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === pageNumbers.length;
    }
    
    // Page number click
    pageNumbers.forEach((num, index) => {
      num.addEventListener('click', function() {
        currentPage = index + 1;
        updatePagination();
        // Here you would typically load the new page content
      });
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
        // Here you would typically load the new page content
      }
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
      if (currentPage < pageNumbers.length) {
        currentPage++;
        updatePagination();
        // Here you would typically load the new page content
      }
    });
  }

  // Set minimum date for booking to today
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    dateInput.min = today;
  }

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      if (img.complete) return;
      imageObserver.observe(img);
    });
  }
});