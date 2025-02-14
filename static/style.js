// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: "smooth"
            });
        });
    });

    // Responsive Navigation Menu
    const menuToggle = document.createElement("div");
    menuToggle.className = "menu-toggle";
    menuToggle.innerHTML = "<span></span><span></span><span></span>";
    document.querySelector(".header-container").appendChild(menuToggle);

    menuToggle.addEventListener("click", function () {
        document.querySelector(".nav-links").classList.toggle("active");
        this.classList.toggle("active");
    });

    // Button Ripple Effect
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            this.appendChild(ripple);

            const maxDim = Math.max(this.offsetWidth, this.offsetHeight);
            ripple.style.width = ripple.style.height = `${maxDim}px`;

            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left - maxDim / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - maxDim / 2}px`;

            ripple.addEventListener("animationend", function () {
                ripple.remove();
            });
        });
    });

    // Form Validation
    const form = document.querySelector(".contact-form");
    const formInputs = form.querySelectorAll("input, textarea");

    form.addEventListener("submit", function (e) {
        let valid = true;

        formInputs.forEach(input => {
            if (input.value.trim() === "") {
                valid = false;
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
            }
        });

        if (!valid) {
            e.preventDefault();
            alert("Please fill out all fields correctly.");
        }
    });

    // Scroll Animation for sections
    const sections = document.querySelectorAll(".section");

    const revealSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const revealPoint = 150;

            if (sectionTop < window.innerHeight - revealPoint) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    };

    window.addEventListener("scroll", revealSection);
    revealSection(); // Trigger reveal on load
// Particle JS Initialization
particlesJS("particles-js", {
    particles: {
        number: {
            value: 100, // Increased number of particles
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ff0000" // Changed color to red for better visibility
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.8, // Increased opacity for better visibility
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 7, // Increased size of particles
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff0000", // Changed line color to red
            opacity: 0.6, // Increased line opacity
            width: 1.5 // Increased line width
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

});
