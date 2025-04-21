// JavaScript for the contact page

// Handle contact form submission
async function handleContactForm() {
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  
  if (!form || !formMessage) return;

  form.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      // Clear previous messages
      formMessage.style.display = 'none';
      formMessage.className = 'alert';
      
      // Get form data
      const formData = {
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value
      };
      
      try {
          // Send data to backend
          const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
          
          const data = await response.json();
          
          if (data.success) {
              // Show success message
              formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
              formMessage.classList.add('alert-success');
              form.reset(); // Clear the form
          } else {
              // Show error message
              formMessage.textContent = data.message || 'There was an error sending your message. Please try again.';
              formMessage.classList.add('alert-error');
          }
      } catch (error) {
          console.error('Error submitting form:', error);
          formMessage.textContent = 'There was an error sending your message. Please try again later.';
          formMessage.classList.add('alert-error');
      }
      
      // Display the message
      formMessage.style.display = 'block';
      
      // Scroll to message
      formMessage.scrollIntoView({ behavior: 'smooth' });
  });
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  handleContactForm();
});