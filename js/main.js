/* =============================================
   Main JavaScript - Beijing Jingrui Xinyuan
   ============================================= */

(function() {
    'use strict';

    // ===================
    // Page Loader
    // ===================
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('hidden');
                setTimeout(function() {
                    loader.remove();
                }, 600);
            }, 800);
        }
    });

    // ===================
    // Header Scroll Effect
    // ===================
    const header = document.querySelector('.site-header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ===================
    // Mobile Navigation Toggle
    // ===================
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close on link click
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // ===================
    // Scroll Progress Bar
    // ===================
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }

    // ===================
    // Back to Top Button
    // ===================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===================
    // Active Nav Link Highlight
    // ===================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===================
    // Smooth Scroll for Anchor Links
    // ===================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#' || target.length < 2) return;
            const el = document.querySelector(target);
            if (el) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 64;
                const offset = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // ===================
    // Counter Animation
    // ===================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            if (isNaN(target)) return;
            const duration = 2000;
            const start = performance.now();

            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.floor(eased * target);
                counter.textContent = value.toLocaleString();
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
            requestAnimationFrame(step);
        });
    }

    // ===================
    // Form Submission
    // ===================
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            // Simulate submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            setTimeout(function() {
                alert('Thank you, ' + (data.name || 'friend') + '! Your message has been received. We will contact you at ' + (data.email || 'your email') + ' within 24 business hours.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        });
    }

    // ===================
    // Intersection Observer for Animations
    // ===================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        };

        const fadeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve for performance
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(function(el) {
            fadeObserver.observe(el);
        });

        // Stats counter trigger
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    } else {
        // Fallback - just show all
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // ===================
    // Year for footer
    // ===================
    document.querySelectorAll('.current-year').forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });

})();
