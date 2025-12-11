// Scroll Module - Smooth scrolling for navigation links
const ScrollModule = (() => {
    const init = () => {
        setupSmoothScroll();
    };

    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navLinks = document.getElementById('navLinks');
                    if (navLinks) {
                        navLinks.classList.remove('active');
                    }
                }
            });
        });
    };

    return { init };
})();

// Initialize scroll on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ScrollModule.init);
} else {
    ScrollModule.init();
}
