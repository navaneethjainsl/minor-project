import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronDown, eyeOutline } from "ionicons/icons";
import "./Videopage.css"; // Assuming you have some custom CSS for this page

const Videospage = () => {
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projects = [
    
    
    { title: "Lec01: Introduction to Operating Systems", category: "Operating Systems", videoUrl: "https://www.youtube.com/embed/nqOxuy4TUEg?si=VsOttSd4yVahVlvR", alt: "Operating Systems" },
    { title: "Lec02: Process Concept block", category: "Operating Systems", videoUrl: "https://www.youtube.com/embed/i5XZ4CopYvg?si=PTPglxtkFnwocEtS", alt: "Operating Systems" },
    { title: "Lec03: Process State Diagram ,Process life Cycle ", category: "Operating Systems", videoUrl: "https://www.youtube.com/embed/i5XZ4CopYvg?si=qeA8W6pViEgr_ziX", alt: "Operating Systems" },
    { title: "Lec04: Operations on Processes", category: "Operating Systems", videoUrl: "https://www.youtube.com/embed/qAHxZQPDgcE?si=FLeIdqY_tuASjPPO", alt: "Operating Systems" },
    { title: "Lec05: Concept of threads in Operating system", category: "Operating Systems", videoUrl: "https://www.youtube.com/embed/SudcluecvZc?si=ZRygJiYfvL4dx_CD", alt: "Operating Systems" },
    { title: "Lec06:Types of Threads in Operating Systems", category: "Operating Systems", videoUrl: "https://www.youtube.com/embed/evfkLYJry-I?si=SEjhFVtwIMtJm6VW", alt: "Operating Systems" },
    { title: "Lec01: Introduction to Analysis and Design of Algorithms", category: "ADA", videoUrl: "https://www.youtube.com/embed/Xuazz1ouN9U?si=ERKvLarQnA49IPfx", alt: "ADA" },
    { title: "Lec02: Importance of Specifying input to Algorithm explicitly and Carefully", category: "ADA", videoUrl: "https://www.youtube.com/embed/n-10eNqYgXE?si=fpHwztBGGG0DTCSc", alt: "ADA" },
    { title: "Lec03: Sequence of Steps followed during the Design and Analysis of AlgorithmS", category: "ADA", videoUrl: "https://www.youtube.com/embed/Dpn2tCXOlgk?si=SoQwzBjvFIp1hQC6", alt: "ADA" },
    { title: "Lec04 : Analysis Framework and Order of Growth", category: "ADA", videoUrl: "https://www.youtube.com/embed/6inFhFxtLHU?si=mMiXA1C6IT7hlzys", alt: "ADA" },
    { title: "Lec05: Frequency Count Method to find the Running time of an Algorithm", category: "ADA", videoUrl: "https://www.youtube.com/embed/ysmNC2X_SrU?si=O4JWx680Vh1Xc_pf", alt: "Computer Networks" },
    { title: "Lec01- Types of Networks", category: "Computer Networks", videoUrl: "https://www.youtube.com/embed/50BKR5qxm5U?si=e3q5cTQTO6gbhJHk", alt: "Computer Networks" },
    { title: "Lec02-Network Layer Services", category: "Computer Networks", videoUrl: "https://www.youtube.com/embed/RHkf0MrCS8s?si=HE2we_LP-5WCz7Lc", alt: "Computer Networks" },
    { title: "Lec03-Network layer Performance(Part-1): Types of Delay in Networks", category: "Computer Networks", videoUrl: "https://www.youtube.com/embed/Qs9ztgCaVOo?si=1uKFD6AUYVb42TRB", alt: "Computer Networks" },
    { title: "Lec04- Throghput and Packet loss", category: "Computer Networks", videoUrl: "https://www.youtube.com/embed/pjhJtu5xfoM?si=5HzDr8GNYz2d2AlK", alt: "Computer Networks" },
    { title: "Lec05-Open Loop and closed Loop congestion control", category: "Computer Networks", videoUrl: "https://www.youtube.com/embed/KCTQmtWg82Q?si=c9wiJcPy2OB-eKll", alt: "Computer Networks" },
  ];

  const categories = ["All", "Operating Systems", "ADA", "Computer Networks"];

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
