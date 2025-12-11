// Navigation Module
const NavigationModule = (() => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    const init = () => {
        setupMenuToggle();
        setupOutsideClickHandler();
        setupNavbarScroll();
    };

    const setupMenuToggle = () => {
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    };

    const setupOutsideClickHandler = () => {
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    };

    const setupNavbarScroll = () => {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    };

    return { init };
})();

// Initialize navigation on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', NavigationModule.init);
} else {
    NavigationModule.init();
}
