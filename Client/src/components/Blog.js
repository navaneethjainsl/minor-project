// Blog.js
import React from 'react';
import './Sidebar.css';
// Import the BlogPostItem component
import BlogPage from './BlogPostItem';

const Blog = () => {
  return (
    <article className="about  active" data-page="about">
            <BlogPage />
            

        </article>
  );
};

export default Blog;
