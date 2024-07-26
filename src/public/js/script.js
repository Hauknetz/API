// Features Configurations
const features = {
    headerAnimation: true,
    colorAnimations: true,
    backgroundAnimation: true,
    buttonEffects: true,
    scrollEffects: true,
};

// Utility function to apply CSS animations
const applyAnimation = (element, animationClass, duration = '1s') => {
    element.classList.add(animationClass);
    element.style.animationDuration = duration;
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    }, { once: true });
};

// Header Animation
if (features.headerAnimation) {
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                applyAnimation(header, 'fade-in', '0.5s');
            } else {
                applyAnimation(header, 'fade-out', '0.5s');
            }
        });
    }
}

// Color Animations
if (features.colorAnimations) {
    const colorElements = document.querySelectorAll('[data-color]');
    colorElements.forEach(el => {
        const colors = el.getAttribute('data-color').split(',');
        let colorIndex = 0;

        setInterval(() => {
            el.style.color = colors[colorIndex % colors.length];
            colorIndex++;
        }, 2000); // Change color every 2 seconds
    });
}

// Background Animation
if (features.backgroundAnimation) {
    const backgrounds = [
        'url("path/to/image1.jpg")',
        'url("path/to/image2.jpg")',
        'url("path/to/image3.jpg")'
    ];
    let bgIndex = 0;

    setInterval(() => {
        document.body.style.backgroundImage = backgrounds[bgIndex % backgrounds.length];
        bgIndex++;
    }, 5000); // Change background every 5 seconds
}

// Button Effects
if (features.buttonEffects) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            applyAnimation(button, 'pulse', '0.8s');
        });
    });
}

// Scroll Effects
if (features.scrollEffects) {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    window.addEventListener('scroll', () => {
        scrollElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                applyAnimation(el, 'slide-up', '1s');
            }
        });
    });
}

// Custom Animations
document.addEventListener('DOMContentLoaded', () => {
    // Custom CSS Animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});