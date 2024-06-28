import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import "./Sidebar.css";
import "./Homepage.css"; // Import custom CSS for additional styles

const Homepage = () => {
  const history = useHistory();
  const [blogPosts, setBlogPosts] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(""); // New state for upload status
  const fileInputRef = useRef(null); // Create a ref for the file input
  const [existingFiles, setExistingFiles] = useState([]); // State for existing files
  const [uploadCategory, setUploadCategory] = useState("Notes"); // New state for upload category
  const [filter, setFilter] = useState("All"); // State for filtering files
  const [hoveredPdf, setHoveredPdf] = useState(null); // State to track hovered PDF

  useEffect(() => {
    // Fetch the PDF data from the backend
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/pdfs",{
          withCredentials: true,
        });
        setBlogPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    // Fetch existing files
    const fetchExistingFiles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/home");
        setExistingFiles(response.data.files);
      } catch (error) {
        console.error("Error fetching existing files:", error);
      }
    };

    fetchBlogPosts();
    fetchExistingFiles();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", uploadCategory); // Include category in form data

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newPost = {
        title: file.name,
        category: uploadCategory,
        date: new Date().toISOString(),
        pdfUrl: response.data.fileUrl,
      };

      setBlogPosts([...blogPosts, newPost]); // Update uploaded files state
      setUploadStatus("Upload successful!"); // Set success message
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file. Please try again."); // Set error message
    }
  };

  const triggerFileInput = (category) => {
    setUploadCategory(category); // Set the category for the upload
    fileInputRef.current.click();
  };

  const handlePdfInteraction = (pdfUrl) => {
    history.push(`/pdf-summary?url=${encodeURIComponent(pdfUrl)}`);
  };

  const handleChatText = (pdfUrl) => {
    history.push(`/extract-text?url=${encodeURIComponent(pdfUrl)}`);
  };

  const handlePdfHover = (pdfUrl) => {
    setHoveredPdf(pdfUrl);
  };

  // Filter the files based on the selected filter
  const filteredFiles = existingFiles.filter(
    (file) => filter === "All" || file.category === filter
  );

  return (
    <div>
      <header>
        <h2 className="h2 article-title">Home</h2>
      </header>

      <section className="blog-posts">
        {/* Filter buttons */}
        <div className="filter-buttons" style={{ display: 'flex', padding: '29px 0px' }}>
          {["All", "Notes", "Quick Notes", "PYQ"].map((category) => (
            <button
              key={category}
              className={filter === category ? "active" : ""}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Render existing files as iframes */}
        <ul className="blog-posts-list">
          {filteredFiles.map((file, index) => (
            <li key={index}>
              {file.mimetype !==
                "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                file.mimetype !==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <div
                  className="pdf-container"
                  onMouseEnter={() => handlePdfHover(file.link)}
                  onMouseLeave={() => setHoveredPdf(null)}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                >
                  <iframe
                    title={file.name}
                    width="400"
                    height="350"
                    src={file.link}
                  ></iframe>
                  {hoveredPdf === file.link && (
                    <div className="pdf-interaction-options">
                      <button onClick={() => handlePdfInteraction(file.link)}>
                        PDF Summary
                      </button>
                      <button onClick={() => handleChatText(file.link)}>
                        Extract Text
                      </button>
                      {/* Add more interaction options as needed */}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {/* Render a message or handle differently if needed */}
                  <p>File type not supported for direct display.</p>
                  <a
                    href={file.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download {file.name}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Render uploaded files as iframes */}
        <ul className="blog-posts-list">
          {blogPosts.map((post, index) => (
            <li key={index}>
              {post.pdfUrl ? (
                <div
                  className="pdf-container"
                  onMouseEnter={() => handlePdfHover(post.pdfUrl)}
                  onMouseLeave={() => setHoveredPdf(null)}
                >
                  <iframe
                    title={post.title}
                    width="400"
                    height="350"
                    src={post.pdfUrl}
                  ></iframe>
                  {hoveredPdf === post.pdfUrl && (
                    <div className="pdf-interaction-options">
                      <button onClick={() => handlePdfInteraction(post.pdfUrl)}>
                        PDF Summary
                      </button>
                      <button onClick={() => handleChatText(post.pdfUrl)}>
                        Chat to text
                      </button>
                      {/* Add more interaction options as needed */}
                    </div>
                  )}
                </div>
              ) : (
                <p>{post.title} - Uploaded successfully</p>
              )}
            </li>
          ))}
        </ul>

        {/* Buttons for adding new documents */}
        <div className="add-new-document">
          {["Notes", "Quick Notes", "PYQ"].map((category) => (
            <button key={category} onClick={() => triggerFileInput(category)}>
              <IonIcon icon={addCircleOutline} size="large" />
              <span>{`Add ${category}`}</span>
            </button>
          ))}
        </div>

        {/* Hidden file input for uploading files */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </section>
    </div>
  );
};

export default Homepage;
