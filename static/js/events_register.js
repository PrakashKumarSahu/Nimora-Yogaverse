document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const categoryFilter = document.getElementById('categoryFilter');
  const dateFilter = document.getElementById('dateFilter');
  const priceFilter = document.getElementById('priceFilter');
  const eventsGrid = document.getElementById('eventsGrid');
  const eventCards = document.querySelectorAll('.event-card');
  const noEvents = document.getElementById('noEvents');
  const registerButtons = document.querySelectorAll('.register-btn');
  const detailsButtons = document.querySelectorAll('.details-btn');
  const registrationModal = document.getElementById('registrationModal');
  const successModal = document.getElementById('successModal');
  const modalClose = document.querySelector('.modal-close');
  const modalCancel = document.querySelector('.modal-cancel');
  const registrationForm = document.getElementById('registrationForm');
  const successClose = document.getElementById('successClose');
  const addToCalendar = document.getElementById('addToCalendar');

  // Event data storage
  const eventsData = {
    1: {
      title: "Advanced Asana Workshop",
      date: "Feb 15, 2024",
      time: "4:00 PM - 6:00 PM",
      price: "₹1,499"
    },
    2: {
      title: "Weekend Yoga Retreat",
      date: "Mar 10-12, 2024",
      time: "Weekend Retreat",
      price: "₹8,999"
    },
    3: {
      title: "Guided Meditation Session",
      date: "Feb 20, 2024",
      time: "6:00 PM - 7:00 PM",
      price: "Free"
    },
    4: {
      title: "Pranayama Masterclass",
      date: "Feb 25, 2024",
      time: "3:00 PM - 5:30 PM",
      price: "₹2,499"
    },
    5: {
      title: "Spring Yoga Festival",
      date: "Apr 5-7, 2024",
      time: "3-Day Festival",
      price: "₹3,999"
    },
    6: {
      title: "Yoga for Beginners",
      date: "Feb 28, 2024",
      time: "5:30 PM - 7:00 PM",
      price: "Free"
    }
  };

  // Initialize events
  initEvents();

  // Event Listeners
  categoryFilter.addEventListener('change', filterEvents);
  dateFilter.addEventListener('change', filterEvents);
  priceFilter.addEventListener('change', filterEvents);

  registerButtons.forEach(button => {
    button.addEventListener('click', openRegistrationModal);
  });

  detailsButtons.forEach(button => {
    button.addEventListener('click', showEventDetails);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalCancel) {
    modalCancel.addEventListener('click', closeModal);
  }

  registrationModal.addEventListener('click', function(e) {
    if (e.target === registrationModal) {
      closeModal();
    }
  });

  if (registrationForm) {
    registrationForm.addEventListener('submit', handleRegistration);
  }

  if (successClose) {
    successClose.addEventListener('click', closeSuccessModal);
  }

  if (addToCalendar) {
    addToCalendar.addEventListener('click', addEventToCalendar);
  }

  // Keyboard accessibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (registrationModal.style.display === 'block') {
        closeModal();
      }
      if (successModal.style.display === 'block') {
        closeSuccessModal();
      }
    }
  });

  // Functions
  function initEvents() {
    filterEvents(); // Apply initial filters
  }

  function filterEvents() {
    const category = categoryFilter.value;
    const date = dateFilter.value;
    const price = priceFilter.value;

    let visibleCount = 0;

    eventCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const cardDate = card.dataset.date;
      const cardPrice = card.dataset.price;

      let showCard = true;

      // Category filter
      if (category !== 'all' && cardCategory !== category) {
        showCard = false;
      }

      // Date filter (simplified for demo)
      if (date !== 'all') {
        const eventDate = new Date(cardDate);
        const today = new Date();
        
        if (date === 'this-week') {
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          if (eventDate < today || eventDate > nextWeek) {
            showCard = false;
          }
        } else if (date === 'this-month') {
          const nextMonth = new Date(today);
          nextMonth.setMonth(today.getMonth() + 1);
          if (eventDate < today || eventDate > nextMonth) {
            showCard = false;
          }
        } else if (date === 'next-month') {
          const thisMonthEnd = new Date(today);
          thisMonthEnd.setMonth(today.getMonth() + 1);
          thisMonthEnd.setDate(0);
          
          const nextMonthEnd = new Date(today);
          nextMonthEnd.setMonth(today.getMonth() + 2);
          nextMonthEnd.setDate(0);
          
          if (eventDate < thisMonthEnd || eventDate > nextMonthEnd) {
            showCard = false;
          }
        }
      }

      // Price filter
      if (price !== 'all') {
        if (price === 'free' && cardPrice !== 'free') {
          showCard = false;
        } else if (price === 'paid' && cardPrice === 'free') {
          showCard = false;
        }
      }

      if (showCard) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Show/hide no events message
    if (visibleCount === 0) {
      noEvents.style.display = 'block';
      eventsGrid.style.display = 'none';
    } else {
      noEvents.style.display = 'none';
      eventsGrid.style.display = 'grid';
    }
  }

  function openRegistrationModal() {
    const eventId = this.dataset.eventId;
    const eventData = eventsData[eventId];

    if (eventData) {
      document.getElementById('eventId').value = eventId;
      document.getElementById('modalEventTitle').textContent = `Register for ${eventData.title}`;
      document.getElementById('modalEventDate').textContent = `${eventData.date} • ${eventData.time} • ${eventData.price}`;
    }

    registrationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function showEventDetails() {
    // For demo purposes, just show an alert
    const eventCard = this.closest('.event-card');
    const eventTitle = eventCard.querySelector('h3').textContent;
    alert(`Details for: ${eventTitle}\n\nThis would show more information about the event in a real implementation.`);
  }

  function closeModal() {
    registrationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  function closeSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  function handleRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(registrationForm);
    const eventId = formData.get('event_id');
    const eventData = eventsData[eventId];

    // Simulate form submission
    console.log('Registration data:', Object.fromEntries(formData.entries()));

    // Show success message
    document.getElementById('successMessage').textContent = 
      `Thank you for registering for "${eventData.title}"! We've sent a confirmation to ${formData.get('email')}.`;

    // Close registration modal and show success modal
    closeModal();
    successModal.style.display = 'block';
    
    // Reset form
    registrationForm.reset();
  }

  function addEventToCalendar() {
    // Simple calendar add functionality
    alert('This would add the event to your calendar. In a real implementation, this would generate a .ics file or use a calendar API.');
  }
});











document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    function openRegistrationModal() {
        const eventId = this.dataset.eventId;
        const eventCard = this.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;
        const eventDate = eventCard.querySelector('.event-date span').textContent;
        const eventTime = eventCard.querySelector('.event-time').textContent;
        const eventPrice = eventCard.querySelector('.event-price').textContent;
        const spotsAvailable = eventCard.querySelector('.detail-item:last-child span').textContent;

        document.getElementById('eventId').value = eventId;
        document.getElementById('modalEventTitle').textContent = `Register for ${eventTitle}`;
        document.getElementById('modalEventDate').textContent = `${eventDate} • ${eventTime} • ${eventPrice}`;
        document.getElementById('modalEventSpots').textContent = spotsAvailable;

        registrationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    async function handleRegistration(e) {
        e.preventDefault();
        
        const formData = new FormData(registrationForm);
        const eventId = formData.get('event_id');
        
        // Show loading state
        const submitBtn = registrationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(`/events/${eventId}/register-ajax/`, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                document.getElementById('successMessage').textContent = data.message;
                closeModal();
                successModal.style.display = 'block';
                
                // Reset form
                registrationForm.reset();
                
                // Update spots available on the event card
                updateSpotsAvailable(eventId, parseInt(formData.get('participants')));
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    function updateSpotsAvailable(eventId, participants) {
        const eventCard = document.querySelector(`.event-card[data-event-id="${eventId}"]`);
        if (eventCard) {
            const spotsElement = eventCard.querySelector('.detail-item:last-child span');
            const currentSpots = parseInt(spotsElement.textContent.split('/')[0]);
            const totalSpots = parseInt(spotsElement.textContent.split('/')[1].split(' ')[0]);
            
            const newSpots = currentSpots - participants;
            spotsElement.textContent = `${newSpots}/${totalSpots} spots left`;
            
            // Update data attribute if needed
            eventCard.dataset.spotsAvailable = newSpots;
        }
    }

    // Update the filterEvents function to handle actual filtering
    function filterEvents() {
        const category = categoryFilter.value;
        const date = dateFilter.value;
        const price = priceFilter.value;

        // Build URL with filter parameters
        const params = new URLSearchParams();
        if (category !== 'all') params.append('category', category);
        if (date !== 'all') params.append('date', date);
        if (price !== 'all') params.append('price', price);

        // Reload page with filters (or use AJAX for better UX)
        window.location.href = `${window.location.pathname}?${params.toString()}`;
    }

    // ... rest of the JavaScript code ...
});