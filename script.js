// 1. Initialize particles.js for the Hero Section Background
particlesJS('particles-background', {
    "particles": {
      "number": {
        "value": 100, // Number of particles
        "density": {
          "enable": true,
          "value_area": 800 // Density based on area
        }
      },
      "color": {
        "value": ["#9D4EDD", "#3A86FF", "#00FFFF"] // Neon purple, electric blue, vibrant cyan
      },
      "shape": {
        "type": "circle", // Simple shape for neo-brutalism
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.7, // Visible but subtle
        "random": true // Varying opacity for dynamic effect
      },
      "size": {
        "value": 3, // Small size
        "random": true // Varying sizes
      },
      "line_linked": {
        "enable": true, // Connecting lines for data science theme
        "distance": 120,
        "color": "#FFFFFF", // White lines
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2, // Slow movement
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab" // Connects particles to cursor
        },
        "onclick": {
          "enable": true,
          "mode": "push" // Adds particles on click
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 0.7
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true // High-resolution support
  });

// Social Media Hover Effects
document.addEventListener("DOMContentLoaded", () => {
    const socialLinks = document.querySelectorAll(".social-links a");
    const copyBtn = document.querySelector(".copy-btn");
    const emailText = document.getElementById("email").textContent;

    // Reduce glow effect on hover
    socialLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.transform = "scale(1.1)";
        });
        link.addEventListener("mouseout", () => {
            link.style.boxShadow = "none"; // Remove glow when not hovering
            link.style.transform = "scale(1)";
        });
    });
  
  // 2. Animate Skill Progress Bars when Section is in View
  const aboutSection = document.querySelector('#about');
const skillsSection = document.querySelector('#skills');
const timelineItems = document.querySelectorAll('.timeline-item');
const progressBars = document.querySelectorAll('.progress');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target === aboutSection) {
        timelineItems.forEach((item, index) => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 300); // Staggered animation
        });
        observer.unobserve(aboutSection);
      } else if (entry.target === skillsSection) {
        progressBars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          bar.style.width = `${level}%`;
        });
        observer.unobserve(skillsSection);
      }
    }
  });
}, { threshold: 0.5 });

observer.observe(aboutSection);
observer.observe(skillsSection);
  
  // 3. Project Filtering by Category
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.textContent.toLowerCase();
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // 4. Contact Form Validation and Submission Handling
  const contactForm = document.querySelector('#contact-form');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();
  
    if (name && email && message) {
      // Simulate form submission (replace with Formspree or backend logic later)
      alert('Thank you, ' + name + '! Your message has been sent successfully.');
      contactForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
  
  // 5. Copy Email to Clipboard
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(emailText).then(() => {
        copyBtn.innerHTML = '<i data-lucide="check-circle"></i>'; // Change to a check icon
        setTimeout(() => {
            copyBtn.innerHTML = '<i data-lucide="copy"></i>'; // Revert to copy icon
            lucide.createIcons(); // Refresh icons
        }, 2000);
    });
});

lucide.createIcons(); // Initialize icons
});

  
  // 6. Smooth Scroll for Navigation Links (Optional Enhancement)
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').substring(1); // Remove '#'
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });