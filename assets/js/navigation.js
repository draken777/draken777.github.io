// Navigation Module - reliable mobile toggle and scroll behavior
const NavigationModule = (() => {
    let toggleEl = null;
    let navEl = null;
    let navbarEl = null;

    const init = () => {
        // Acquire elements (may be injected before/after script run)
        toggleEl = document.getElementById('menuToggle');
        navEl = document.getElementById('navLinks');
        navbarEl = document.getElementById('navbar');

        if (!navEl) return; // nothing to do

        setupToggle();
        setupOutsideClick();
        setupEscapeKey();
        setupResizeHandler();
        setupNavbarScroll();
    };

    const setupToggle = () => {
        if (!toggleEl) return;

        // Prevent duplicate handlers
        toggleEl.removeEventListener('click', onToggleClick);
        toggleEl.addEventListener('click', onToggleClick);
    };

    const onToggleClick = (e) => {
        e.stopPropagation();
        if (!navEl) return;
        const isOpen = navEl.classList.toggle('active');
        // update aria-expanded on toggle for accessibility
        if (toggleEl) toggleEl.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        // add a class to the toggle for styling (optional)
        if (toggleEl) toggleEl.classList.toggle('open', isOpen);
    };

    const setupOutsideClick = () => {
        // Close menu when clicking or touching outside nav
        document.addEventListener('click', (e) => {
            if (!navEl) return;
            const target = e.target;
            if (navEl.classList.contains('active')) {
                if (toggleEl && (toggleEl.contains(target) || target.closest('#menuToggle'))) {
                    // click on toggle already handled
                    return;
                }
                if (!navEl.contains(target)) {
                    navEl.classList.remove('active');
                }
            }
        });

        document.addEventListener('touchstart', (e) => {
            if (!navEl) return;
            const target = e.target;
            if (navEl.classList.contains('active')) {
                if (toggleEl && (toggleEl.contains(target) || target.closest('#menuToggle'))) {
                    return;
                }
                if (!navEl.contains(target)) {
                    navEl.classList.remove('active');
                }
            }
        }, { passive: true });
    };

    const setupEscapeKey = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navEl && navEl.classList.contains('active')) {
                navEl.classList.remove('active');
            }
        });
    };

    const setupResizeHandler = () => {
        window.addEventListener('resize', () => {
            if (!navEl) return;
            // close the mobile menu when switching to desktop layout
            if (window.innerWidth > 768 && navEl.classList.contains('active')) {
                navEl.classList.remove('active');
            }
        });
    };

    const setupNavbarScroll = () => {
        window.addEventListener('scroll', () => {
            if (!navbarEl) return;
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > 50) {
                navbarEl.classList.add('scrolled');
            } else {
                navbarEl.classList.remove('scrolled');
            }
        }, { passive: true });
    };

    return { init };
})();

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', NavigationModule.init);
} else {
    NavigationModule.init();
}
