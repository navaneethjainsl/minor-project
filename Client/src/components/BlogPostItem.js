import React from 'react';
import blog1 from '../logo/blog-1.jpg';
import blog2 from '../logo/blog-2.jpg';
import blog3 from '../logo/blog-3.jpg';
import blog4 from '../logo/blog-4.jpg';
import blog5 from '../logo/blog-5.jpg';
import blog6 from '../logo/blog-6.jpg';
import './Sidebar.css';

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'Design conferences in 2022',
      category: 'Design',
      date: '2022-02-23',
      imgSrc: blog1,
      alt: 'Design conferences in 2022',
      text: 'Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    },
    {
      title: 'Best fonts every designer',
      category: 'Design',
      date: '2022-02-23',
      imgSrc: blog2,
      alt: 'Best fonts every designer',
      text: 'Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.',
    },
    {
      title: 'Design digest #80',
      category: 'Design',
      date: '2022-02-23',
      imgSrc: blog3,
      alt: 'Design digest #80',
      text: 'Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.',
    },
    {
      title: 'UI interactions of the week',
      category: 'Design',
      date: '2022-02-23',
      imgSrc: blog4,
      alt: 'UI interactions of the week',
      text: 'Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.',
    },
    {
      title: 'The forgotten art of spacing',
      category: 'Design',
      date: '2022-02-23',
      imgSrc: blog5,
      alt: 'The forgotten art of spacing',
      text: 'Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Design digest #79',
      category: 'Design',
      date: '2022-02-23',
      imgSrc: blog6,
      alt: 'Design digest #79',
      text: 'Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.',
    },
  ];

  return (
    <div>
      <header>
        <h2 className="h2 article-title">Blog</h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {blogPosts.map((post, index) => (
            <li className="blog-post-item" key={index}>
              <a href="#">
                <figure className="blog-banner-box">
                  <img src={post.imgSrc} alt={post.alt} loading="lazy" />
                </figure>
                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.category}</p>
                    <span className="dot"></span>
                    <time dateTime={post.date}>{new Date(post.date).toDateString()}</time>
                  </div>
                  <h3 className="h3 blog-item-title">{post.title}</h3>
                  <p className="blog-text">{post.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BlogPage;
