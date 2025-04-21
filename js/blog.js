// js/blog.js
document.addEventListener('DOMContentLoaded', async () => {
    const blogPostsContainer = document.querySelector('.blog-posts');
    
    try {
      // Fetch posts from your API
      const response = await fetch('/api/posts');
      const posts = await response.json();
      
      if (posts.length === 0) {
        blogPostsContainer.innerHTML = '<p>No posts yet. Check back soon!</p>';
        return;
      }
      
      // Create HTML for each post
      const postsHTML = posts.map(post => `
        <article class="blog-post">
          <h2>${post.title}</h2>
          <div class="post-meta">
            <span class="date">${new Date(post.createdAt).toLocaleDateString()}</span>
            <span class="tags">${post.tags.join(', ')}</span>
          </div>
          <div class="post-content">
            <p>${post.excerpt}</p>
            <a href="/blog/post.html?slug=${post.slug}" class="read-more">Read More</a>
          </div>
        </article>
      `).join('');
      
      blogPostsContainer.innerHTML = postsHTML;
    } catch (error) {
      console.error('Error fetching posts:', error);
      blogPostsContainer.innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
    }
  });