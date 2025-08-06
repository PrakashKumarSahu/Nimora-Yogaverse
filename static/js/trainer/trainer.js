document.addEventListener('DOMContentLoaded', function() {
  // Tab Switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Profile Image Preview
  const profileImageInput = document.getElementById('id_profile_image');
  const profileImagePreview = document.getElementById('profile-image-preview');
  
  if (profileImageInput && profileImagePreview) {
    profileImageInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          profileImagePreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Add Class Form Toggle
  const addClassBtn = document.getElementById('add-class-btn');
  const addClassForm = document.getElementById('add-class-form');
  const cancelAddClass = document.getElementById('cancel-add-class');
  
  if (addClassBtn && addClassForm) {
    addClassBtn.addEventListener('click', () => {
      addClassForm.style.display = 'block';
      addClassBtn.style.display = 'none';
      // Scroll to form
      addClassForm.scrollIntoView({ behavior: 'smooth' });
    });
    
    cancelAddClass.addEventListener('click', () => {
      addClassForm.style.display = 'none';
      addClassBtn.style.display = 'block';
    });
  }
  
  // Edit Class Modals
  const editClassButtons = document.querySelectorAll('.edit-class');
  const editClassModal = document.getElementById('edit-class-modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  
  editClassButtons.forEach(button => {
    button.addEventListener('click', function() {
      const classId = this.getAttribute('data-class-id');
      
      // Fetch the edit form via AJAX
      fetch(`/trainer/edit-class/${classId}/`)
        .then(response => response.text())
        .then(html => {
          const modalBody = editClassModal.querySelector('.modal-body');
          modalBody.innerHTML = html;
          
          // Initialize any JS for the form
          initEditForm();
          
          // Show modal
          editClassModal.classList.add('active');
        })
        .catch(error => {
          console.error('Error loading edit form:', error);
        });
    });
  });
  
  // Delete Class Modals
  const deleteClassButtons = document.querySelectorAll('.delete-class');
  const deleteModal = document.getElementById('delete-modal');
  const cancelDelete = document.getElementById('cancel-delete');
  const confirmDelete = document.getElementById('confirm-delete');
  let classToDelete = null;
  
  deleteClassButtons.forEach(button => {
    button.addEventListener('click', function() {
      classToDelete = this.getAttribute('data-class-id');
      deleteModal.classList.add('active');
    });
  });
  
  // Modal Close Handlers
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  cancelDelete.addEventListener('click', () => {
    deleteModal.classList.remove('active');
    classToDelete = null;
  });
  
  confirmDelete.addEventListener('click', () => {
    if (classToDelete) {
      // Send delete request
      fetch(`/trainer/delete-class/${classToDelete}/`, {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Remove class card from DOM
          document.querySelector(`.class-card[data-class-id="${classToDelete}"]`).remove();
          deleteModal.classList.remove('active');
          classToDelete = null;
          
          // Show success message
          showToast('Class deleted successfully');
        } else {
          showToast('Error deleting class', 'error');
        }
      })
      .catch(error => {
        console.error('Error deleting class:', error);
        showToast('Error deleting class', 'error');
      });
    }
  });
  
  // Schedule Week Navigation
  const prevWeekBtn = document.getElementById('prev-week');
  const nextWeekBtn = document.getElementById('next-week');
  const currentWeekEl = document.getElementById('current-week');
  let currentDate = new Date();
  
  if (prevWeekBtn && nextWeekBtn && currentWeekEl) {
    // Initialize schedule
    updateSchedule();
    
    prevWeekBtn.addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() - 7);
      updateSchedule();
    });
    
    nextWeekBtn.addEventListener('click', () => {
      currentDate.setDate(currentDate.getDate() + 7);
      updateSchedule();
    });
  }
  
  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
  
  // Helper Functions
  function initEditForm() {
    // Initialize any JS needed for the edit form
    // For example, date pickers, image previews, etc.
    const imageInput = document.getElementById('id_image');
    const imagePreview = document.getElementById('image-preview');
    
    if (imageInput && imagePreview) {
      imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            imagePreview.src = e.target.result;
          }
          reader.readAsDataURL(file);
        }
      });
    }
  }
  
  function updateSchedule() {
    // Update the current week display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const startOfWeek = getStartOfWeek(currentDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    
    currentWeekEl.textContent = `Week of ${startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    
    // Clear existing schedule items (except the ones from template)
    const scheduleGrid = document.querySelector('.schedule-grid');
    const templateItems = document.querySelectorAll('.schedule-item[data-day][data-start][data-end]');
    
    // Remove only dynamically added items
    const dynamicItems = document.querySelectorAll('.schedule-item:not([data-day])');
    dynamicItems.forEach(item => item.remove());
    
    // Process template items (from Django template)
    templateItems.forEach(item => {
      const day = item.getAttribute('data-day');
      const startTime = item.getAttribute('data-start');
      const endTime = item.getAttribute('data-end');
      
      // Clone the item and position it in the schedule
      const dayIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(day);
      if (dayIndex >= 0) {
        const column = scheduleGrid.children[dayIndex];
        const newItem = item.cloneNode(true);
        newItem.removeAttribute('data-day');
        newItem.removeAttribute('data-start');
        newItem.removeAttribute('data-end');
        column.appendChild(newItem);
      }
    });
  }
  
  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
  }
  
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // Add toast styles dynamically
  const toastStyles = document.createElement('style');
  toastStyles.textContent = `
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      border-radius: var(--radius);
      background-color: var(--primary);
      color: white;
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .toast.success {
      background-color: var(--primary);
    }
    
    .toast.error {
      background-color: var(--error);
    }
    
    .toast.show {
      opacity: 1;
    }
  `;
  document.head.appendChild(toastStyles);
});