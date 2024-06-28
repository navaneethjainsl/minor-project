import React, { useState, useEffect } from "react";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { bookOutline } from "ionicons/icons";

const Announcementpage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:3000/announcements",{
          withCredentials: true,
        });
        const { college, placements } = response.data.message;
        setAnnouncements(college);
        setNotifications(placements);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <header>
        <h2 className="h2 article-title">Announcements</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon icon={bookOutline} />
          </div>
          <h3 className="h3">College Announcements</h3>
        </div>

        <ol className="timeline-list">
          {announcements.map((announcement, index) => (
            <li key={index} className="timeline-item">
              
              <a href={announcement.link} target="_blank" rel="noopener noreferrer">
              <h4 className="h4 timeline-item-title">{announcement.topic}</h4>
              </a>
              <span>{announcement.date}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon icon={bookOutline} />
          </div>
          <h3 className="h3">Placement Notifications</h3>
        </div>

        <ol className="timeline-list">
          {notifications.map((notification, index) => (
            <li key={index} className="timeline-item">
              
              <a href={notification.link} target="_blank" rel="noopener noreferrer">
              <h4 className="h4 timeline-item-title">{notification.topic}</h4>
              </a>
              <span>{notification.date}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default Announcementpage;
