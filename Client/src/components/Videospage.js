import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDown, eyeOutline } from "ionicons/icons";
import "./Videopage.css"; // Assuming you have some custom CSS for this page

const Videospage = () => {
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projects = [
    { title: "Mathematics Basics", category: "Mathematics", videoUrl: "https://www.youtube.com/embed/NWxoRX3KU0g", alt: "mathematics" },
    { title: "Physics Fundamentals", category: "Physics", videoUrl: "https://www.youtube.com/embed/EkpR6TtMSv0", alt: "physics" },
    { title: "Chemistry Concepts", category: "Chemistry", videoUrl: "https://www.youtube.com/embed/JN0XsRIlY6w", alt: "chemistry" },
    { title: "Computer Science Principles", category: "Computer Science", videoUrl: "https://www.youtube.com/embed/zOjov-2OZ0E", alt: "computer science" },
    { title: "Biology Basics", category: "Biology", videoUrl: "https://www.youtube.com/embed/2uU_u_UaV2U", alt: "biology" },
    { title: "Literature Analysis", category: "Literature", videoUrl: "https://www.youtube.com/embed/_S6ht8BQPx0", alt: "literature" },
    { title: "History Lessons", category: "History", videoUrl: "https://www.youtube.com/embed/6EY0PRA2Ekg", alt: "history" },
    { title: "Economics Explained", category: "Economics", videoUrl: "https://www.youtube.com/embed/QwzvNAAqH3g", alt: "economics" },
    { title: "Geography Insights", category: "Geography", videoUrl: "https://www.youtube.com/embed/IsIqg1eRtJo", alt: "geography" },
  ];

  const categories = ["All", "Mathematics", "Physics", "Chemistry", "Computer Science", "Biology", "Literature", "History", "Economics", "Geography"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setFilter(category);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <header>
        <h2 className="h2 article-title">Videos</h2>
      </header>

      <section className="projects">
        <ul className="filter-list" >
          {categories.map((category, index) => (
            <li className="filter-item" key={index}>
              <button
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        <div className="filter-select-box">
          <button
            className="filter-select"
            data-select
            onClick={handleDropdownToggle}
          >
            <div className="select-value" data-select-value>
              {filter}
            </div>
            <div className="select-icon">
              <IonIcon icon={chevronDown} />
            </div>
          </button>

          {isDropdownOpen && (
            <ul className="select-list">
              {categories.map((category, index) => (
                <li className="select-item" key={index}>
                  <button
                    data-select-item
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <ul className="project-list">
          {filteredProjects.map((project, index) => (
            <li
              className="project-item active"
              data-filter-item
              data-category={project.category.toLowerCase()}
              key={index}
            >
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <IonIcon icon={eyeOutline} />
                  </div>
                  <iframe
                    width="100%"
                    height="200"
                    src={project.videoUrl}
                    title={project.alt}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Videospage;
