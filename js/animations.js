/* =============================================
   Advanced Animations
   ============================================= */

(function() {
    'use strict';

    // ===================
    // Parallax on mouse move
    // ===================
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.matchMedia('(min-width: 992px)').matches) {
        document.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroBg.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(1.05)';
        });
    }

    // ===================
    // Magnetic Buttons
    // ===================
    const magneticEls = document.querySelectorAll('.magnetic');
    magneticEls.forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
        });
        el.addEventListener('mouseleave', function() {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // ===================
    // Scroll-based Reveal Animations
    // ===================
    function revealOnScroll() {
        const elements = document.querySelectorAll('[data-reveal]');
        elements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.85) {
                el.classList.add('revealed');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();

    // ===================
    // Particle Generation
    // ===================
    function createParticles(container, count) {
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            container.appendChild(particle);
        }
    }
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        createParticles(particlesContainer, 30);
    }

    // ===================
    // Hero section title split into letters for animation
    // ===================
    document.querySelectorAll('.hero-title-anim').forEach(function(title) {
        const text = title.textContent;
        title.textContent = '';
        text.split('').forEach(function(char, i) {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(40px)';
            span.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            span.style.transitionDelay = (i * 0.04) + 's';
            title.appendChild(span);
            setTimeout(function() {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100 + i * 40);
        });
    });

    // ===================
    // 3D Tilt Effect on Cards
    // ===================
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================
    // Animate on scroll for stats
    // ===================
    let statsAnimated = false;
    function animateStats() {
        if (statsAnimated) return;
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
            statsAnimated = true;
            const counters = statsSection.querySelectorAll('.counter');
            counters.forEach(function(counter) {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                if (isNaN(target)) return;
                const duration = 2500;
                const startTime = performance.now();
                function step(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const value = Math.floor(eased * target);
                    counter.textContent = value.toLocaleString();
                    if (progress < 1) requestAnimationFrame(step);
                    else counter.textContent = target.toLocaleString();
                }
                requestAnimationFrame(step);
            });
        }
    }
    window.addEventListener('scroll', animateStats, { passive: true });
    animateStats();

    // ===================
    // Scroll-triggered staggered animations
    // ===================
    function staggerReveal() {
        document.querySelectorAll('.stagger-parent').forEach(function(parent) {
            const rect = parent.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                const children = parent.querySelectorAll('.stagger-item');
                children.forEach(function(child, i) {
                    setTimeout(function() {
                        child.classList.add('visible');
                    }, i * 100);
                });
            }
        });
    }
    window.addEventListener('scroll', staggerReveal, { passive: true });
    staggerReveal();

    // ===================
    // Smooth number ticker for hero stats
    // ===================
    function runHeroNumberAnim() {
        document.querySelectorAll('.hero-number').forEach(function(el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current).toLocaleString();
            }, 30);
        });
    }
    setTimeout(runHeroNumberAnim, 1500);

})();
