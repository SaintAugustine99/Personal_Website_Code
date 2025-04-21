// Add this to your main.js or create a new contact.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
          });
          
          const result = await response.json();
          
          if (result.success) {
            alert('Thank you! Your message has been sent.');
            contactForm.reset();
          } else {
            alert('There was an error sending your message. Please try again.');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('There was an error sending your message. Please try again.');
        }
      });
    }
  });