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
  // JavaScript for the blog index page

// Create HTML for a blog post in the blog list
function createBlogPostHTML(post) {
  return `
      <article class="blog-post">
          <h2>${post.title}</h2>
          <div class="post-meta">
              <span class="date">${formatDate(post.createdAt)}</span>
              <span class="tags">${post.tags.join(', ')}</span>
          </div>
          <div class="post-content">
              <p>${post.excerpt}</p>
              <a href="post.html?slug=${post.slug}" class="read-more">Read More</a>
          </div>
      </article>
  `;
}

// Load all published blog posts
async function loadAllPosts() {
  const postsContainer = document.getElementById('blog-posts-container');
  if (!postsContainer) return;

  try {
      const posts = await fetchFromAPI('posts');
      
      if (!posts || posts.length === 0) {
          postsContainer.innerHTML = '<p>No posts found. Check back soon!</p>';
          return;
      }

      postsContainer.innerHTML = posts.map(post => createBlogPostHTML(post)).join('');
  } catch (error) {
      console.error('Error loading posts:', error);
      postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
  }
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  loadAllPosts();
});