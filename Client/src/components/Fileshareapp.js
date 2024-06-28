import React, { useState, useRef } from "react";
import axios from "axios";
import "./Fileshare.css"; // Custom CSS for styling
import uploadIcon from "./logo123.png"; // Import your PNG file

axios.defaults.withCredentials = true;

const Fileshare = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [fileId, setFileId] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/smash", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });

      setShareLink(response.data.downloadURL);
      console.log(response.data)
      setFileId(response.data.code);
      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading the file:", error);
      setUploadStatus("Error uploading the file. Please try again.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return ( <>
      <header>
        <h2 className="article-title" style={{color:'white'}}>Share Files</h2>
      </header>
    <div className="fileshare-container">

      <div className="upload-section">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button className="upload-button" onClick={handleButtonClick} style={{width:'176px',height:'176px'}}>
          {/* No text inside the button, use the image */}
        </button>
      </div>

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      {/* {shareLink && (
        <div className="share-link">
          <p>
            Shareable Link:{" "}
            <button onClick={() => copyToClipboard(shareLink)}>
              Copy Link
            </button>
          </p>
          <a href={shareLink} target="_blank" rel="noopener noreferrer">
            {shareLink}
          </a>
        </div>
      )} */}
      {console.log(fileId)}
      {fileId && (
        <div className="file-id">
          <p>
            File ID:{" "}
            <button onClick={() => copyToClipboard(fileId)}>
              Copy ID
            </button>
          </p>
          <span>{fileId}</span>
        </div>
      )}
    </div>
    </>
  );
};

export default Fileshare;
