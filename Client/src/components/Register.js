import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import styles from './Register.module.css';
import axios from 'axios';

// const history = useHistory();

function Register() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    collegeEmail: '',
    usn: '',
    phno: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {


    e.preventDefault(); // Prevent default form submission
    console.log(formData.password);
    console.log(formData.confirmPassword);
    console.log(formData.password !== formData.confirmPassword);

    // Client-side password match check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log({
      name: formData.name,
        username: formData.username,
        email: formData.email,
        collegeEmail: formData.collegeEmail,
        usn: formData.usn,
        phno: formData.phno,
        dob: formData.dob,
        password: formData.password,
        confirmPassword: formData.confirmPassword
    })

    try {
      const response = await axios.post('http://localhost:3000/signup',{
        withCredentials: true,
      }, {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        collegeEmail: formData.collegeEmail,
        usn: formData.usn,
        phno: formData.phno,
        dob: formData.dob,
        password: formData.password,
        confirmPassword: formData.confirmPassword

      });
      if(response.data.success){
        console.log('User registered successfully');
        history.push("/home");
      }

      console.log('Response data: ', response.data);
      
      // Clear form data after successful registration
      setFormData({
        name: '',
        username: '',
        email: '',
        collegeEmail: '',
        usn: '',
        phno: '',
        dob: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      if (error.response && error.response.status === 401) {
        console.log(error);
      } else {
        // alert('Error registering user');
      }
    }
  };
  
  return (
    <div className={styles.formContainer} style={{ background: '#252424' }}>
      <form onSubmit={handleSubmit} style={{ boxShadow: '' }}>
        <h2>Register</h2>
        
        {/* Name Field */}
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 4.5V14h-4v-5H6v5H2V4.5a.5.5 0 0 1 .5-.5H5V2h2v2h2V2h2v2h2.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={styles.inputField}
            required
            style={{ fill: 'white' }}
          />
        </div>
        
        {/* Username Field */}
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Username"
            className={styles.inputField}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Email Field */}
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.07-.225A.5.5 0 0 0 1.8 4.566L8 8.385l6.2-3.819a.5.5 0 1 0-.54-.832L8 7.615 2.07 3.775z"/>
          </svg>
          <input
            autoComplete="off"
            placeholder="Email"
            className={styles.inputField}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* College Email Field */}
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M14 4.5V14h-4v-5H6v5H2V4.5a.5.5 0 0 1 .5-.5H5V2h2v2h2V2h2v2h2.5a.5.5 0 0 1 .5.5z"/>
          </svg>
          <input
            autoComplete="off"
            placeholder="College Email"
            className={styles.inputField}
            type="email"
            name="collegeEmail"
            value={formData.collegeEmail}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* USN Field */}
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="USN"
            className={styles.inputField}
            type="text"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            required
          />
        </div>
        
        
        {/* Confirm Password Field */}
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Phone number"
            className={styles.inputField}
            type="number"
            name="phno"
            value={formData.phno}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="DOB"
            className={styles.inputField}
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        {/* Password Field */}
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            className={styles.inputField}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <svg className={styles.inputIcon} style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Confirm Password"
            className={styles.inputField}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={styles.btn}>
          <button className={styles.button1} type="submit">Register</button>
        </div>
        
        <p style={{ paddingBottom: '34px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
