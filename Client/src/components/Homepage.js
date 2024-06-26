import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import "./Sidebar.css";
import "./Homepage.css"; // Import custom CSS for additional styles

const Homepage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(""); // New state for upload status
  const fileInputRef = useRef(null); // Create a ref for the file input
  const [existingFiles, setExistingFiles] = useState([]); // State for existing files
  const [uploadCategory, setUploadCategory] = useState("Notes"); // New state for upload category

  useEffect(() => {
    // Fetch the PDF data from the backend
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/pdfs");
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

  return (
    <div>
      <header>
        <h2 className="h2 article-title">Home</h2>
      </header>

      <section className="blog-posts">
        {/* Render existing files as iframes */}
        <ul className="blog-posts-list">
          {existingFiles.map((file, index) => (
            <li key={index}>
              {file.mimetype !== "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
              file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <iframe
                  title={file.name}
                  width="400"
                  height="350"
                  src={file.link}
                ></iframe>
              ) : (
                <div>
                  {/* Render a message or handle differently if needed */}
                  <p>File type not supported for direct display.</p>
                  <a href={file.link} target="_blank" rel="noopener noreferrer">
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
                <iframe
                  title={post.title}
                  width="400"
                  height="350"
                  src={post.pdfUrl}
                ></iframe>
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
