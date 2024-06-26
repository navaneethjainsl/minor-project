// import React, { useState } from "react";
// import { IonIcon } from "@ionic/react";
// import { chevronDown } from "ionicons/icons";
// import blog1 from "../logo/blog-1.jpg";
// import blog2 from "../logo/blog-2.jpg";
// import blog3 from "../logo/blog-3.jpg";
// import blog4 from "../logo/blog-4.jpg";
// import blog5 from "../logo/blog-5.jpg";
// import blog6 from "../logo/blog-6.jpg";
// import "./Sidebar.css";

// const Homepage = () => {
//   const [filter, setFilter] = useState("All");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const blogPosts = [
//     {
//       title: "Design conferences in 2022",
//       category: "Design",
//       date: "2022-02-23",
//       imgSrc: blog1,
//       alt: "Design conferences in 2022",
//       text: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
//     },
//     {
//       title: "Best fonts every designer",
//       category: "Design",
//       date: "2022-02-23",
//       imgSrc: blog2,
//       alt: "Best fonts every designer",
//       text: "Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.",
//     },
//     {
//       title: "Design digest #80",
//       category: "Design",
//       date: "2022-02-23",
//       imgSrc: blog3,
//       alt: "Design digest #80",
//       text: "Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.",
//     },
//     {
//       title: "UI interactions of the week",
//       category: "Design",
//       date: "2022-02-23",
//       imgSrc: blog4,
//       alt: "UI interactions of the week",
//       text: "Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.",
//     },
//     {
//       title: "The forgotten art of spacing",
//       category: "Design",
//       date: "2022-02-23",
//       imgSrc: blog5,
//       alt: "The forgotten art of spacing",
//       text: "Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       title: "Design digest #79",
//       category: "Design",
//       date: "2022-02-23",
//       imgSrc: blog6,
//       alt: "Design digest #79",
//       text: "Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.",
//     },
//     {
//       title: "Typography in web design",
//       category: "Notes",
//       date: "2022-02-23",
//       imgSrc: blog1,
//       alt: "Typography in web design",
//       text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec erat.",
//     },
//     {
//       title: "Color theory basics",
//       category: "Quick Notes",
//       date: "2022-02-23",
//       imgSrc: blog2,
//       alt: "Color theory basics",
//       text: "Integer accumsan, urna id condimentum viverra, felis nunc ultrices eros.",
//     },
//     {
//       title: "Financial management",
//       category: "PYQ",
//       date: "2022-02-23",
//       imgSrc: blog3,
//       alt: "Financial management",
//       text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
//     },
//   ];

//   const categories = ["All", "Notes", "Quick Notes", "PYQ"];

//   const filteredBlogPosts =
//     filter === "All"
//       ? blogPosts
//       : blogPosts.filter((post) => post.category === filter);

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleCategorySelect = (category) => {
//     setFilter(category);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div>
//       <header>
//         <h2 className="h2 article-title">Home</h2>
//       </header>

//       <section className="blog-posts">
//         <ul className="filter-list">
//           {categories.map((category, index) => (
//             <li className="filter-item" key={index}>
//               <button
//                 className={filter === category ? "active" : ""}
//                 onClick={() => setFilter(category)}
//               >
//                 {category}
//               </button>
//             </li>
//           ))}
//         </ul>

//         <div className="filter-select-box">
//           <button
//             className="filter-select"
//             data-select
//             onClick={handleDropdownToggle}
//           >
//             <div className="select-value" data-select-value>
//               {filter}
//             </div>
//             <div className="select-icon">
//               <IonIcon icon={chevronDown} />
//             </div>
//           </button>

//           {isDropdownOpen && (
//             <ul className="select-list">
//               {categories.map((category, index) => (
//                 <li className="select-item" key={index}>
//                   <button
//                     data-select-item
//                     onClick={() => handleCategorySelect(category)}
//                   >
//                     {category}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <ul className="blog-posts-list">
//           {filteredBlogPosts.map((post, index) => (
//             <li
//               className="blog-post-item"
//               data-filter-item
//               data-category={post.category.toLowerCase()}
//               key={index}
//             >
//               <a href="#">
//                 <figure className="blog-banner-box">
//                   <img src={post.imgSrc} alt={post.alt} loading="lazy" />
//                 </figure>
//                 <div className="blog-content">
//                   <div className="blog-meta">
//                     <p className="blog-category">{post.category}</p>
//                     <span className="dot"></span>
//                     <time dateTime={post.date}>
//                       {new Date(post.date).toDateString()}
//                     </time>
//                   </div>
//                   <h3 className="h3 blog-item-title">{post.title}</h3>
//                   <p className="blog-text">{post.text}</p>
//                 </div>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default Homepage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { chevronDown } from "ionicons/icons";
import "./Sidebar.css";
import "./Homepage.css"; // Import custom CSS for additional styles

const Homepage = () => {
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // New state for upload status

  useEffect(() => {
    // Fetch the PDF data from the backend
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("/api/pdfs");
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  const categories = ["All","Notes", "Quick Notes", "PYQ"];

  const filteredBlogPosts =
    filter === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === filter);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setFilter(category);
    setIsDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming the response contains the new file info
      const newPost = {
        title: file.name,
        category: "Design", // You might want to change this to allow user input
        date: new Date().toISOString(),
        pdfUrl: response.data.fileUrl,
      };

      setBlogPosts([...blogPosts, newPost]);
      setFile(null);
      setUploadStatus("Upload successful!"); // Set success message
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file. Please try again."); // Set error message
    }
  };

  return (
    <div>
      <header>
        <h2 className="h2 article-title">Home</h2>
      </header>

      <section className="blog-posts">
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

        <ul className="blog-posts-list">
          {filteredBlogPosts.map((post, index) => (
            <li
              className="blog-post-item"
              data-filter-item
              data-category={post.category.toLowerCase()}
              key={index}
            >
              <a href={post.pdfUrl} target="_blank" rel="noopener noreferrer">
                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.category}</p>
                    <span className="dot"></span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toDateString()}
                    </time>
                  </div>
                  <h3 className="h3 blog-item-title">{post.title}</h3>
                  <p className="blog-text">{post.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        {filter === "All" && (
          <section className="upload-form-section">
            <h2 className="h2">Upload New Document</h2>
            <form className="upload-form" onSubmit={handleUpload}>
              <input type="file" onChange={handleFileChange} className="file-input" />
              <button type="submit" className="upload-button">Upload</button>
            </form>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>} {/* Display upload status */}
          </section>
        )}
      </section>
    </div>
  );
};

export default Homepage;
