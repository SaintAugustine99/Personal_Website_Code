/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
}

a {
    text-decoration: none;
    color: #0066cc;
}

a:hover {
    text-decoration: underline;
}

/* Header and Navigation */
header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li {
    margin-left: 2rem;
}

.nav-links a {
    color: #555;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-links a:hover, .nav-links a.active {
    color: #0066cc;
    text-decoration: none;
}

/* Main content */
main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 5%;
}

section {
    margin-bottom: 4rem;
}

h1, h2, h3 {
    margin-bottom: 1rem;
    color: #333;
}

h1 {
    font-size: 2.5rem;
}

h2 {
    font-size: 2rem;
}

h3 {
    font-size: 1.5rem;
}

p {
    margin-bottom: 1rem;
}

/* Hero section */
.hero {
    text-align: center;
    padding: 5rem 1rem;
    background-color: #e9f2fd;
    border-radius: 8px;
    margin-bottom: 3rem;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    color: #555;
}

/* About section */
.about-content {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.about-image {
    flex: 1;
    max-width: 300px;
}

.about-image img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.about-text {
    flex: 2;
}

/* Blog styles */
.blog-header {
    text-align: center;
    margin-bottom: 3rem;
}

.blog-post {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    margin-bottom: 2rem;
}

.post-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 1rem;
}

.read-more {
    display: inline-block;
    margin-top: 1rem;
    font-weight: 500;
}

/* Contact page */
.contact-header {
    text-align: center;
    margin-bottom: 3rem;
}

.contact-form {
    max-width: 600px;
    margin: 0 auto 3rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
}

.btn {
    background-color: #0066cc;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #0052a3;
}

.contact-info {
    max-width: 600px;
    margin: 0 auto;
}

.contact-methods {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
}

.contact-method {
    flex: 1;
}

.social-list {
    list-style: none;
}

.social-list li {
    margin-bottom: 0.5rem;
}

/* Footer */
footer {
    background-color: #333;
    color: white;
    padding: 2rem 5%;
    text-align: center;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.social-links a {
    color: white;
    font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
    .about-content {
        flex-direction: column;
        text-align: center;
    }
    
    .about-image {
        margin: 0 auto 2rem;
    }
    
    .contact-methods {
        flex-direction: column;
    }
    
    .nav-links li {
        margin-left: 1rem;
    }
}