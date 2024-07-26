document.addEventListener('DOMContentLoaded', () => {
    // Automatic Slider
    const autoSlider = (() => {
        const slider = document.querySelector('.auto-slider');
        const slides = slider.querySelectorAll('.slide');
        const intervalTime = 3000; // Change slide every 3 seconds
        let currentIndex = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        };

        setInterval(nextSlide, intervalTime);
        showSlide(currentIndex);
    })();

    // Manual Slider
    const manualSlider = (() => {
        const slider = document.querySelector('.manual-slider');
        const slides = slider.querySelectorAll('.slide');
        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');
        let currentIndex = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        };

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        showSlide(currentIndex);
    })();
});