import { useState, useEffect, useRef } from "react";
import SliderComponent from "../properties/slider";

export default function Main() {

        // banner slider
 
        const images = [
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/6/27/0f25d058-81d4-48ed-b463-f765d8ba241d.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/2/13/dd9f7770-c831-4262-b454-8b14d1956412.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/6/25/30f3579c-99f8-468b-8162-06df5e655f8b.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/7/15/01e1f2f4-20ea-4f69-9e7a-3b3df5166553.jpg.webp?ect=4g'
        ]
   

        const [currentIndex, setCurrentIndex] = useState(1);
        const [isTransitioning, setIsTransitioning] = useState(false);
        const slideCountOne = images.length;

        const prevSlide = () => {
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex === 0 ? slideCountOne - 1 : prevIndex - 1;
                setIsTransitioning(true);
                return newIndex;
            });
        };

        const nextSlide = () => {
            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex === slideCountOne + 1 ? 1 : prevIndex + 1;
                setIsTransitioning(true);
                return newIndex;
            });
        };


        // kategori pilihan slider 

        const kategoriPilihanImages = [
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2023/2/17/a1d98cca-c744-4cc4-ab53-33fe4c79bfea.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2023/2/17/86a99924-3426-48d8-b921-a7bdc50aab07.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2023/2/17/95a80eda-6ea8-4702-99f6-3687fbee153f.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2023/2/17/f6e18924-8ff1-4d27-9d3b-844270dedca1.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2023/2/17/ec381502-9d4f-4f0c-a1c7-53597b63a903.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2023/2/17/d10ab990-d323-4def-a614-cbe28d242816.jpg',
        ]

        const [currentKategoriIndex, setCurrentKategoriIndex] = useState(1);
        const [isKategoriTransitioning, setIsKategoriTransitioning] = useState(false);
        const slideCountTwo = kategoriPilihanImages.length;

        const prevSlideKategoriPilihan = () => {
          setCurrentKategoriIndex((prevIndex) => {
              const newIndex = prevIndex === 0 ? slideCountTwo - 1 : prevIndex - 1;
              setIsKategoriTransitioning(true);
              return newIndex;
          });
      };

      const nextSlideKategoriPilihan = () => {
        setCurrentKategoriIndex((prevIndex) => {
              const newIndex = prevIndex === slideCountTwo + 1 ? 1 : prevIndex + 1;
              setIsKategoriTransitioning(true);
              return newIndex;
          });
      };

    return(
      <div className="container mx-auto w-full max-w-[1200px] mt-3">

            <SliderComponent
                images={images}
                currentIndex={currentIndex}
                isTransitioning={isTransitioning}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                slideClassName="flex-shrink-0"
            />
        

          
          <div className="w-full border-[1px] rounded-md border-slate-400 shadow-md p-[16px]  mt-6">
            <div className="flex w-full ">
              <div className="w-[50%]">
                <p className="text-xl font-bold mb-3">Kategori Pilihan</p>
                
                <div className="w-full flex justify-center items-center">
                    <SliderComponent 
                      images={kategoriPilihanImages}
                      currentIndex={currentKategoriIndex}
                      isTransitioning={isKategoriTransitioning}
                      prevSlide={prevSlideKategoriPilihan}
                      nextSlide={nextSlideKategoriPilihan}
                      slideClassName="flex-shrink-0 w-full"
                      imgClassName="w-full max-w-[128px] rounded-lg mr-5"
                    />
                </div>

              </div>
              <div className="w-50%">
                <p>Test</p>
              </div>
            </div>
          </div>


      </div>
    )
}