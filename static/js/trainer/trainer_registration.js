document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('trainerRegistrationForm');
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const submitButton = document.querySelector('.btn-submit');
    const successModal = document.getElementById('successModal');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Image Preview
    const imageUpload = document.getElementById('id_profile_image');
    const previewImage = document.getElementById('previewImage');
    
    if (imageUpload) {
        imageUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    document.querySelector('.upload-text').style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Form Navigation
    let currentSection = 0;
    
    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
        
        // Scroll to top of form
        window.scrollTo({
            top: form.offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateCurrentSection()) {
                currentSection++;
                showSection(currentSection);
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentSection--;
            showSection(currentSection);
        });
    });
    
    // Form Validation
    function validateCurrentSection() {
        const currentSectionEl = sections[currentSection];
        let isValid = true;
        
        // Clear previous errors
        currentSectionEl.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        // Validate required fields in current section
        const requiredFields = currentSectionEl.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                const errorId = field.id ? `${field.id}-error` : '';
                const errorEl = document.getElementById(errorId) || field.closest('.form-group').querySelector('.error-message');
                errorEl.textContent = 'This field is required';
                errorEl.style.display = 'block';
                isValid = false;
                
                // Highlight the field
                field.style.borderColor = '#e63946';
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                });
            }
        });
        
        // Special validation for yoga types
        if (currentSection === 1) { // Specialization section
            const checkedTypes = currentSectionEl.querySelectorAll('input[name="yoga_types"]:checked');
            if (checkedTypes.length === 0) {
                const errorEl = document.getElementById('yoga-types-error');
                errorEl.textContent = 'Please select at least one yoga type';
                errorEl.style.display = 'block';
                isValid = false;
            }
        }
        
        // If we're moving to review section, prepare the review
        if (isValid && currentSection === 2) {
            prepareReviewData();
        }
        
        return isValid;
    }
    
    // Prepare review data
    function prepareReviewData() {
        // Personal Info
        document.getElementById('review-name').textContent = document.getElementById('id_name').value;
        document.getElementById('review-phone').textContent = document.getElementById('id_phone').value || 'Not provided';
        document.getElementById('review-location').textContent = document.getElementById('id_location').value;
        
        // Profile Image
        const reviewImage = document.getElementById('review-image');
        reviewImage.innerHTML = '';
        if (imageUpload.files.length > 0) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(imageUpload.files[0]);
            reviewImage.appendChild(img);
        } else {
            const defaultImg = document.createElement('img');
            defaultImg.src = "{% static 'media/default-trainer.webp' %}";
            reviewImage.appendChild(defaultImg);
        }
        
        // Specialization
        document.getElementById('review-specialty').textContent = document.getElementById('id_specialty').value;
        
        // Yoga Types
        const selectedTypes = Array.from(document.querySelectorAll('input[name="yoga_types"]:checked'))
            .map(el => el.nextElementSibling.textContent)
            .join(', ');
        document.getElementById('review-yoga-types').textContent = selectedTypes || 'None selected';
        
        // Social Media
        const socialContainer = document.getElementById('review-social');
        socialContainer.innerHTML = '';
        
        const socialInputs = document.querySelectorAll('.social-input input');
        socialInputs.forEach(input => {
            if (input.value) {
                const platform = input.previousElementSibling.className.split(' ')[1].replace('fa-', '');
                const link = document.createElement('a');
                link.href = input.value;
                link.target = '_blank';
                link.title = platform;
                
                const icon = document.createElement('i');
                icon.className = `fab fa-${platform}`;
                
                link.appendChild(icon);
                socialContainer.appendChild(link);
            }
        });
        
        if (socialContainer.children.length === 0) {
            socialContainer.textContent = 'None provided';
        }
        
        // Experience
        document.getElementById('review-experience').textContent = 
            `${document.getElementById('id_years_experience').value} year(s)`;
        document.getElementById('review-bio').textContent = document.getElementById('id_bio').value;
    }
    
    // Form Submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate the entire form before submission
        let allValid = true;
        for (let i = 0; i < sections.length - 1; i++) {
            if (!validateSection(i)) {
                allValid = false;
                currentSection = i;
                showSection(currentSection);
                break;
            }
        }

        if (!allValid) return;

        // Show loading
        loadingOverlay.style.display = 'flex';
        submitButton.disabled = true;

        try {
            const formData = new FormData(form);

            // Convert checked yoga_types into multiple values
            const yogaTypes = Array.from(document.querySelectorAll('input[name="yoga_types"]:checked'))
                .map(el => el.value);
            formData.delete('yoga_types'); // remove existing
            yogaTypes.forEach(type => formData.append('yoga_types', type)); // add all checked

            // Combine social links into JSON string
            const socialMedia = {
                instagram: formData.get('instagram'),
                facebook: formData.get('facebook'),
                youtube: formData.get('youtube')
            };
            formData.set('social_media_links', JSON.stringify(socialMedia));

        // Get CSRF token from cookie
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

            const csrftoken = getCookie('csrftoken');

            // Send POST request
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrftoken
                }
            });

            const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            if (response.ok && data.success) {
                successModal.style.display = 'flex';
                form.reset();
                currentSection = 0;
                showSection(currentSection);
            } else {
                alert(data.message || 'Something went wrong. Please try again.');
            }
        } else {
            const text = await response.text();
            console.warn('Server returned HTML instead of JSON:', text);
            alert('Form submitted but response is not JSON. Check console for details.');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('An unexpected error occurred.');
    } finally {
        loadingOverlay.style.display = 'none';
        submitButton.disabled = false;
    }
});


    // Helper function to validate specific section
    function validateSection(index) {
        const section = sections[index];
        let isValid = true;
        
        const requiredFields = section.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });
        
        // Special validation for yoga types
        if (index === 1) {
            const checkedTypes = section.querySelectorAll('input[name="yoga_types"]:checked');
            if (checkedTypes.length === 0) {
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
});