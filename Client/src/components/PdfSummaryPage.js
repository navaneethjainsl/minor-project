import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ExtractTextPage.css";

const PdfSummaryPage = () => {
  const location = useLocation();
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      const urlParams = new URLSearchParams(location.search);
      const pdfUrl = urlParams.get("url");

      try {
        const response = await axios.post(
          `http://localhost:3000/pdfSummary`,
          { url: pdfUrl },
          {
            withCredentials: true,
          }
        );
        setSummary(response.data.summary);
      } catch (error) {
        console.error("Error fetching PDF summary:", error);
      }
    };

    fetchSummary();
  }, [location.search]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'white', padding: '20px' }}>PDF Summary</h2>
      <iframe
        title="PDF"
        width="600"
        height="500"
        src={new URLSearchParams(location.search).get("url")}
      ></iframe>
      <div>
        <h3 style={{ color: 'white', padding: '20px' }}>Summary:</h3>
        <textarea value={summary} readOnly style={{ width: '100%', height: '300px' }} />
      </div>
    </div>
  );
};

export default PdfSummaryPage;
