document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Removal
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000); // Artificial delay for premium feel

    // 2. Typing Animation Logic
    const typingText = "I am a passionate first-year B.Tech student specializing in Computer Science Engineering with Artificial Intelligence and Machine Learning. I enjoy learning new technologies, solving challenging problems, and continuously improving my skills. My goal is to become an exceptional software engineer and AI developer while creating meaningful technology that impacts people's lives.";
    const typingElement = document.getElementById('typing-text');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < typingText.length) {
            typingElement.innerHTML += typingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 20); // 20ms per character
        }
    }
    setTimeout(typeWriter, 1200); // Start after loader

    // 3. Scroll Reveal & Skill Bar Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-progress');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Skill Bars if inside the revealed section
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });

                observer.unobserve(entry.target); // Run once
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Smooth Scroll Progress Bar & Back to Top Button
    const progressBar = document.getElementById('progressBar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        let docHeight = document.body.scrollHeight - window.innerHeight;
        let scrollPercent = (scrollTop / docHeight) * 100;
        
        // Use requestAnimationFrame for smooth 60fps UI updates
        requestAnimationFrame(() => {
            progressBar.style.width = scrollPercent + '%';
            if (scrollTop > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. 3D Tilt Effect for Glass Cards (Vanilla JS)
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // 6. Mouse Parallax for Hero Section
    const heroParallax = document.querySelector('.parallax-container');
    const parallaxElement = document.querySelector('.parallax-element');

    if (heroParallax && parallaxElement) {
        heroParallax.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            
            requestAnimationFrame(() => {
                parallaxElement.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        heroParallax.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                parallaxElement.style.transform = `translate(0px, 0px)`;
            });
        });
    }
});