// Scroll animations
ScrollReveal().reveal('[data-animate]', {
  delay: 200,
  interval: 100
});

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.main-nav').class.toggle('active');
});