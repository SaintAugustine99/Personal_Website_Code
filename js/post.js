// js/post.js
document.addEventListener('DOMContentLoaded', async () => {
    const postContainer = document.querySelector('.single-post');
    const loadingElement = document.getElementById('post-loading');
    
    // Get the slug from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) {
      postContainer.innerHTML = '<div class="error">Post not found</div>';
      return;
    }
    
    try {
      // Fetch the specific post using the slug
      const response = await fetch(`/api/posts/${slug}`);
      
      if (!response.ok) {
        throw new Error('Post not found');
      }
      
      const post = await response.json();
      
      // Update the page title
      document.title = `${post.title} - Your Name`;
      
      // Create the post HTML
      const postHTML = `
        <h1>${post.title}</h1>
        <div class="post-meta">
          <span class="date">${new Date(post.createdAt).toLocaleDateString()}</span>
          <span class="tags">${post.tags.join(', ')}</span>
        </div>
        <div class="post-content">
          ${post.content}
        </div>
        <div class="post-navigation">
          <a href="index.html" class="back-to-blog">← Back to Blog</a>
        </div>
      `;
      
      // Replace the loading message with the post content
      postContainer.innerHTML = postHTML;
      loadingElement.remove();
    } catch (error) {
      console.error('Error fetching post:', error);
      postContainer.innerHTML = `
        <div class="error">
          <h2>Post Not Found</h2>
          <p>The requested blog post could not be found.</p>
          <a href="index.html" class="back-to-blog">← Back to Blog</a>
        </div>
      `;
      loadingElement.remove();
    }
  });