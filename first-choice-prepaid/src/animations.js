import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults
gsap.defaults({
  ease: "power3.out",
  duration: 1.2,
  force3D: true, // GPU acceleration for smoother animations
});

// ===== HERO SECTION ANIMATION =====
export function animateHero(hero) {
  if (!hero) return;

  const tl = gsap.timeline();

  tl.fromTo(
    hero.querySelector(".title"),
    { opacity: 0, y: 60, scale: 0.9, rotateX: 15 },
    { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.4 }
  )
    .fromTo(
      hero.querySelector(".subtitle"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.8"
    )
    .fromTo(
      hero.querySelector(".scroll-icon"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" },
      "-=0.5"
    );

  // Gentle floating 3D motion for the hero section
  gsap.to(hero, {
    y: 10,
    rotateX: 2,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

// ===== SECTION SCROLL ANIMATIONS (CLEANED AND FIXED) =====
export function animateSections(sections) {
  sections.forEach((section) => {
    if (!section) return;

    // Target only the direct children content to prevent double-animation
    const elements = section.querySelectorAll("h2, h3, p, ul, li, .card, .product-card, .step-card");

    gsap.fromTo(
      elements,
      // 1. Initial HIDDEN state
      { opacity: 0, y: 50, rotateX: 10 },
      {
        // 2. Final VISIBLE state
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power2.out",
        // FIX: Added delay to ensure proper rendering before animation starts
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          // FIX: Changed start point to trigger early for top-of-page sections
          start: "top 95%", 
          toggleActions: "play none none reverse",
        },
      }
    );
  });
} // <-- Correctly closed the function here

// ===== BOUNCING ARROW EFFECT =====
export function animateArrow(selector) {
  gsap.to(selector, {
    y: -5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 0.8,
  });
}

// ===== PARALLAX EFFECT (Optional, for background movement) =====
export function addParallax(section, speed = 0.2) {
  if (!section) return;
  gsap.to(section, {
    yPercent: -20 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      scrub: true,
    },
  });
}

// ===== FADE-IN ON LOAD =====
export function fadeInOnLoad(appRef) {
  if (!appRef) return;
  gsap.fromTo(
    appRef,
    { opacity: 0 },
    { opacity: 1, duration: 1.5, ease: "power1.out" }
  );
}