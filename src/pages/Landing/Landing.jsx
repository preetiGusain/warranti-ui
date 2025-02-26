import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import logo from './images/logo.png';
import googlePlay from './images/googlePlay.png';
import appStore from './images/appStore.png';
import warranty from './images/warranty.png';
import homescreen from './images/homescreen.png';
import airfryer from './images/airfryer.png';
import signin from './images/signin.png';
import create from './images/create.png';
import './Landing.css';

const LandingPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Apply a class to body for the landing page
        document.body.classList.add('landing-page');

        // Clean up by removing the class when the component is unmounted
        return () => {
            document.body.classList.remove('landing-page');
        };
    }, []);

    return (
        <div className="landing-container">
            <header className="header">
                <img src={logo} alt="Company Logo" className="header-logo" />
                    <button className="signup-button" onClick={() => navigate("/login")}>Signup/ Signin</button>
            </header>

            <main className="content">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Warranti</h1>
                        <p>
                            Get Started! Download our app and take control of your purchases.
                            Store, Track, and Never Lose a Warranty again!
                        </p>
                        <div className="hero-buttons">
                            <img src={googlePlay} alt="App Store" className="store-button" />
                            <img src={appStore} alt="Google Play Store" className="store-button" />
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={warranty} alt="Warranty App" />
                    </div>
                </section>

                <section className="why-choose-warranti">
                    <h2>Why choose Warranti</h2>
                    <p>
                        Warranti keeps your product warranties safe, organized, and always at
                        your fingertips. Never waste time searching for paperwork or stressing
                        over expired warranties again.
                    </p>
                    <div className="features">
                        <div className="feature">
                            <h3>Convenience</h3>
                            <p>
                                Stop scrambling for paperwork when something breaks.
                                Everything you need is in one place.
                            </p>
                        </div>
                        <div className="feature">
                            <h3>Security</h3>
                            <p>
                                Your warranties are securely stored in encrypted cloud
                                storage, ensuring complete safety and easy access .
                            </p>
                        </div>
                        <div className="feature">
                            <h3>Time-Saving</h3>
                            <p>
                                Say goodbye to manual tracking and searching for receipts, and
                                access all your warranty documents with ease.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="how-it-works">
                    <h2>How it works</h2>
                    <div className="steps">
                        <div className="step">
                            <img src={signin} alt="" />
                            <p>
                                Create an account using email, Google, or other sign-in
                                options.
                            </p>
                        </div>
                        <div className="step">
                            <img src={homescreen} />
                            <p>
                                Tap the Create icon on the Home Page to add a new warranty.
                            </p>
                        </div>
                        <div className="step">
                            <img src={create} />
                            <p>
                                Upload your warranty receipts along with product details.
                            </p>
                        </div>
                        <div className="step">
                            <img src={airfryer} />
                            <p>
                                View, or manage your warranties from your phone.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="benefits">
                    <h2>Benefits</h2>
                    <div className="benefit-cards">
                        <div className="benefit-card">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3cc64bb75323400e70e32f5494e6db53c632c47ad256ce7f3d1112096341b5d?placeholderIfAbsent=true&apiKey=da30e0aa72f64a608b8b48e0276c0df6" alt="Automatic Tracking" />
                            <div className="benefit-card-content">
                                <h3>Automatic Tracking</h3>
                                <p>
                                    Warranti tracks warranty expiration dates and sends you timely
                                    reminders, ensuring you never miss an important deadline or
                                    lose track of your coverage
                                </p>
                            </div>
                        </div>
                        <div className="benefit-card">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3cc64bb75323400e70e32f5494e6db53c632c47ad256ce7f3d1112096341b5d?placeholderIfAbsent=true&apiKey=da30e0aa72f64a608b8b48e0276c0df6" alt="Easy Upload" />
                            <div className="benefit-card-content">
                                <h3>Easy Upload</h3>
                                <p>
                                    Upload receipts and warranty documents instantly from your
                                    mobile, no more misplaced papers or lost records, ensuring
                                    easy access whenever you need them.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-card">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3cc64bb75323400e70e32f5494e6db53c632c47ad256ce7f3d1112096341b5d?placeholderIfAbsent=true&apiKey=da30e0aa72f64a608b8b48e0276c0df6" alt="Secure & Accessible" />
                            <div className="benefit-card-content">
                                <h3>Secure & Accessible</h3>
                                <p>
                                    All your warranties are securely stored in one place for easy
                                    access. Retrieve, review, and manage them anytime, anywhere,
                                    from any device with ease.
                                </p>
                            </div>
                        </div>
                        <div className="benefit-card">
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3cc64bb75323400e70e32f5494e6db53c632c47ad256ce7f3d1112096341b5d?placeholderIfAbsent=true&apiKey=da30e0aa72f64a608b8b48e0276c0df6" alt="Warranty Management" />
                            <div className="benefit-card-content">
                                <h3>Warranty Management</h3>
                                <p>
                                    Effortlessly access and manage your stored warranties from a
                                    centralized dashboard, keeping all your product details
                                    organized and easily available.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <div className="footer-main">
                        <h2 className="footer-logo">Warranti</h2>
                        <div className="footer-links">
                            <p className="about">Warranti is an easy-to-use app that helps you stay organized and never miss a warranty deadline. Store receipts, warranty cards, and product details securely in one place. Track expiration dates and access your warranties anytime, anywhere.</p>
                            <article className="mission">
                                <h3>OUR MISSION</h3>
                                <p>Simplifying warranty management.</p>
                            </article>
                            <section className="contact">
                                <h3>CONTACT</h3>
                                <p>support@warranti.in</p>
                            </section>
                            <nav className="menu">
                                <h3>MENU</h3>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/about">About</a></li>
                                    <li><a href="/contact">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <a href="/privacypolicy" className="privacy-policy">Privacy Policy</a>
                    </div>
                </footer>
            </main>
        </div>
    );

};

export default LandingPage;
