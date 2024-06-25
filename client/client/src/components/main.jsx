import { useState, useEffect, useRef } from "react";

export default function Main() {

 
        const images = [
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/6/27/0f25d058-81d4-48ed-b463-f765d8ba241d.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/2/13/dd9f7770-c831-4262-b454-8b14d1956412.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/6/25/30f3579c-99f8-468b-8162-06df5e655f8b.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/7/15/01e1f2f4-20ea-4f69-9e7a-3b3df5166553.jpg.webp?ect=4g'
        ]
   

        const [currentIndex, setCurrentIndex] = useState(0);
        const [isTransitioning, setIsTransitioning] = useState(false);
        const sliderRef = useRef(null);
      
        const slideCount = images.length;
      
        const showSlide = (index) => {
          if (index >= slideCount + 1) {
            setCurrentIndex(1);
          } else if (index < 0) {
            setCurrentIndex(slideCount - 1);
          } else {
            setCurrentIndex(index);
          }
        };
      
        const nextSlide = () => showSlide(currentIndex + 1);
        const prevSlide = () => showSlide(currentIndex - 1);
      
        useEffect(() => {
          const handleTransitionEnd = () => {
            setIsTransitioning(false);
            if (currentIndex === slideCount + 1) {
              setCurrentIndex(1);
            } else if (currentIndex === 0) {
              setCurrentIndex(slideCount);
            }
          };
      
          const slider = sliderRef.current;
          slider.addEventListener('transitionend', handleTransitionEnd);
      
          return () => {
            slider.removeEventListener('transitionend', handleTransitionEnd);
          };
        }, [currentIndex, slideCount]);
      

    return(
    <div className="container mx-auto w-full max-w-[1200px] mt-3">
        <div className="relative w-full mx-auto overflow-hidden rounded-2xl">
            <div
                ref={sliderRef}
                className={`slider flex transition-transform duration-700 ease-in-out ${isTransitioning ? '' : 'no-transition'}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                <div className="w-full flex-shrink-0">
                    <img src={images[slideCount - 1]} alt={`Slide ${slideCount}`} className="w-full" />
                </div>
            {images.map((src, index) => (
                <div key={index} className="w-full flex-shrink-0">
                <img src={src} alt={`Slide ${index + 1}`} className="w-full" />
                </div>
            ))}
            <div className="w-full flex-shrink-0">
                <img src={images[0]} alt={`Slide 1`} className="w-full" />
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
    </div>
    )
}