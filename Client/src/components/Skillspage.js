import React from 'react';

const Skills = () => {
  const skills = [
    { name: 'Web design', value: 80 },
    { name: 'Graphic design', value: 70 },
    { name: 'Branding', value: 90 },
    { name: 'WordPress', value: 50 },
  ];

  return (
    <section className="skill">
      <h3 className="h3 skills-title">My skills</h3>
      <ul className="skills-list content-card">
        {skills.map((skill, index) => (
          <li className="skills-item" key={index}>
            <div className="title-wrapper">
              <h5 className="h5">{skill.name}</h5>
              <data value={skill.value}>{skill.value}%</data>
            </div>
            <div className="skill-progress-bg">
              <div className="skill-progress-fill" style={{ width: `${skill.value}%` }}></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
