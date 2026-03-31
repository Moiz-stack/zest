document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Sticky & Blur Transition
    const nav = document.querySelector('nav');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial Check

    // 2. High-Performance Intersection Observer for Reveal Orchestration
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // If it's a reveal group, stagger the children
                if (target.classList.contains('reveal-group')) {
                    const children = target.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 150}ms`;
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) scale(1)';
                        child.style.filter = 'blur(0)';
                    });
                    target.classList.add('active');
                } else {
                    target.classList.add('active');
                }
                
                // Only unobserve if we don't want repeat animations
                // revealObserver.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe all single reveals and reveal groups
    document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Magnetic Hover Physics (Subtle / Refined Version)
    const magneticItems = document.querySelectorAll('.bento-item, .img-frame, .btn-main');
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Very subtle 5px pull
            item.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) translateY(-10px) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0) translateY(0) scale(1)';
        });
    });

    // 4. Perfect Smooth Scroll with Dynamic Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = nav.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
