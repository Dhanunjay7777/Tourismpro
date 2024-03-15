import React, { Component } from 'react';
import './about.css';
import meImage from './images/me.jpg'; // Import the image file
import githubLogo from './images/github.png'; // Import GitHub logo image
import linkedinLogo from './images/linkedin.png'; 
const styles = {
  contactHeader: {
    backgroundColor: 'rgb(0, 86, 179)',
    color: '#fff',
    padding: '10px',
    textAlign: 'right',
    zIndex: 2,
    position: 'fixed',
    width: '100%',
    height: '20px',
  },
  loginHeaderLinks: {
    float: 'right',
    marginRight: '30px',
    marginTop: '1px',
  },
  footer: {
    backgroundColor: 'rgb(0, 86, 179)',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    fontSize: '10pt',
    zIndex: 2,
    position: 'fixed',
    width: '100%',
    bottom: 0,
    height: '20px',
  },
};

function handleLoginAbout() {
  window.location.replace('/');
}

class Aboutus extends Component {
  render() {
    return (
      <div>
        <div style={styles.contactHeader}>
          <div className='loginheader-links' style={styles.loginHeaderLinks}>
            <span onClick={handleLoginAbout}>🔒Login</span>
          </div>
        </div>
        <div className='aboutContent'>
        <h2 style={{ textAlign: 'center' }}>About Us</h2>
          <img src={meImage} alt="About Me" style={{ display: 'block', margin: 'auto' }} />

         
  <p className='paragraph'>
    A Tourism and Hospitality Management System is an effective solution for addressing user needs and ensuring customer satisfaction. Based in a small town in Brazil, I have a strong passion for technology and enjoy constantly learning new things. I have specialized in managing Virtualization, Windows and implementing various network services to support the tourism and hospitality industry.
  </p>
 
  <p className='paragraph'>
    I am proficient in various development technologies including HTML5, JavaScript, CSS3, Bootstrap, Git enabling me to design and implement robust and scalable systems tailored to the unique requirements of the tourism and hospitality sector.
  </p>

          <div className="Aboutcard">
            <div className="Aboutcard-content">
              <a href="https://github.com/Dhanunjay7777">
                <img src={githubLogo} alt="GitHub" className="logo" />
              </a>
              <a href="https://www.linkedin.com/in/puttagunta-dhanunjay-48241626a/">
                <img src={linkedinLogo} alt="LinkedIn" className="logo" />
              </a>
            </div>
            <div style={styles.footer}>
          Copyright @ KL University. All rights reserved.
        </div>
          </div>
       
      </div>
      </div>
    );
  }
}

export default Aboutus;
