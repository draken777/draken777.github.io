// Component Loader Module - Dynamically load HTML components
const ComponentLoader = (() => {
    const components = [
        { id: 'navigation-container', file: 'components/navigation.html' },
        { id: 'home-container', file: 'components/home.html' },
        { id: 'about-container', file: 'components/about.html' },
        { id: 'portfolio-container', file: 'components/portfolio.html' },
        { id: 'contact-container', file: 'components/contact.html' },
        { id: 'footer-container', file: 'components/footer.html' }
    ];

    const init = async () => {
        try {
            await loadAllComponents();
        } catch (error) {
            console.error('Error loading components:', error);
        }
    };

    const loadAllComponents = async () => {
        const promises = components.map(component => 
            loadComponent(component.id, component.file)
        );
        await Promise.all(promises);
    };

    const loadComponent = async (containerId, filePath) => {
        try {
            const response = await fetch(filePath);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            
            const html = await response.text();
            const container = document.getElementById(containerId);
            
            if (container) {
                container.innerHTML = html;
            } else {
                console.warn(`Container with id "${containerId}" not found`);
            }
        } catch (error) {
            console.error(`Error loading component ${filePath}:`, error);
        }
    };

    return { init };
})();

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ComponentLoader.init);
} else {
    ComponentLoader.init();
}
