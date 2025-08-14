// MOBIHUB lite - Modern JavaScript Implementation

// DOM Elements
let cookiePopup, acceptAllBtn, acceptNecessaryBtn, faqItems, ctaButtons;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeCookiePopup();
    initializeFAQ();
    initializeCTAButtons();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeHeader();
    initializePerformanceMonitoring();
    initializeVideoAutoplay();
});

// Initialize DOM elements
function initializeElements() {
    cookiePopup = document.getElementById('cookie-popup');
    acceptAllBtn = document.getElementById('accept-all');
    acceptNecessaryBtn = document.getElementById('accept-necessary');
    faqItems = document.querySelectorAll('.faq-item');
    ctaButtons = document.querySelectorAll('.cta-button, #floating-telegram-btn');
}

// Cookie Popup Functionality
function initializeCookiePopup() {
    // Show cookie popup if not already accepted
    if (!getCookie('cookie_consent')) {
        setTimeout(() => {
            if (cookiePopup) {
                cookiePopup.classList.add('show');
            }
        }, 1000);
    }

    // Accept all cookies
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', function() {
            setCookie('cookie_consent', 'all', 365);
            hideCookiePopup();
            initializeAnalytics();
        });
    }

    // Accept only necessary cookies
    if (acceptNecessaryBtn) {
        acceptNecessaryBtn.addEventListener('click', function() {
            setCookie('cookie_consent', 'necessary', 365);
            hideCookiePopup();
        });
    }
}

function hideCookiePopup() {
    if (cookiePopup) {
        cookiePopup.classList.remove('show');
        setTimeout(() => {
            cookiePopup.style.display = 'none';
        }, 300);
    }
}

// FAQ Accordion Functionality
function initializeFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// CTA Buttons Functionality
function initializeCTAButtons() {
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if href is "#" or empty
            if (!href || href === '#') {
                e.preventDefault();
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Log the click
            console.log('CTA button clicked:', this.id || 'cta_click');
            
            // If href is valid and not "#", let the browser handle the navigation
            if (href && href !== '#') {
                console.log('Navigating to:', href);
            }
        });
    });
}

// Track conversion events
function trackConversion(eventName) {
    try {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'event_category': 'CTA',
                'event_label': eventName,
                'value': 1
            });
        }
        
        // Custom tracking
        console.log('Conversion tracked:', eventName);
    } catch (error) {
        console.warn('Tracking error:', error);
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .benefit-card, .step-card, .review-card, .section-header, .instruction-step'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header scroll effect
function initializeHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background on scroll
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll (only on mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// Cookie utilities
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize Google Analytics if consent given
function initializeAnalytics() {
    if (getCookie('cookie_consent') === 'all') {
        // Initialize GA4 if not already done
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'load',
                    'value': loadTime
                });
            }
            
            console.log('Page load time:', loadTime + 'ms');
        }
    });
    
    // Monitor largest contentful paint
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver(function(list) {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'LCP', {
                        'value': lastEntry.startTime
                    });
                }
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
            console.warn('Performance observer error:', error);
        }
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
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
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error ? e.error.toString() : 'Unknown error',
            'fatal': false
        });
    }
});

// Utility functions
const Utils = {
    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format number with locale
    formatNumber: function(num, locale = 'ru-RU') {
        return new Intl.NumberFormat(locale).format(num);
    },
    
    // Generate random ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Mobile detection and optimization
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Mobile-specific optimizations
    document.body.classList.add('mobile');
    
    // Prevent zoom on input focus
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        });
        
        input.addEventListener('blur', function() {
            document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0');
        });
    });
}

// Initialize lazy loading
initializeLazyLoading();

// Initialize video autoplay on scroll
function initializeVideoAutoplay() {
    const video = document.getElementById('youtube-video');
    if (!video) return;

    let hasPlayed = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasPlayed) {
                // Start autoplay when video comes into view
                const currentSrc = video.src;
                if (currentSrc.includes('autoplay=0')) {
                    video.src = currentSrc.replace('autoplay=0', 'autoplay=1');
                    hasPlayed = true;
                }
            } else if (!entry.isIntersecting && hasPlayed) {
                // Pause video when it goes out of view
                const currentSrc = video.src;
                if (currentSrc.includes('autoplay=1')) {
                    video.src = currentSrc.replace('autoplay=1', 'autoplay=0');
                    // Reload iframe to stop playback
                    setTimeout(() => {
                        video.src = video.src;
                    }, 100);
                }
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of video is visible
        rootMargin: '0px 0px -100px 0px' // Start trigger 100px before video enters view
    });

    observer.observe(video);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
} 