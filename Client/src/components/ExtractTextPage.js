import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ExtractTextPage.css";

const ExtractTextPage = () => {
  const location = useLocation();
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    const fetchExtractedText = async () => {
      const urlParams = new URLSearchParams(location.search);
      const pdfUrl = urlParams.get("url");

      try {
        const response = await axios.get(
          `http://localhost:3000/pdfText?url=${encodeURIComponent(pdfUrl)}`,{
            withCredentials: true,
          }
        );
        // console.log("response.data.text");
        // console.log(response.data.content);
        setExtractedText(response.data.content);
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
      }
    };

    fetchExtractedText();
  }, [location.search]);

  return (
    <div style={{padding:'20px'}}>
      <h2 style={{color:'white',padding:'20px'}}>Extracted Text</h2>
      <iframe
        title="PDF"
        width="600"
        height="500"
        src={new URLSearchParams(location.search).get("url")}
      ></iframe>
      <div>
        <h3 style={{color:'white',padding:'20px'}}>Extracted Text:</h3>
        {/* <p>{extractedText}</p> */}
        {/* {console.log("extractedText")}
        {console.log(extractedText)} */}
        <textarea value={extractedText} ></textarea>
        {/* <textarea value={extractedText} readOnly /> */}
      </div>
    </div>
  );
};

export default ExtractTextPage;
