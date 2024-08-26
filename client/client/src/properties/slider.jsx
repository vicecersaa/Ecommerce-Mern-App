import React, { useEffect, useRef } from 'react';

const SliderComponent = ({ 
    images, 
    currentIndex, 
    isTransitioning, 
    prevSlide, 
    nextSlide, 
    slideClassName, 
    imgClassName, 
    visibleSlides, 
    buttonClassNameOne, 
    buttonClassNameTwo,
    linkToCategory
}) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (!isTransitioning) {
                return;
            }
            const slideCount = images.length;

            if (currentIndex === slideCount + 1) {
                prevSlide();
            } else if (currentIndex === 0) {
                nextSlide();
            }
        };

        const slider = sliderRef.current;
        slider.addEventListener('transitionend', handleTransitionEnd);

        return () => {
            slider.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, [currentIndex, isTransitioning, images, prevSlide, nextSlide]);

    return (
        <div className="relative w-full m-auto overflow-hidden md:rounded-2xl md:pt-[150px]">
            <div
                ref={sliderRef}
                className={`slider flex transition-transform duration-700 ease-in-out  ${isTransitioning ? '' : 'no-transition'}`}
                style={{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }}
            >
                <div className={`${slideClassName}`} style={{ flex: `0 0 ${100 / visibleSlides}%` }}>
                    <img src={images[images.length - 1]} alt={`Slide ${images.length}`} className={imgClassName} />
                </div>
                {images.map((src, index) => (
                    <div key={index} className={`${slideClassName}`} style={{ flex: `0 0 ${100 / visibleSlides}%` }}>
                        <a href={linkToCategory}>
                            <img src={src} alt={`Slide ${index + 1}`} className={imgClassName} />
                        </a>
                    </div>
                ))}
                <div className={`${slideClassName}`} style={{ flex: `0 0 ${100 / visibleSlides}%` }}>
                    <img src={images[0]} alt={`Slide 1`} className={imgClassName} />
                </div>
            </div>
            
            <button
                className={`${buttonClassNameOne}`}
                onClick={prevSlide}
            >
                &#10094;
            </button>
            <button
                className={`${buttonClassNameTwo}`}
                onClick={nextSlide}
            >
                &#10095;
            </button>
        </div>
    );
};

export default SliderComponent;