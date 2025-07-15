document.addEventListener('DOMContentLoaded', function() {
  // Enhanced Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  const toggleMobileMenu = () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    
    // Animate hamburger to X
    const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
    if (!isExpanded) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    }
  };
  
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active')) {
        toggleMobileMenu();
        document.body.style.overflow = 'auto';
      }
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Enhanced smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') === '#') return;
    
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        history.pushState(null, null, targetId);
      }
    });
  });

  // Form submission handling with validation
  const trialForm = document.getElementById('trialForm');
  if (trialForm) {
    trialForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      try {
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.tel) {
          alert('Please fill in all required fields');
          return;
        }
        
        // Here you would typically send to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you! Your request has been received. We\'ll contact you shortly.');
        this.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error submitting your form. Please try again.');
      }
    });
  }

  // FAQ accordion functionality
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      const content = this.nextElementSibling;
      
      if (!isExpanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });

  // Back to top button with IntersectionObserver
  const backToTopBtn = document.querySelector('.back-to-top');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        backToTopBtn.classList.remove('visible');
      } else {
        backToTopBtn.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(document.querySelector('nav'));
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animation on scroll with IntersectionObserver
  const animateElements = () => {
    const elements = document.querySelectorAll('.feature-card, .testimonial-card, .teacher-card, .section-header');
    
    const elementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          elementObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      elementObserver.observe(el);
    });
  };

  // Run animations
  animateElements();

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Add focus styles for keyboard navigation
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
    }
  });
});