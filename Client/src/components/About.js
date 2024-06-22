import React from 'react';
import AboutSection from './Aboutsection';
import ServiceSection from './ServiceSection';
import Testimonials from './Testimonials';
import TestimonialsModal from './TestimonialsModal';
import ClientsSection from './ClientsSection';

function About() {
  return (
    <>
        <article className="about  active" data-page="about">
            <AboutSection />
            <ServiceSection />
            <Testimonials />
            <TestimonialsModal />
            <ClientsSection />

        </article>
    </>
  );
}

export default About;
