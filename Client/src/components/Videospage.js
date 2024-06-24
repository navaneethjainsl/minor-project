import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDown, eyeOutline } from "ionicons/icons";
import proj1 from "../logo/project-1.jpg";
import proj2 from "../logo/project-2.png";
import proj3 from "../logo/project-3.jpg";
import proj4 from "../logo/project-4.png";
import proj5 from "../logo/project-5.png";
import proj6 from "../logo/project-6.png";
import proj7 from "../logo/project-7.png";
import proj8 from "../logo/project-8.jpg";
import proj9 from "../logo/project-9.png";

const Videospage = () => {
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projects = [
    { title: "Finance", category: "PYQ", imgSrc: proj1, alt: "finance" },
    { title: "Orizon", category: "PYQ", imgSrc: proj2, alt: "orizon" },
    { title: "Fundo", category: "Notes", imgSrc: proj3, alt: "fundo" },
    {
      title: "Brawlhalla",
      category: "Quick Notes",
      imgSrc: proj4,
      alt: "brawlhalla",
    },
    { title: "DSM.", category: "Notes", imgSrc: proj5, alt: "dsm" },
    { title: "MetaSpark", category: "Notes", imgSrc: proj6, alt: "metaspark" },
    { title: "Summary", category: "PYQ", imgSrc: proj7, alt: "summary" },
    {
      title: "Task Manager",
      category: "Quick Notes",
      imgSrc: proj8,
      alt: "task manager",
    },
    { title: "Arrival", category: "PYQ", imgSrc: proj9, alt: "arrival" },
  ];

  const categories = ["All", "Notes", "Quick Notes", "PYQ"];

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
        <ul className="filter-list">
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
            <div className="select-value" data-selecct-value>
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
              <a href="#">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <IonIcon icon={eyeOutline} />
                  </div>
                  <img src={project.imgSrc} alt={project.alt} loading="lazy" />
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
