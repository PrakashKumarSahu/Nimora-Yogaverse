document.addEventListener('DOMContentLoaded', function() {
  // Sample trainer data (in a real app, this would come from an API)
  const trainers = [
    {
      id: 1,
      name: "Anjali Sharma",
      style: "Hatha",
      location: "Delhi",
      experience: "5+ years",
      rating: 4.0,
      students: 250,
      earnings: "₹1,20,000/mo",
      bio: "Certified Hatha Yoga instructor with 5+ years of experience teaching all levels.",
      image: "{% static 'profile-image/anjali.png' %}"
    },
    {
      id: 2,
      name: "Rohan Mehra",
      style: "Therapeutic",
      location: "Mumbai",
      experience: "4 years",
      rating: 3.5,
      students: 180,
      earnings: "₹95,000/mo",
      bio: "Specializes in therapeutic yoga for back pain and stress relief.",
      image: "{% static 'profile-image/rohan.png' %}"
    },
    {
      id: 3,
      name: "Priya Patel",
      style: "Vinyasa",
      location: "Bangalore",
      experience: "3 years",
      rating: 4.5,
      students: 190,
      earnings: "₹1,05,000/mo",
      bio: "Energetic Vinyasa flow teacher with a focus on breath and movement.",
      image: "{% static 'profile-image/default.png' %}"
    },
    {
      id: 4,
      name: "Arjun Singh",
      style: "Ashtanga",
      location: "Delhi",
      experience: "6 years",
      rating: 4.8,
      students: 300,
      earnings: "₹1,50,000/mo",
      bio: "Traditional Ashtanga teacher trained in Mysore, India.",
      image: "{% static 'profile-image/default.png' %}"
    }
  ];

  // DOM Elements
  const searchForm = document.getElementById('trainerSearch');
  const searchInput = document.getElementById('searchInput');
  const locationFilter = document.getElementById('locationFilter');
  const styleFilter = document.getElementById('styleFilter');
  const searchResults = document.getElementById('searchResults');
  const trainerForm = document.getElementById('trainerApplicationForm');
  const formMessage = document.getElementById('formMessage');
  const faqQuestions = document.querySelectorAll('.faq-question');

  // Search Functionality
  function searchTrainers() {
    const searchTerm = searchInput.value.toLowerCase();
    const location = locationFilter.value;
    const style = styleFilter.value;
    
    const filtered = trainers.filter(trainer => {
      const matchesSearch = trainer.name.toLowerCase().includes(searchTerm) || 
                          trainer.style.toLowerCase().includes(searchTerm) ||
                          trainer.bio.toLowerCase().includes(searchTerm);
      
      const matchesLocation = location ? trainer.location === location : true;
      const matchesStyle = style ? trainer.style === style : true;
      
      return matchesSearch && matchesLocation && matchesStyle;
    });
    
    displayResults(filtered);
  }

  // Display Search Results
  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p class="no-results">No trainers found matching your criteria.</p>';
      return;
    }
    
    searchResults.innerHTML = results.map(trainer => `
      <div class="trainer-card">
        <div class="trainer-header">
          <img src="${trainer.image}" alt="${trainer.name}" class="trainer-img">
          <div class="trainer-meta">
            <h3>${trainer.name}</h3>
            <span class="trainer-style">${trainer.style} Yoga</span>
            <div class="trainer-location">
              <i class="fas fa-map-marker-alt"></i> ${trainer.location}
            </div>
          </div>
        </div>
        <div class="trainer-body">
          <p>${trainer.bio}</p>
          <div class="trainer-stats">
            <div class="stat">
              <i class="fas fa-star"></i> ${trainer.rating}
            </div>
            <div class="stat">
              <i class="fas fa-users"></i> ${trainer.students}+ students
            </div>
            <div class="stat">
              <i class="fas fa-rupee-sign"></i> ${trainer.earnings}
            </div>
          </div>
        </div>
        <div class="trainer-footer">
          <button class="view-profile-btn" data-id="${trainer.id}">
            View Profile <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  // Form Submission
  trainerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple validation
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    
    if (!name || !email) {
      formMessage.textContent = "Please fill in all required fields.";
      formMessage.className = "form-message error";
      return;
    }
    
    // In a real app, you would send this data to your server
    formMessage.textContent = "Thank you for your application! We'll review your information and contact you soon.";
    formMessage.className = "form-message success";
    
    // Reset form
    this.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.className = "form-message";
      formMessage.textContent = "";
    }, 5000);
  });

  // FAQ Accordion
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      this.classList.toggle('active');
      const answer = this.nextElementSibling;
      
      if (this.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
      
      // Close other open FAQs
      faqQuestions.forEach(q => {
        if (q !== this && q.classList.contains('active')) {
          q.classList.remove('active');
          q.nextElementSibling.style.maxHeight = '0';
        }
      });
    });
  });

  // Event Listeners for Search
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    searchTrainers();
  });
  
  searchInput.addEventListener('input', searchTrainers);
  locationFilter.addEventListener('change', searchTrainers);
  styleFilter.addEventListener('change', searchTrainers);

  // Initial search to display all trainers
  searchTrainers();
});