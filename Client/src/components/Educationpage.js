import React from 'react';
import { IonIcon } from '@ionic/react';
import { bookOutline } from 'ionicons/icons';

const Resumepage = () => {
  return (
    <div>
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon icon={bookOutline} />
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">University school of the arts</h4>
            <span>2007 — 2008</span>
            <p className="timeline-text">
              Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">New york academy of art</h4>
            <span>2006 — 2007</span>
            <p className="timeline-text">
              Ratione voluptatem sequi nesciunt, facere quisquams facere menda ossimus, omnis voluptas assumenda est omnis.
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">High school of art and design</h4>
            <span>2002 — 2004</span>
            <p className="timeline-text">
              Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit aut fugit, sed consequuntur magni dolores eos.
            </p>
          </li>
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <IonIcon icon={bookOutline} />
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Creative director</h4>
            <span>2015 — Present</span>
            <p className="timeline-text">
              Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque corrupti, quos dolores et qvuas molestias exceptur.
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Art director</h4>
            <span>2013 — 2015</span>
            <p className="timeline-text">
              Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.
            </p>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Web designer</h4>
            <span>2010 — 2013</span>
            <p className="timeline-text">
              Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Resumepage;
