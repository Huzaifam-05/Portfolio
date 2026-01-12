/* =========================================
   1. Theme Toggle
   ========================================= */
const themeButton = document.getElementById('theme-toggle');
const darkTheme = 'dark-theme';
const iconTheme = 'icon-sun'; // The icon class that indicates dark mode is active (sun shows in dark mode)

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'icon-moon' : 'icon-sun';

// Validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  // We don't need to manually toggle icons here because CSS handles display:none/block based on body class
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/* =========================================
   2. Mobile Menu
   ========================================= */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* =========================================
   3. Scroll Reveal Animation
   ========================================= */
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active-reveal');
        } else {
            // Optional: Remove class to re-animate when scrolling up
            // element.classList.remove('active-reveal'); 
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Trigger once on load
revealOnScroll();

/* =========================================
   4. Active Link on Scroll
   ========================================= */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100; // Offset for fixed header
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link'); // You might need to add this style in CSS if you want highlight
            // Adding a simple style for active link here via JS style or class
            sectionsClass.style.color = 'var(--first-color)';
        }else{
            sectionsClass.classList.remove('active-link');
            sectionsClass.style.color = ''; // Reset to CSS default
        }
    });
};

window.addEventListener('scroll', scrollActive);
