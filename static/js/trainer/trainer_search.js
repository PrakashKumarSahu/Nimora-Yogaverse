document.addEventListener('DOMContentLoaded', function() {
    // Instant search functionality
    const searchForm = document.getElementById('trainer-search-form');
    const searchInput = searchForm.querySelector('input[name="q"]');
    const locationSelect = searchForm.querySelector('select[name="location"]');
    const yogaTypeSelect = searchForm.querySelector('select[name="yoga_type"]');
    
    // Debounce function to prevent rapid firing of search
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
    
    // Auto-submit form when filters change (with debounce)
    [locationSelect, yogaTypeSelect].forEach(select => {
        select.addEventListener('change', debounce(() => {
            searchForm.submit();
        }, 300));
    });
    
    // Auto-submit for search input with debounce
    searchInput.addEventListener('input', debounce(() => {
        searchForm.submit();
    }, 500));
    
    // Add loading indicator during search
    searchForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        
        // You could add a loading overlay here if you want
    });
    
    // Initialize any tooltips if needed
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});