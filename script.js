document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const animatedElements = document.querySelectorAll('.animate-left, .animate-right, .animate-fade-in-up');

    const words = ["Web Developer", "Youtuber", "Coder", "Cyber Security Expert"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200);
        }
    }

    const aboutButtons = document.querySelectorAll('.about-buttons .btn');
    const aboutDetails = document.querySelectorAll('.about-detail');

    aboutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            aboutButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const target = document.querySelector(button.dataset.target);
            aboutDetails.forEach(detail => detail.classList.remove('active'));
            target.classList.add('active');
        });
    });

    const projectsCompleted = document.getElementById('projects-completed');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    projectsCompleted.textContent = portfolioCards.length + '+';

    type();

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Intersection Observer for progress bar animations
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width;
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    skillProgressBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
