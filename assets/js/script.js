// Modern JavaScript for Hyses-Nex Website

// Initialize AOS (Animate On Scroll) Library
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out',
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    }
});

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
            } else {
            navbar.style.transform = 'translateY(0)';
            }
    }
    
    lastScrollY = currentScrollY;
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        const isActive = navMenu.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
        });
    }

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
            e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
        
        navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
});

// Animated Counters for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counter animation
animateCounters();

// Services Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const targetContent = document.getElementById(target);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Partners Tabs Functionality
const partnersTabButtons = document.querySelectorAll('.partners-tab-btn');
const partnersTabContents = document.querySelectorAll('.partners-tab-content');
        
partnersTabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        
        // Remove active class from all buttons and contents
        partnersTabButtons.forEach(btn => btn.classList.remove('active'));
        partnersTabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        const targetContent = document.getElementById(target);
        if (targetContent) {
            targetContent.classList.add('active');
                }
    });
        });

// Scroll Indicator Animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const servicesSection = document.querySelector('.services-preview');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
                }
            });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    }

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
            
        // Basic form validation
        const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
            let isValid = true;
        let firstInvalidField = null;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
            if (!formObject[field] || formObject[field].trim() === '') {
                    isValid = false;
                input.style.borderColor = '#ef4444';
                if (!firstInvalidField) {
                    firstInvalidField = input;
                }
                } else {
                input.style.borderColor = '#00a85a';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = this.querySelector('[name="email"]');
        if (formObject.email && !emailRegex.test(formObject.email)) {
                isValid = false;
            emailInput.style.borderColor = '#ef4444';
            if (!firstInvalidField) {
                firstInvalidField = emailInput;
            }
            }
            
        if (!isValid) {
            // Focus on first invalid field
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form submission logic)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset field borders
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                input.style.borderColor = '';
            });
            
            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
    `;

    // Add to body
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
            }
    }, 5000);
    }

    // Parallax Effect for Hero Section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.hero-shapes .shape');
    
    heroShapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
        });
});

// Intersection Observer for Animation Triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature-item, .team-member, .partner-item').forEach(el => {
    observer.observe(el);
});

// Lazy Loading for Images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
        });
    });

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Dynamic Copyright Year
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer-bottom p');
if (copyrightElement) {
    copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
});

// Focus Management for Accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Performance Monitoring
let performanceMetrics = {
    pageLoadTime: 0,
    firstContentfulPaint: 0,
    domContentLoaded: 0
};

// Measure page load time
window.addEventListener('load', function() {
    performanceMetrics.pageLoadTime = performance.now();
    
    // Log performance metrics (for development)
    if (window.console && console.log) {
        console.log('Performance Metrics:', performanceMetrics);
    }
});

// Measure DOM content loaded time
document.addEventListener('DOMContentLoaded', function() {
    performanceMetrics.domContentLoaded = performance.now();
});

// Service Worker Registration (for future PWA implementation)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}

// Theme Preference Detection
function detectThemePreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // User prefers dark mode - could be implemented in future
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Print Optimization
window.addEventListener('beforeprint', function() {
    // Expand all collapsed content for printing
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'block';
    });
});

window.addEventListener('afterprint', function() {
    // Restore original state after printing
    document.querySelectorAll('.tab-content:not(.active)').forEach(content => {
        content.style.display = 'none';
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

// Unhandled Promise Rejection Handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could implement error reporting here
});

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize theme detection
    detectThemePreference();
    
    // Log initialization
    console.log('Hyses-Nex website initialized successfully');
});

// Video Play Functionality
function playVideo() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('.showcase-video');
    const overlay = document.querySelector('.video-overlay');
    
    if (video && videoWrapper && overlay) {
        video.play();
        videoWrapper.classList.add('playing');
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        
        // Reset overlay when video ends
        video.addEventListener('ended', function() {
            videoWrapper.classList.remove('playing');
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
        });
        
        // Reset overlay when video is paused
        video.addEventListener('pause', function() {
            if (video.currentTime === 0 || video.ended) {
                videoWrapper.classList.remove('playing');
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'all';
            }
        });
    }
}

// Initialize video when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.showcase-video');
    if (video) {
        // Pause video by default
        video.pause();
        
        // Add click listener to video for play/pause toggle
        video.addEventListener('click', function() {
            if (video.paused) {
                playVideo();
            } else {
                video.pause();
            }
        });
    }
});

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounters,
        playVideo
    };
} 