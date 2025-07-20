// Mobile Navigation Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
  mobileMenuToggle.setAttribute('aria-expanded', 
    mobileMenuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// FAQ Accordion
document.querySelectorAll('.accordion-btn').forEach(button => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
    
    const content = button.nextElementSibling;
    if (!isExpanded) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = '0';
    }
  });
});

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Form submission
const trialForm = document.getElementById('trialForm');
if (trialForm) {
  trialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your interest! We will contact you shortly.');
    trialForm.reset();
  });
}