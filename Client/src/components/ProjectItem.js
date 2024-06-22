// ProjectItem.js
import React from 'react';

const ProjectItem = ({ category, title, imgSrc, imgAlt }) => {
  return (
    <li className={`project-item active`} data-filter-item data-category={category}>
      <a href="#">
        <figure className="project-img">
          <div className="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src={imgSrc} alt={imgAlt} loading="lazy" />
        </figure>
        <h3 className="project-title">{title}</h3>
        <p className="project-category">{category}</p>
      </a>
    </li>
  );
};

export default ProjectItem;
