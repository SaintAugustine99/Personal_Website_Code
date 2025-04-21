// JavaScript for the resume page

// Function to handle resume download
function setupResumeDownload() {
    // Get both download buttons (top and bottom of page)
    const downloadButtons = document.querySelectorAll('#download-resume, #download-resume-bottom');
    
    // Add click event listener to each button
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // In a real implementation, this would trigger a download of an actual PDF file
            // For now, we'll just alert the user
            alert('In a production environment, this would download a PDF version of the resume.\n\nTo implement this fully, you would need to:\n1. Create a PDF version of your resume\n2. Upload it to your server\n3. Update these links to point to the actual PDF file.');
            
            // To implement actual download:
            // window.location.href = '/path/to/onserio-ogeto-resume.pdf';
        });
    });
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupResumeDownload();
});