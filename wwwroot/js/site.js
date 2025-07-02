// Initializing All Animations
window.onload = () => {
    modernProfessionalGradientAnimation();
    navAnimation();
    logoAnimation();
    brandNameAnimation();
    heroSectionAnimation();
    typingEffect();
};

//header style change on scroll

const header = document.querySelector("#header");
const navbar = document.querySelector("#navbar");

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.classList.remove('sticky-top');
    } else {
        header.classList.add('sticky-top');
        header.classList.remove('scrolled');
    }
});

// Initialize AOS
AOS.init({
    duration: 1000, // Animation duration (ms)
    easing: 'ease-in-out', // Easing function
    once: true, // Animation will only happen once
});



// GSAP animations module

gsap.registerPlugin(ScrollTrigger);

//aboutpage
gsap.from(".about-me-section", { opacity: 0, y: 50, duration: 1 });
// GSAP animation for progress bars
gsap.from(".progress-bar", {
    width: 0,
    duration: 2,
    ease: "power2.out",
    stagger: 0.2
});
// GSAP animation for timeline items
gsap.from(".timeline-5", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
});

// GSAP animation for hobby icons
gsap.from(".hobby-icon", {
    opacity: 0,
    x: -30,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});



// Modern Professional Flowing Gradient Animation
function modernProfessionalGradientAnimation() {
    let gradientColors = {
        color1: "#2d3436", // Charcoal gray
        color2: "#4b4f56", // Dark slate gray
        color3: "#5c6d7b", // Muted steel blue
        color4: "#aab7c4", // Light steel blue
    };

    // Animate gradient colors and positions
    gsap.to(gradientColors, {
        duration: 12,  // Slightly slower transition for a sophisticated look
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",  // Smooth easing for subtle transitions
        color1: "#5c6d7b", // Muted steel blue
        color2: "#aab7c4", // Light steel blue
        color3: "#2d3436", // Charcoal gray
        color4: "#4b4f56", // Dark slate gray
        onUpdate: function () {
            document.body.style.background = `
                linear-gradient(135deg,
                    ${gradientColors.color1} 10%,
                    ${gradientColors.color2} 33%,
                    ${gradientColors.color3} 66%,
                    ${gradientColors.color4} 100%
                )
            `;
        }
    });

    let position = { angle: 135 };

    // Animate gradient angle for smooth, flowing effect
    gsap.to(position, {
        duration: 18,  // Longer duration for a smoother, flowing feel
        repeat: -1,
        ease: "linear",  // Continuous smooth transition for the angle
        angle: 495,  // Subtle angle rotation for dynamic background
        onUpdate: function () {
            document.body.style.background = `
                linear-gradient(${position.angle}deg,
                    ${gradientColors.color1} 10%,
                    ${gradientColors.color2} 33%,
                    ${gradientColors.color3} 66%,
                    ${gradientColors.color4} 100%
                )
            `;
        }
    });
}






// Navigation Animation
function navAnimation() {
    gsap.from("#navbar .nav-item", {
        duration: 1,
        y: -20,
        opacity: 0,
        stagger: 0.2,
        ease: "bounce.out"
    });
}

// Logo Animation
function logoAnimation() {
    gsap.from(".logo", {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3
    });

    const logo = document.querySelector(".logo");
    logo.addEventListener("mouseenter", () => {
        gsap.to(logo, {
            scale: 1.2,
            rotation: 10,
            duration: 0.5,
            ease: "power3.out"
        });
    });

    logo.addEventListener("mouseleave", () => {
        gsap.to(logo, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power3.out"
        });
    });
}

// Brand Name Animation
function brandNameAnimation() {
    gsap.from(".brand-name", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
        delay: 0.6
    });

    const brandName = document.querySelector(".brand-name");
    brandName.addEventListener("mouseenter", () => {
        gsap.to(brandName, {
            x: 10,
            color: "#ff6f61",
            duration: 0.5,
            ease: "power3.out"
        });
    });

    brandName.addEventListener("mouseleave", () => {
        gsap.to(brandName, {
            x: 0,
            color: "#ffffff",
            duration: 0.5,
            ease: "power3.out"
        });
    });
}

function heroSectionAnimation() {
    // Animate the hero title after the portrait
    gsap.from("#hero-title", {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        delay: 1  // This ensures the title animates after the portrait
    });

    // Animate the typed text after the hero title
    gsap.from("#typed-text", {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        delay: 1.5  // Delay after the title
    });

    // Animate the buttons after the typed text
    gsap.fromTo(
        ["#btn-projects", "#btn-resume"],
        { opacity: 0, y: 20 }, // Starting properties
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.4,
            delay: 2  // Delay after the typed text
        }
    );
}

// Typing Effect for Hero Description
function typingEffect() {
    const textArray = ["Full-Stack Developer.", "Creative Coder.", "Problem Solver."];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    const typedText = document.getElementById("typed-text");

    function typeText() {
        if (currentCharIndex < textArray[currentTextIndex].length) {
            typedText.textContent += textArray[currentTextIndex].charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(deleteText, 1000);
        }
    }

    function deleteText() {
        if (currentCharIndex > 0) {
            typedText.textContent = typedText.textContent.slice(0, -1);
            currentCharIndex--;
            setTimeout(deleteText, 50);
        } else {
            currentTextIndex = (currentTextIndex + 1) % textArray.length;
            setTimeout(typeText, 200);
        }
    }

    typeText();
}

// GSAP Animation for images on hover using class
const images = document.querySelectorAll(".project-img");

images.forEach(image => {
    image.addEventListener("mouseenter", () => {
        gsap.to(image, {
            opacity: 1,
            y: -10,  // Move up slightly
            duration: 0.6,  // Duration of the animation
            ease: "power3.out"
        });
    });

    image.addEventListener("mouseleave", () => {
        gsap.to(image, {
            opacity: 0.7,  // Make the image a bit transparent when hovered out
            y: 0,  // Reset to original position
            duration: 0.4,  // Duration of the animation
            ease: "power3.in"
        });
    });
});


//my project page

// Animate the Intro Section
gsap.from(".intro-section h2", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".intro-section p", {
    duration: 1.2,
    y: -30,
    opacity: 0,
    delay: 0.2,
    ease: "power3.out"
});


// Animate the Project Cards with Stagger
gsap.from(".my-project-card", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2, // Stagger the project cards by 0.2 seconds
    delay: 0.6,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#my-project-lists",
        start: "top 80%"
    }
});

// Animate the Search Bar
gsap.from("#search-project", {
    duration: 1,
    x: -50,
    opacity: 0,
    delay: 0.4,
    ease: "power3.out"
});
