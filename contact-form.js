// Contact Form Handler for MongoDB
// Configure your backend URL here
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://your-render-backend-url.onrender.com';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get values directly from DOM
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate
            if (!name || !email || !subject || !message) {
                formMessage.textContent = 'Please fill in all required fields (Name, Email, Subject, Message)';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            formMessage.textContent = '';
            formMessage.className = 'form-message';

            try {
                const data = { name, email, phone, subject, message };
                
                const response = await fetch(`${BACKEND_URL}/api/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();

                if (response.ok) {
                    // Success
                    formMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    // Error from server
                    formMessage.textContent = responseData.message || 'Something went wrong. Please try again.';
                    formMessage.className = 'form-message error';
                }
            } catch (error) {
                // Network error or other issues
                console.error('Error:', error);
                formMessage.textContent = 'Unable to send message. Please check your connection or try again later.';
                formMessage.className = 'form-message error';
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }
});

