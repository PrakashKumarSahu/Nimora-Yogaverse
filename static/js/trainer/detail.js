document.addEventListener('DOMContentLoaded', function() {
  // Modal functionality
  const modal = document.getElementById('contactModal');
  const contactBtn = document.querySelector('.contact-btn');
  const closeModal = document.querySelector('.close-modal');
  
  // Open modal when contact button is clicked
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  }
  
  // Close modal when X is clicked
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Book session button functionality
  const bookBtn = document.querySelector('.book-btn');
  if (bookBtn) {
    bookBtn.addEventListener('click', function() {
      // Implement booking functionality
      alert('Booking functionality will be implemented soon!');
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
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
  
  // Copy phone number functionality
  const phoneLinks = document.querySelectorAll('.contact-option a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const phoneNumber = this.getAttribute('href').replace('tel:', '');
      
      // Try to initiate call on mobile, copy on desktop
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
      } else {
        navigator.clipboard.writeText(phoneNumber).then(() => {
          const originalText = this.textContent;
          this.textContent = 'Copied to clipboard!';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      }
    });
  });
});