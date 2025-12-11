// Animations Module - Intersection Observer for fade-in animations
const AnimationsModule = (() => {
    const init = () => {
        setupIntersectionObserver();
    };

    const setupIntersectionObserver = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements that should fade in
        document.querySelectorAll('.card, .portfolio-card, .contact-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    };

    return { init };
})();

// Initialize animations on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', AnimationsModule.init);
} else {
    AnimationsModule.init();
}
