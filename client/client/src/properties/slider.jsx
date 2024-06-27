import React, { useEffect, useRef } from 'react';

const SliderComponent = ({ images, currentIndex, isTransitioning, prevSlide, nextSlide, slideClassName, imgClassName }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (!isTransitioning) {
                return;
            }
            const slider = sliderRef.current;
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
        <div className="relative w-full m-auto overflow-hidden rounded-2xl">
            <div
                ref={sliderRef}
                className={`slider flex transition-transform duration-700 ease-in-out  ${isTransitioning ? '' : 'no-transition'}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                <div className={`${slideClassName}`}>
                    <img src={images[images.length - 1]} alt={`Slide ${images.length}`} className={imgClassName} />
                </div>
                {images.map((src, index) => (
                    <div key={index} className={`${slideClassName}`}>
                        <img src={src} alt={`Slide ${index + 1}`} className={imgClassName} />
                    </div>
                ))}
                <div className={`${slideClassName}`}>
                    <img src={images[0]} alt={`Slide 1`} className={imgClassName} />
                </div>
            </div>
            
            <button
                className="absolute left-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
                onClick={prevSlide}
            >
                &#10094;
            </button>
            <button
                className="absolute right-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
                onClick={nextSlide}
            >
                &#10095;
            </button>
        </div>
    );
};

export default SliderComponent;