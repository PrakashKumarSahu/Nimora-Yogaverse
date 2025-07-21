document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const editProfileBtn = document.getElementById('editProfileBtn');
  const viewPublicBtn = document.getElementById('viewPublicBtn');
  const modal = document.getElementById('editProfileModal');
  const modalClose = document.querySelector('.modal-close');
  const modalCancel = document.querySelector('.modal-cancel');
  const profileForm = document.getElementById('profileForm');
  const imageUpload = document.getElementById('imageUpload');
  const avatarPreview = document.getElementById('avatarPreview');
  const timeRangeSelect = document.getElementById('timeRangeSelect');
  const successToast = document.getElementById('successToast');
  
  // Initialize Chart
  let progressChart;
  initChart();
  
  // Event Listeners
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', openModal);
  }
  
  if (viewPublicBtn) {
    viewPublicBtn.addEventListener('click', () => {
      window.location.href = `/trainer/profile/${trainerId}/`; // Replace with your actual public profile URL
    });
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalCancel) {
    modalCancel.addEventListener('click', closeModal);
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  if (imageUpload) {
    imageUpload.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          avatarPreview.style.backgroundImage = `url(${e.target.result})`;
        }
        reader.readAsDataURL(file);
      }
    });
  }
  
  if (profileForm) {
    profileForm.addEventListener('submit', handleFormSubmit);
  }
  
  if (timeRangeSelect) {
    timeRangeSelect.addEventListener('change', updateChartData);
  }
  
  // Functions
  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Simulate form submission
    const formData = new FormData(profileForm);
    
    // In a real app, you would use fetch to submit the form
    console.log('Form data:', Object.fromEntries(formData.entries()));
    
    // Simulate API call delay
    setTimeout(() => {
      // Update the profile display with new values
      document.getElementById('trainerName').textContent = formData.get('name');
      document.getElementById('trainerSpecialty').textContent = formData.get('specialty');
      document.getElementById('trainerLocation').textContent = formData.get('location');
      document.getElementById('trainerExperience').textContent = `${formData.get('years_experience')} years`;
      document.getElementById('trainerPhone').textContent = formData.get('phone') || 'Not provided';
      document.getElementById('trainerBio').textContent = formData.get('bio');
      
      // Update yoga types (simplified for demo)
      const yogaTypesContainer = document.getElementById('yogaTypesContainer');
      yogaTypesContainer.innerHTML = '';
      const selectedTypes = Array.from(document.getElementById('yoga_types').selectedOptions);
      selectedTypes.forEach(option => {
        const tag = document.createElement('span');
        tag.className = 'yoga-type-tag';
        tag.textContent = option.text;
        yogaTypesContainer.appendChild(tag);
      });
      
      // Update social links (simplified for demo)
      const socialLinksContainer = document.getElementById('socialLinksContainer');
      socialLinksContainer.innerHTML = '';
      
      const socialPlatforms = [
        { name: 'instagram', url: formData.get('social_instagram') },
        { name: 'facebook', url: formData.get('social_facebook') },
        { name: 'youtube', url: formData.get('social_youtube') },
        { name: 'linkedin', url: formData.get('social_linkedin') }
      ];
      
      let hasSocialLinks = false;
      
      socialPlatforms.forEach(platform => {
        if (platform.url) {
          hasSocialLinks = true;
          const link = document.createElement('a');
          link.href = platform.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.className = 'social-link';
          
          const icon = document.createElement('i');
          icon.className = `fab fa-${platform.name}`;
          
          const span = document.createElement('span');
          span.textContent = platform.name.charAt(0).toUpperCase() + platform.name.slice(1);
          
          link.appendChild(icon);
          link.appendChild(span);
          socialLinksContainer.appendChild(link);
        }
      });
      
      if (!hasSocialLinks) {
        const noSocial = document.createElement('p');
        noSocial.className = 'no-social';
        noSocial.textContent = 'No social links added';
        socialLinksContainer.appendChild(noSocial);
      }
      
      closeModal();
      showToast('Profile updated successfully!');
    }, 1000);
  }
  
  function showToast(message) {
    const toastMessage = successToast.querySelector('.toast-message');
    toastMessage.textContent = message;
    
    successToast.classList.add('show');
    
    setTimeout(() => {
      successToast.classList.remove('show');
    }, 3000);
  }
  
  function initChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Students',
          data: [12, 19, 15, 27],
          borderColor: '#1A3A32',
          backgroundColor: 'rgba(26, 58, 50, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }, {
          label: 'Classes',
          data: [5, 8, 6, 10],
          borderColor: '#A8D8B9',
          backgroundColor: 'rgba(168, 216, 185, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  function updateChartData() {
    const timeRange = timeRangeSelect.value;
    let labels, studentData, classData;
    
    switch(timeRange) {
      case 'week':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        studentData = [3, 5, 4, 6, 7, 10, 8];
        classData = [1, 2, 1, 3, 2, 4, 2];
        break;
      case 'month':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        studentData = [12, 19, 15, 27];
        classData = [5, 8, 6, 10];
        break;
      case 'quarter':
        labels = ['Month 1', 'Month 2', 'Month 3'];
        studentData = [65, 59, 80];
        classData = [28, 25, 35];
        break;
      case 'year':
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        studentData = [120, 190, 150, 170, 160, 180, 200, 210, 190, 220, 230, 250];
        classData = [45, 60, 50, 55, 52, 65, 70, 68, 62, 75, 78, 85];
        break;
    }
    
    progressChart.data.labels = labels;
    progressChart.data.datasets[0].data = studentData;
    progressChart.data.datasets[1].data = classData;
    progressChart.update();
  }
  
  // Keyboard accessibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});