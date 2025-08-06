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
      localStorage.setItem('classViewPreference', 'grid');
    });

    listViewBtn.addEventListener('click', function() {
      classesContainer.classList.remove('grid-view');
      classesContainer.classList.add('list-view');
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      localStorage.setItem('classViewPreference', 'list');
    });

    // Load saved view preference
    const savedView = localStorage.getItem('classViewPreference') || 'grid';
    if (savedView === 'list') {
      listViewBtn.click();
    } else {
      gridViewBtn.click();
    }
  }

  // Modal Booking Functionality
  const bookingModal = document.getElementById('bookingModal');
  const closeModal = document.querySelector('.close-modal');
  const bookButtons = document.querySelectorAll('.book-btn');
  
  // Open modal when book button is clicked
  bookButtons.forEach(button => {
    button.addEventListener('click', function() {
      const classId = this.getAttribute('data-class-id');
      const className = this.getAttribute('data-class-name');
      const instructor = this.getAttribute('data-instructor');
      
      document.getElementById('class-name').value = `${className} with ${instructor}`;
      document.getElementById('class-id').value = classId;
      
      // Set minimum date to today
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('booking-date').min = today;
      
      bookingModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal when X is clicked
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      bookingModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      clearFormErrors();
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === bookingModal) {
      bookingModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      clearFormErrors();
    }
  });

  // Clear form errors
  function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
      el.textContent = '';
    });
  }
  
  // Form Validation and Submission
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      clearFormErrors();
      
      // Validate form
      let isValid = true;
      const name = document.getElementById('booking-name');
      const email = document.getElementById('booking-email');
      const phone = document.getElementById('booking-phone');
      const date = document.getElementById('booking-date');
      
      if (!name.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
      }
      
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
      }
      
      if (!phone.value.trim() || !/^[0-9]{10,15}$/.test(phone.value)) {
        document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
      }
      
      if (!date.value) {
        document.getElementById('date-error').textContent = 'Please select a date';
        document.getElementById('date-error').style.display = 'block';
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Submit form via AJAX
      const formData = new FormData(this);
      
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': formData.get('csrfmiddlewaretoken')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast('Booking successful! We will contact you shortly.', 'success');
          bookingModal.style.display = 'none';
          document.body.style.overflow = 'auto';
          this.reset();
        } else {
          // Show server-side validation errors
          if (data.errors) {
            Object.entries(data.errors).forEach(([field, message]) => {
              const errorElement = document.getElementById(`${field}-error`);
              if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
              }
            });
          } else {
            showToast(data.message || 'An error occurred. Please try again.', 'error');
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred. Please try again.', 'error');
      });
    });
  }

  // Toast notification
  function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
      toast.className = toast.className.replace('show', '');
    }, 5000);
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
    }, {
      rootMargin: '200px 0px' // Load images 200px before they come into view
    });
    
    lazyImages.forEach(img => {
      if (img.complete) return;
      imageObserver.observe(img);
    });
  }
});