// Sample trainer data (would typically come from an API in production)
const trainers = [
    {
        id: 1,
        name: "Sarah Johnson",
        specialty: "Hatha Yoga",
        location: "New York",
        rating: 4.8,
        bio: "Certified Hatha yoga instructor with 10 years of experience helping students find balance and inner peace through traditional yoga practices.",
        image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Michael Chen",
        specialty: "Vinyasa Flow",
        location: "Los Angeles",
        rating: 4.9,
        bio: "Energetic Vinyasa teacher focusing on breath and movement synchronization. Specializes in creative flows for all levels.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Priya Patel",
        specialty: "Ashtanga Yoga",
        location: "Chicago",
        rating: 4.7,
        bio: "Traditional Ashtanga practitioner teaching the authentic eight-limbed path. Mysore-style classes available.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "David Wilson",
        specialty: "Yin Yoga",
        location: "Miami",
        rating: 4.6,
        bio: "Specializing in deep stretch and relaxation techniques for all levels. Perfect for stress relief and flexibility.",
        image: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Elena Rodriguez",
        specialty: "Restorative Yoga",
        location: "New York",
        rating: 4.9,
        bio: "Helping students heal and restore through gentle yoga practices. Ideal for recovery and stress management.",
        image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "James Tanaka",
        specialty: "Power Yoga",
        location: "Los Angeles",
        rating: 4.5,
        bio: "Dynamic power yoga classes designed to build strength and endurance while maintaining mindfulness.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

// DOM Elements
const searchForm = document.getElementById('trainer-search-form');
const searchInput = document.getElementById('search');
const locationSelect = document.getElementById('location');
const yogaTypeSelect = document.getElementById('yoga-type');
const trainersGrid = document.querySelector('.trainers-grid');
const noResults = document.getElementById('no-results');
const loading = document.getElementById('loading');

// Display all trainers initially
document.addEventListener('DOMContentLoaded', () => {
    displayTrainers(trainers);
});

// Form submission handler
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    filterTrainers();
});

// Input/select change handlers with debounce
searchInput.addEventListener('input', debounce(filterTrainers, 300));
locationSelect.addEventListener('change', debounce(filterTrainers, 300));
yogaTypeSelect.addEventListener('change', debounce(filterTrainers, 300));

/**
 * Filters trainers based on search criteria
 */
function filterTrainers() {
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        const searchTerm = searchInput.value.toLowerCase();
        const location = locationSelect.value;
        const yogaType = yogaTypeSelect.value;

        const filtered = trainers.filter(trainer => {
            const matchesSearch = trainer.name.toLowerCase().includes(searchTerm) || 
                                trainer.specialty.toLowerCase().includes(searchTerm);
            const matchesLocation = location === '' || trainer.location === location;
            const matchesYogaType = yogaType === '' || trainer.specialty.includes(yogaType);
            
            return matchesSearch && matchesLocation && matchesYogaType;
        });

        displayTrainers(filtered);
        hideLoading();
    }, 500);
}

/**
 * Displays trainers in the grid
 * @param {Array} trainersToDisplay - Array of trainer objects
 */
function displayTrainers(trainersToDisplay) {
    trainersGrid.innerHTML = '';

    if (trainersToDisplay.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    trainersToDisplay.forEach(trainer => {
        const card = document.createElement('article');
        card.className = 'trainer-card';
        card.innerHTML = `
            <div class="trainer-image">
                <img src="${trainer.image}" alt="${trainer.name}, ${trainer.specialty} instructor" loading="lazy">
                <div class="trainer-rating">
                    <span>${trainer.rating}</span>
                    <i class="fas fa-star" aria-hidden="true"></i>
                </div>
            </div>
            <div class="trainer-info">
                <h3>${trainer.name}</h3>
                <div class="trainer-specialty">
                    <i class="fas fa-yin-yang" aria-hidden="true"></i>
                    ${trainer.specialty}
                </div>
                <div class="trainer-location">
                    <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                    ${trainer.location}
                </div>
                <p class="trainer-bio">${trainer.bio}</p>
                <div class="trainer-actions">
                    <button class="btn btn-primary" aria-label="View ${trainer.name}'s profile">
                        View Profile
                    </button>
                    <button class="btn btn-outline" aria-label="Contact ${trainer.name}">
                        <i class="fas fa-envelope" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        `;
        trainersGrid.appendChild(card);
    });
}

/**
 * Shows loading state
 */
function showLoading() {
    loading.style.display = 'block';
    trainersGrid.style.opacity = '0.5';
}

/**
 * Hides loading state
 */
function hideLoading() {
    loading.style.display = 'none';
    trainersGrid.style.opacity = '1';
}

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Add click handlers for trainer cards when they're created
document.addEventListener('click', function(e) {
    if (e.target.closest('.trainer-card')) {
        const card = e.target.closest('.trainer-card');
        // In a real app, this would navigate to the trainer's profile
        console.log('Viewing trainer profile:', card.querySelector('h3').textContent);
    }
});