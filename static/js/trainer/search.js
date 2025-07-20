document.addEventListener('DOMContentLoaded', function() {
    // Save search filters to localStorage
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function() {
            const nameInput = this.querySelector('input[name="name"]');
            const locationInput = this.querySelector('input[name="location"]');
            
            if (nameInput.value) {
                localStorage.setItem('lastSearchName', nameInput.value);
            }
            if (locationInput.value) {
                localStorage.setItem('lastSearchLocation', locationInput.value);
            }
        });

        // Pre-fill from localStorage if available
        const lastSearchName = localStorage.getItem('lastSearchName');
        const lastSearchLocation = localStorage.getItem('lastSearchLocation');
        
        if (lastSearchName) {
            searchForm.querySelector('input[name="name"]').value = lastSearchName;
        }
        if (lastSearchLocation) {
            searchForm.querySelector('input[name="location"]').value = lastSearchLocation;
        }
    }

    // Smooth scroll to results after search
    if (window.location.search.includes('name=') || window.location.search.includes('location=')) {
        const resultsSection = document.querySelector('.search-results');
        if (resultsSection) {
            setTimeout(() => {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    }
});