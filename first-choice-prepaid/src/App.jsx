import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  FaArrowDown,
  FaBolt,
  FaUsers,
  FaTools,
  FaArrowLeft,
  FaEnvelope,
} from "react-icons/fa";
import "./App.css";
import Navbar from "./navbr"; // Sticky navbar
import {
  animateHero,
  animateSections,
  animateArrow,
  fadeInOnLoad,
} from "./animations";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const appRef = useRef(null);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const servicesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const buyNowRef = useRef(null);
  const contactRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const products = [
    {
      name: "BEC44PL - 09",
      points: [
        "High Risk / Maximum Security (60 - 80A)",
        "Split unit, hard-wired, interfaced",
        "Din rail mount, small footprint for space-saving installation",
        "Tamper detection as standard",
        "High supply tolerance levels",
        "High temperature and humidity resistance",
        "Tactile keypad",
      ],
    },
    {
      name: "BEC62PL",
      points: [
        "Commercial use (100A per phase)",
        "Robust design, split configuration",
        "Tamper detection",
        "Maximum security",
        "Split unit, wired/wireless keypad",
        "High voltage tolerance levels",
        "Tactile keypad",
      ],
    },
    {
      name: "BEC32PL",
      points: [
        "Commercial use (100A per phase)",
        "3-phase meter",
        "Robust design",
        "Tamper detection",
        "100 Amp per phase",
        "Tactile keypad",
        "High voltage tolerance levels",
      ],
    },
    {
      name: "BEC23PL (T)",
      points: [
        "Domestic use (60-80A)",
        "Single unit with built-in keypad",
        "Easy installation",
        "LED consumption indicator",
        "Optional tamper protection",
        "Tactile keypad",
        "Robust design",
      ],
    },
    {
      name: "BEC23PE (T)",
      points: [
        "Low cost / High risk developments (20A)",
        "20 Amp double-pole circuit breaker",
        "Complete earth leakage protection",
        "Eliminates need for separate distribution box",
        "Can connect directly to power supply",
        "Tactile keypad",
      ],
    },
    {
      name: "WBEC Wireless Meter",
      points: [
        "High risk / Maximum security (60-80A)",
        "Split unit - radio frequency, wireless interface",
        "Discreet device",
        "Can be paired with a data collector to create a complete smart/AMI metering solution",
        "High temperature and humidity resistance",
        "Tactile keypad",
      ],
    },
    {
      name: "66HC (250A)",
      points: [
        "Larger commercial/industrial use (250A per phase)",
        "Rugged design",
        "Split meter for extra security",
        "CT-based, high current meter",
        "Exclusive to 1st Choice Prepaid",
        "Tactile keypad",
        "High voltage tolerance",
      ],
    },
    {
      name: "IP68 Water Meter",
      points: [
        "Domestic and commercial use",
        "IP68 waterproof rating",
        "Allocation of infinite or pre-negotiated daily/monthly allowance",
        "Detects leaks (night flows)",
        "Complete prepaid electricity & water solution",
        "Exclusive to 1st Choice Prepaid",
      ],
    },
  ];

  useEffect(() => {
    fadeInOnLoad(appRef.current);
    animateHero(heroRef.current);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    animateSections(
      [
        productsRef.current,
        servicesRef.current,
        howItWorksRef.current,
        buyNowRef.current,
        contactRef.current,
      ].filter(Boolean)
    );
    animateArrow(".scroll-icon");

    // Smooth scroll for navbar links using GSAP
    const links = document.querySelectorAll(".navbar a");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: targetEl.offsetTop - 70 }, // offset for navbar
            ease: "power2.inOut",
          });
        }
      });
    });
  }, []);

  // Scroll to contact and prefill subject using GSAP
  const handleBuyNow = (productName) => {
    setFormData({ ...formData, subject: `Purchase Inquiry for ${productName}` });
    if (contactRef.current) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: contactRef.current.offsetTop - 70 },
        ease: "power2.inOut",
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";

    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      gsap.fromTo(
        contactRef.current,
        { x: -10 },
        { x: 10, duration: 0.1, yoyo: true, repeat: 5 }
      );
      return;
    }
    alert("Message sent successfully!");
    setFormData({ email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div className="app" ref={appRef}>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="hero-section" ref={heroRef} id="hero">
        <h1 className="title">Welcome to <strong>1st Choice Prepaid</strong></h1>
        <h2 className="subtitle">Your trusted partner in prepaid sub-metering solutions.</h2>
        <FaArrowDown className="scroll-icon" />
      </section>

      {/* INTRO */}
      <section className="intro-section" ref={introRef} id="intro">
        <h2>Introduction</h2>
        <p>1st Choice Prepaid specializes in the installation and management of prepaid sub-metering. The company's aim is to provide a complete prepaid solution ensuring accessibility and control.</p>
      </section>

      {/* ABOUT */}
      <section className="about-section" ref={aboutRef} id="about">
        <h2>About Us</h2>
        <p>We provide privately managed prepaid utilities for landlords, managing agents, body corporates, and sectional title properties.</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section" ref={howItWorksRef} id="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="how-container">
          <div className="how-step"><h3>1️⃣ Installation</h3><p>Our team installs a secure prepaid meter at your property, linked to your management account.</p></div>
          <div className="how-step"><h3>2️⃣ Registration</h3><p>Each device is registered with the 1st Choice Prepaid management system for accurate tracking.</p></div>
          <div className="how-step"><h3>3️⃣ Purchase</h3><p>Tenants buy electricity or water tokens through trusted third-party vendors like Easypay or Unipin.</p></div>
          <div className="how-step"><h3>4️⃣ Monitoring</h3><p>Landlords and agents receive monthly vending reports with detailed consumption data.</p></div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section" ref={productsRef} id="products">
        <h2 className="section-title">Our Products</h2>
        <div className="products-container">
          {products.map((product, i) => (
            <div className="product-card" key={i}>
              <h3>{product.name}</h3>
              <ul>{product.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
              <button className="buy-button" onClick={() => handleBuyNow(product.name)}>
                <FaArrowLeft className="arrow-icon" /> Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" ref={contactRef} id="contact">
        <h2 className="section-title"><FaEnvelope className="contact-icon" /> Get in Touch</h2>
        <p>Have questions about our products or services? Fill out the form below, and we’ll respond as soon as possible.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            readOnly
          />
          {errors.subject && <span className="error">{errors.subject}</span>}

          <label>Message</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            placeholder="Write your message here..."
          />
          {errors.message && <span className="error">{errors.message}</span>}

          <button type="submit" className="contact-button">Send Message</button>
        </form>

        <p className="contact-info">
          📞 082 564 4635 | 084 710 1159 <br />
          📧 sales@1stchoiceprepaid.co.za <br />
          🌐 www.1stchoiceprepaid.co.za <br />
          📍 136 Marriot Road, Durban
        </p>
      </section>

      {/* SERVICES */}
      <section className="services-section" ref={servicesRef} id="services">
        <h2>Our Services</h2>
        <div className="cards-container">
          <div className="card"><FaBolt size={40} color="#00FFFF" /><h3>Prepaid Energy</h3><p>Reliable, fast, and secure prepaid energy solutions.</p></div>
          <div className="card"><FaUsers size={40} color="#00FFFF" /><h3>Customer Support</h3><p>Seamless onboarding and ongoing assistance.</p></div>
          <div className="card"><FaTools size={40} color="#00FFFF" /><h3>System Installation</h3><p>Professional installation of prepaid meters.</p></div>
        </div>
      </section>
    </div>
  );
}

export default App;