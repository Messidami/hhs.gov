(function(w, d, v3) {
  w.chaportConfig = {
    appId: '68a78fb8a289c621268d4f98' // your Chaport app ID
  };

  if (w.chaport) return;
  v3 = w.chaport = {};
  v3._q = [];
  v3._l = {};
  v3.q = function() { v3._q.push(arguments) };
  v3.on = function(e, fn) {
    if (!v3._l[e]) v3._l[e] = [];
    v3._l[e].push(fn);
  };

  var s = d.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://app.chaport.com/javascripts/insert.js';
  var ss = d.getElementsByTagName('script')[0];
  ss.parentNode.insertBefore(s, ss);
})(window, document);




// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Get all links that start with #
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll for cards
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
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.support-card, .testimonial-card, .step-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Button click handlers
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different button actions
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('student')) {
                // Handle student application
                alert('Redirecting to Student Application Portal...');
            } else if (buttonText.includes('healthcare') || buttonText.includes('health')) {
                // Handle healthcare worker application
                alert('Redirecting to Healthcare Worker Resources...');
            } else if (buttonText.includes('apply')) {
                // Handle general application
                alert('Redirecting to Application Portal...');
            }
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Stats counter animation
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.textContent.includes('$')) {
                element.textContent = '$' + value.toLocaleString() + 'B';
            } else if (element.textContent.includes('+')) {
                element.textContent = value.toLocaleString() + '+';
            } else {
                element.textContent = value.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const values = [15000, 8500, 2.4, 500];
                    setTimeout(() => {
                        animateValue(stat, 0, values[index], 2000);
                    }, index * 200);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});