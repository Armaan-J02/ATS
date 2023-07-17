import React, { useState } from 'react';
import logo from './logo1.png';
import './App.css';
import icon from './blacki.png';
import { Link, BrowserRouter as Router, Route, useHistory } from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        // Code to handle login goes here
        props.toggle();
    }

    function isEmailValid(email) {
        return email.includes('@');
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Email Address:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    {!isEmailValid(email) && <p>Please enter a valid email address.</p>}
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>
                    <a href="#">Forgot Password?</a>
                </p>
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    );
}

function JoinNow(props) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    function handleJoinNow(e) {
        e.preventDefault();
        
        props.toggle();
    }

    function isPasswordValid(password) {
        const alphanumericRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/;
        return alphanumericRegex.test(password);
    }

    function arePasswordsMatched() {
        return password === confirmPassword;
    }

    const isJoinNowDisabled = !isPasswordValid(password) || !arePasswordsMatched();

    return (
        <Router>
        <div className="popup">
            <div className="popup-inner">
                <h2>Join Now</h2>
                <form onSubmit={handleJoinNow}>
                    <label>
                        Email Address:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    {password && (
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </label>
                    )}
                    {!isPasswordValid(password) && (
                        <p>Password should contain a mix of alphanumeric and special characters.</p>
                    )}
                    {!arePasswordsMatched() && (
                        <p>Passwords do not match.</p>
                    )}
                    <Link to="/signup">
                <button type="submit" disabled={isJoinNowDisabled}>
                Join Now
                </button>
                    </Link>
                </form>
            </div>
        </div><Route path="/signup" component={signup} />
        </Router>);
}

function App() {
    const [loginVisible, setLoginVisible] = useState(false);
    const [joinNowVisible, setJoinNowVisible] = useState(false);
  
    function toggleLogin() {
      setLoginVisible(!loginVisible);
      setJoinNowVisible(false);
    }
  
    function toggleJoinNow() {
      setJoinNowVisible(!joinNowVisible);
      setLoginVisible(false);
    }
  
    return (
        
      <div>
        <div className="header">
        <img src={icon} alt="Icon" className="logo-icon" />
          <nav className="navigation">
            <a href="#">About</a>
            
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <a href="#" onClick={toggleJoinNow}>
              Join now
            </a>
            <button className="signin" onClick={toggleLogin}>
              Login
            </button>
          </nav>
        </div>
        <div className="hero-section">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-image"/>
          </div>
          <div className="background-image"></div>
        </div>
        <div className="content-wrapper">
          <section className="signup-section">
          <div className="signup-content">
                  <p>Welcome to Skill-Scout! Join our platform and unlock a world of opportunities for your career growth and development. Create your account to get started!</p>
                  <p>Stay updated with the latest job opportunities, training recommendations, internship programs, and more! Gain access to our application tracking system, job listings, and personalized recommendations for courses, videos, research papers, and upskilling materials.</p>
              </div>
            </section>
          <section className="benefits-section">
            
          <h3>Benefits of Joining</h3>
                  <ul>
                      <li>Application Tracking: Keep track of your job applications in one place.</li>
                      <li>Job Recommendations: Discover relevant job opportunities based on your skills and interests.</li>
                      <li>Training Recommendations: Get personalized training recommendations to enhance your skills.</li>
                      <li>Internship Programs: Explore internship programs to gain practical experience.</li>
                      <li>Upskilling Resources: Access a curated collection of courses, videos, research papers, and documents to support your professional growth.</li>
                      <li>Easy Apply: Apply to jobs with just a few clicks, making the application process hassle-free.</li>
                  </ul>
          </section>
          <section className="security-section">
          <h3>Trust and Security</h3>
              <p>We prioritize the security of your personal information. Rest assured that your data is protected through advanced security measures and encrypted connections.</p>
          </section>
          <section className="support-section">
          <h3>User Support</h3>
              <p>Our dedicated support team is here to assist you. If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
          </section>
        </div>
        {loginVisible && <Login toggle={toggleLogin} />}
        {joinNowVisible && <JoinNow toggle={toggleJoinNow} />}
      </div>
      
    );
  }


export default App;
