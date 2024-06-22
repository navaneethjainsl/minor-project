import React from 'react';
import designIcon from '../logo/icon-design.svg';
import devIcon from '../logo/icon-dev.svg';
import appIcon from '../logo/icon-app.svg';
import photoIcon from '../logo/icon-photo.svg';

const ServiceSection = () => {
  return (
    <section className="service">
      <h3 className="h3 service-title">What I'm doing</h3>
      <ul className="service-list">
        <li className="service-item">
          <div className="service-icon-box">
            <img src={designIcon} alt="design icon" width="40" />
          </div>
          <div className="service-content-box">
            <h4 className="h4 service-item-title">Web design</h4>
            <p className="service-item-text">
              The most modern and high-quality design made at a professional level.
            </p>
          </div>
        </li>
        <li className="service-item">
          <div className="service-icon-box">
            <img src={devIcon} alt="Web development icon" width="40" />
          </div>
          <div className="service-content-box">
            <h4 className="h4 service-item-title">Web development</h4>
            <p className="service-item-text">
              High-quality development of sites at the professional level.
            </p>
          </div>
        </li>
        <li className="service-item">
          <div className="service-icon-box">
            <img src={appIcon} alt="mobile app icon" width="40" />
          </div>
          <div className="service-content-box">
            <h4 className="h4 service-item-title">Mobile apps</h4>
            <p className="service-item-text">
              Professional development of applications for iOS and Android.
            </p>
          </div>
        </li>
        <li className="service-item">
          <div className="service-icon-box">
            <img src={photoIcon} alt="camera icon" width="40" />
          </div>
          <div className="service-content-box">
            <h4 className="h4 service-item-title">Photography</h4>
            <p className="service-item-text">
              I make high-quality photos of any category at a professional level.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default ServiceSection;
