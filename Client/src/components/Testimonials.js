import React from 'react';
import './Sidebar.css';

// Import images directly
import avatar1 from '../logo/avatar-1.png';
import avatar2 from '../logo/avatar-2.png';
import avatar3 from '../logo/avatar-3.png';
import avatar4 from '../logo/avatar-4.png';

const TestimonialItem = ({ name, avatar, text }) => (
  <li className="testimonials-item">
    <div className="content-card" data-testimonials-item>
      <figure className="testimonials-avatar-box">
        <img src={avatar} alt={name} width="60" data-testimonials-avatar />
      </figure>
      <h4 className="h4 testimonials-item-title" data-testimonials-title>{name}</h4>
      <div className="testimonials-text" data-testimonials-text>
        <p>{text}</p>
      </div>
    </div>
  </li>
);

const Testimonials = () => (
  <section className="testimonials">
    <h3 className="h3 testimonials-title">Testimonials</h3>
    <ul className="testimonials-list has-scrollbar">
      <TestimonialItem
        name="Daniel Lewis"
        avatar={avatar1}
        text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
      />
      <TestimonialItem
        name="Jessica Miller"
        avatar={avatar2}
        text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
      />
      <TestimonialItem
        name="Emily Evans"
        avatar={avatar3}
        text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
      />
      <TestimonialItem
        name="Henry William"
        avatar={avatar4}
        text="Richard was hired to create a corporate identity. We were very pleased with the work done. She has a lot of experience and is very concerned about the needs of the client. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia."
      />
    </ul>
  </section>
);

export default Testimonials;
