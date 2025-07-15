document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle with Animation
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  const toggleMobileMenu = () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Animate hamburger to X
    const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
    if (!isExpanded) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      lines.forEach(line => {
        line.style.transform = '';
        line.style.opacity = '';
      });
    }
  };
  
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.classList.contains('btn')) return;
      
      if (navLinks.classList.contains('active')) {
        toggleMobileMenu();
      }
      
      // Smooth scroll to section
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          smoothScrollTo(targetElement);
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
        smoothScrollTo(targetElement);
        
        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });

  // Smooth scroll function with offset for fixed header
  function smoothScrollTo(target) {
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - headerHeight - 20;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // Form submission handling with validation
  const trialForm = document.getElementById('trialForm');
  if (trialForm) {
    trialForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      try {
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.tel) {
          throw new Error('Please fill in all fields');
        }
        
        // Phone number validation (simple version)
        if (!/^[0-9]{10,15}$/.test(data.tel)) {
          throw new Error('Please enter a valid phone number');
        }
        
        // Here you would typically send to a server
        console.log('Form submitted:', data);
        
        // Show success message with animation
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
          submitBtn.innerHTML = 'Send';
          submitBtn.style.backgroundColor = '';
        }, 2000);
        
        this.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        showToast(error.message, 'error');
      }
    });
  }

  // Toast notification function
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // FAQ accordion functionality with animations
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      const content = this.nextElementSibling;
      
      if (!isExpanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.padding = '0 var(--space-md) var(--space-md)';
      } else {
        content.style.maxHeight = '0';
        content.style.padding = '0 var(--space-md)';
      }
    });
  });

  // Back to top button with scroll behavior
  const backToTopBtn = document.querySelector('.back-to-top');
  
  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
    
    // Animate elements on scroll
    animateOnScroll();
  };
  
  window.addEventListener('scroll', handleScroll);
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initialize scroll position
  handleScroll();

  // Enhanced animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      '.hero-text, .option-item, .teacher-card, .testimonial-card, .section-header'
    );
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Set initial state for animation
  document.querySelectorAll(
    '.hero-text, .option-item, .teacher-card, .testimonial-card, .section-header'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run on load and scroll
  window.addEventListener('load', () => {
    animateOnScroll();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Add loaded class to body for transition effects
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  });
  
  window.addEventListener('scroll', animateOnScroll);

  // Hero image parallax effect on desktop
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.innerWidth > 1024) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
  }
});