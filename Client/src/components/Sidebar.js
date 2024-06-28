import React from "react";
import "./Sidebar.css";
// import avatar from './assets/images/my-avatar.png';
import avatar from "../logo/my-avatar.png";
import { IonIcon } from "@ionic/react";
import {
  mailOutline,
  phonePortraitOutline,
  calendarOutline,
  locationOutline,
  logoFacebook,
  logoTwitter,
  logoInstagram,
} from "ionicons/icons";
import { chevronDown } from "ionicons/icons";

const Sidebar = () => {
  return (
    <aside className="sidebar" data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={avatar} alt="Richard Hanrick" width="80" />
        </figure>
        <div className="info-content">
          <h1 className="name" title="Richard Hanrick">
            Navaneeth Jain S.L.
          </h1>
          <p className="title">Web Developer</p>
        </div>
        <button className="info_more-btn" data-sidebar-btn>
          <span>Show Contacts</span>
          <IonIcon icon={chevronDown} />
        </button>
      </div>
      <div className="sidebar-info_more">
        <div className="separator"></div>
        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <IonIcon icon={mailOutline} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:richard@example.com" className="contact-link">
                navaneethjainsl@gmail.com
              </a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <IonIcon icon={phonePortraitOutline} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+12133522795" className="contact-link">
                +91 9449108090
              </a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <IonIcon icon={calendarOutline} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime="1982-06-23">July 10, 2003</time>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <IonIcon icon={locationOutline} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Mysore, Karnataka, USA</address>
            </div>
          </li>
        </ul>
        <div className="separator"></div>
        <ul className="social-list">
          <li className="social-item">
            <a href="https://www.facebook.com" className="social-link" target="_blank">
              <IonIcon icon={logoFacebook} />
            </a>
          </li>
          <li className="social-item">
            <a href="https://x.com/navaneethjainsl" className="social-link" target="_blank">
              <IonIcon icon={logoTwitter} />
            </a>
          </li>
          <li className="social-item">
            <a href="https://www.instagram.com/navaneethjains.l/" className="social-link" target="_blank">
              <IonIcon icon={logoInstagram} />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
