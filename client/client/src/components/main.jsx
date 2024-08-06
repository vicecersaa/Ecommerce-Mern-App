import { useState, useEffect, useRef, useContext } from "react";
import SliderComponent from "../properties/slider";
import BED from '../assets/img/double-bed.png';
import BOX from '../assets/img/open-box.png';
import SOFA from '../assets/img/sofa.png';
import PRODUCT from '../assets/img/products.png';
import AKSESORIS from '../assets/img/jewelry.png';
import MATRAS from '../assets/img/air-mattress.png';
import MULTIBED from '../assets/img/bunk-bed.png';
import SemuaProduk from "./SemuaProduk";
import { ProductContextProvider } from "../ProductContext";
import { ProductContext } from '../ProductContext';
import BANNER1 from '../assets/img/banner1.PNG'
import BANNER2 from '../assets/img/banner2.PNG'
import BANNER3 from '../assets/img/banner3.PNG'
import BANNER4 from '../assets/img/banner4.PNG'

export default function  Main() {

  const { products } = useContext(ProductContext);

        // banner slider
 
        const images = [
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/6/27/0f25d058-81d4-48ed-b463-f765d8ba241d.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/2/13/dd9f7770-c831-4262-b454-8b14d1956412.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/6/25/30f3579c-99f8-468b-8162-06df5e655f8b.jpg.webp?ect=4g',
            'https://images.tokopedia.net/img/cache/1200/BgtCLw/2022/7/15/01e1f2f4-20ea-4f69-9e7a-3b3df5166553.jpg.webp?ect=4g'
        ]
   

        const [currentIndex, setCurrentIndex] = useState(1);
        const [isTransitioning, setIsTransitioning] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState('Semua');
        const [filteredProducts, setFilteredProducts] = useState(products);
        const slideCountOne = images.length;

        useEffect(() => {
          if (selectedCategory === 'Semua') {
              setFilteredProducts(products);
          } else {
              setFilteredProducts(products.filter(product => product.categoryProduk.includes(selectedCategory)));
          }
          }, [selectedCategory, products]);
      
          const handleCategoryClick = (category) => {
              setSelectedCategory(category);
          };

        const prevSlide = () => {
          setIsTransitioning(true);
          setCurrentIndex((prevIndex) => {
              const newIndex = prevIndex === 0 ? slideCountOne - 1 : prevIndex - 1;
              return newIndex;
          });
      };

        const nextSlide = () => {
          setIsTransitioning(true);
          setCurrentIndex((prevIndex) => {
              const newIndex = prevIndex === slideCountOne - 1 ? 0 : prevIndex + 1;
              return newIndex;
          });
      };


        // kategori pilihan slider 

        const kategoriPilihanImages = [
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/636845a5-cb9a-4ef6-8d46-d79cb85b5ace.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/4c0884ea-1e56-4a02-bbc0-2f28da742b79.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/56237cd3-29c9-4843-842c-88681b618ea5.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/8532fb7f-ef8d-4689-9ccd-779fa6a1ebdf.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/33eb9260-a21b-4b1b-b4b0-263013ab29b4.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/9c4d3363-da3b-4049-a6f7-d1853320b373.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/df7738a1-099d-4bd7-8c6c-3ba5b7d7f417.jpg',
          'https://images.tokopedia.net/img/cache/200-square/LBbbUK/2022/7/20/c347915e-adc6-41b6-aa35-9c131a17cfdc.jpg'
        ]

        const [currentKategoriIndex, setCurrentKategoriIndex] = useState(0);
        const [isKategoriTransitioning, setIsKategoriTransitioning] = useState(false);
        const slideCountTwo = kategoriPilihanImages.length;

        const prevSlideKategoriPilihan = () => {
          setIsKategoriTransitioning(true);
          setCurrentKategoriIndex((prevIndex) => {
            const newIndex = prevIndex === 0 ? slideCountTwo - 1 : prevIndex - 1;
            return newIndex;
          });
      };

      const nextSlideKategoriPilihan = () => {
        setIsKategoriTransitioning(true);
        setCurrentKategoriIndex((prevIndex) => {
            const newIndex = prevIndex === slideCountTwo - 1 ? 0 : prevIndex + 1;
            return newIndex;
          });
      };


      // Produk Unggulan Slider 

      const ProdukUnggulanImages = [
        'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2024/3/14/ea0ea028-38d1-45b6-90dc-2402716b6c5d.jpg',
        'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2024/3/14/50bae0c6-4a54-4f65-88da-50162a54d490.jpg',
        'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2024/3/14/12bd877a-abab-46b4-85a5-dc04652253ac.jpg',
        'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2024/3/14/19d69a7c-27e1-4003-8b9d-21ff97e247c6.jpg',
        'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2024/3/9/a32385ef-e6eb-4b28-8196-2b1dd9243048.jpg',
      ]

      const [currentProdukIndex, setCurrentProdukIndex] = useState(0);
      const [isProdukTransitioning, setIsProdukTransitioning] = useState(false);
      const slideCountThree = ProdukUnggulanImages.length;

      const prevSlideProdukUnggulan = () => {
        setIsProdukTransitioning(true);
        setCurrentProdukIndex((prevIndex) => {
          const newIndex = prevIndex === 0 ? slideCountThree - 1 : prevIndex - 1;
          return newIndex;
        });
    };

    const nextSlideProdukUnggulan = () => {
      setIsProdukTransitioning(true);
      setCurrentProdukIndex((prevIndex) => {
          const newIndex = prevIndex === slideCountThree - 1 ? 0 : prevIndex + 1;
          return newIndex;
        });
    };


    return(
      <ProductContextProvider>
        <div className="container mx-auto w-full max-w-[1200px] mt-3">

              <SliderComponent
                  images={images}
                  currentIndex={currentIndex}
                  isTransitioning={isTransitioning}
                  prevSlide={prevSlide}
                  nextSlide={nextSlide}
                  slideClassName="flex-shrink-0"
                  visibleSlides={1}
                  buttonClassNameOne="absolute left-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
                  buttonClassNameTwo="absolute right-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
              />
          

            
            <div className="w-full border-[1px] rounded-md shadow-md p-[16px]  mt-6 mb-10">


                <div className="flex w-full">
                  <div className="w-[50%]">
                    <p className="text-xl font-bold mb-[20px]">Produk Unggulan</p>

                    <div className="w-full max-w-[500px] flex justify-center items-center">
                        <SliderComponent 
                          images={ProdukUnggulanImages}
                          currentIndex={currentProdukIndex}
                          isTransitioning={isProdukTransitioning}
                          prevSlide={prevSlideProdukUnggulan}
                          nextSlide={nextSlideProdukUnggulan}
                          slideClassName="w-full flex justify-center items-center flex-shrink-0"
                          imgClassName="w-full max-w-[135px] max-h-[130px] rounded-lg cursor-pointer"
                          visibleSlides={3}
                          buttonClassNameOne="absolute left-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
                          buttonClassNameTwo="absolute right-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
                          linkToCategory="/"
                        />
                    </div>
                  </div>
                  <div className="w-50%">
                    <p className="text-xl font-bold mb-[20px]">Kategori Pilihan</p>
                      
                      <div className="w-full max-w-[500px] flex justify-center items-center">
                          <SliderComponent 
                            images={kategoriPilihanImages}
                            currentIndex={currentKategoriIndex}
                            isTransitioning={isKategoriTransitioning}
                            prevSlide={prevSlideKategoriPilihan}
                            nextSlide={nextSlideKategoriPilihan}
                            slideClassName="w-full flex justify-center items-center flex-shrink-0"
                            imgClassName="w-full max-w-[135px] max-h-[150px] rounded-lg cursor-pointer"
                            visibleSlides={3}
                            buttonClassNameOne="absolute left-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
                            buttonClassNameTwo="absolute right-[10px] top-1/2 transform -translate-y-1/2 bg-white rounded-full hover:bg-opacity-75 text-black font-bold py-2 px-4"
                            linkToCategory="/"
                          />
                      </div>
                  </div>
                </div>
            </div>

            <div className="flex flex-col flex-wrap w-full mt-20 mb-20">
              <div className="flex flex-col justify-center">
                <p className="text-center text-xl">- Our Discount</p>
                <h2 className="text-4xl font-sans font-medium text-center mt-2 mb-8"><span className="text-[#194719]">Forland Living</span> Diskon</h2>
              </div>
              <div className="flex flex-wrap w-full gap-4 justify-center">
                <img className="w-full max-w-[600px] max-h-[337px] " src={BANNER1} alt="Forland Living Banner" />
                <img className="w-full max-w-[400px] max-h-[300px] mt-auto " src={BANNER2} alt="Forland Living Banner" />
                <img className="w-full max-w-[400px] max-h-[300px] object-contain object-top" src={BANNER3} alt="Forland Living Banner" />
                <img className="w-full max-w-[600px] max-h-[300px] " src={BANNER4} alt="Forland Living Banner" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 mt-5 mb-10 justify-center align-middle w-4/5 m-auto">
                <div className="flex justify-center items-center gap-4">
                    <button onClick={() => handleCategoryClick('Semua')} className={`${selectedCategory === 'Semua' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'}} flex w-full max-w-[150px] justify-center items-center py-4 px-4 border-[1px] rounded-md`}>
                        <img className="w-full max-w-[22px] mr-2" src={PRODUCT} alt="" />
                        Semua
                    </button>

                    <button onClick={() => handleCategoryClick('Sofa')} className={`${selectedCategory === 'Sofa' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'}} flex w-full max-w-[150px] justify-center items-center py-4 px-4 border-[1px] rounded-md`}>
                        <img className="w-full max-w-[22px] mr-2" src={SOFA} alt="" />
                        Furniture
                    </button>

                    <button onClick={() => handleCategoryClick('Springbed')} className={`${selectedCategory === 'Springbed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'}} flex w-full max-w-[150px] justify-center items-center py-4 px-4 border-[1px] rounded-md`}>
                        <img className="w-full max-w-[22px] mr-2" src={BED} alt="" />
                        Springbed
                    </button>

                    <button onClick={() => handleCategoryClick('Multibed')} className={`${selectedCategory === 'Multibed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'}} flex w-full max-w-[150px] justify-center items-center py-4 px-4 border-[1px] rounded-md`}>
                        <img className="w-full max-w-[22px] mr-2" src={MULTIBED} alt="" />
                        Multibed
                    </button>

                    <button onClick={() => handleCategoryClick('Matras')} className={`${selectedCategory === 'Matras' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'}} flex w-full max-w-[150px] justify-center items-center py-4 px-4 border-[1px] rounded-md`}>
                        <img className="w-full max-w-[22px] mr-2" src={MATRAS} alt="" />
                        Matras
                    </button>

                    <button onClick={() => handleCategoryClick('Box')} className={`${selectedCategory === 'Box' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'}} flex w-full max-w-[150px] justify-center items-center py-4 px-4 border-[1px] rounded-md`}>
                        <img className="w-full max-w-[22px] mr-2" src={BOX} alt="" />
                        In A Box
                    </button>

                    <button onClick={() => handleCategoryClick('Aksesoris')} className={`${selectedCategory === 'Aksesoris' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'}} flex w-full max-w-[150px] justify-center items-center py-4 px-4 border-[1px] rounded-md`}>
                        <img className="w-full max-w-[22px] mr-2" src={AKSESORIS} alt="" />
                        Aksesoris
                    </button>
            </div>
                  
                  <div className="flex justify-center items-center">
                    <SemuaProduk products={filteredProducts} />
                  </div>

                  
                </div>

                <div className="w-full max-w-[800px] mx-auto">
                    <div>
                      <p className="text-center text-xl">- Follow Us</p>
                      <h2 className="text-4xl font-sans font-medium text-center mt-2">Follow Kita Di <span className="text-[#194719]">Instagram</span></h2>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                      <img className="w-full max-w-[250px] rounded-md" src="https://instagram.fcgk31-1.fna.fbcdn.net/v/t39.30808-6/440445439_18028032743059396_2877836332051300367_n.jpg?stp=dst-jpg_e35&amp;efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOCJ9&amp;_nc_ht=instagram.fcgk31-1.fna.fbcdn.net&amp;_nc_cat=104&amp;_nc_ohc=mF97jRiIS1UQ7kNvgG5pNoA&amp;edm=APs17CUAAAAA&amp;ccb=7-5&amp;ig_cache_key=MzM2MDkyMjkyNTI4NzgzNDA0OQ%3D%3D.2-ccb7-5&amp;oh=00_AYDiWn8PrWvoSjxkynd5oiruQ30Xf8njrb1eNffcYicfjQ&amp;oe=66B7A35E&amp;_nc_sid=10d13b"/>
                      <img className="w-full max-w-[250px] rounded-md" src="https://instagram.fcgk31-1.fna.fbcdn.net/v/t39.30808-6/444482903_18030064232059396_7697780094494666767_n.jpg?stp=dst-jpg_e35&amp;efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOCJ9&amp;_nc_ht=instagram.fcgk31-1.fna.fbcdn.net&amp;_nc_cat=104&amp;_nc_ohc=FPponJIBaLEQ7kNvgHeiS_y&amp;edm=APs17CUAAAAA&amp;ccb=7-5&amp;ig_cache_key=MzM3NDA4MTg2NDY2MTUwNDE4NA%3D%3D.2-ccb7-5&amp;oh=00_AYCyfvqQrkBgaYVYk25rCycCxRCkD70kxfsgbpQb39atyQ&amp;oe=66B7A615&amp;_nc_sid=10d13b"></img>
                      <img className="w-full max-w-[250px] rounded-md" src="https://instagram.fcgk31-1.fna.fbcdn.net/v/t39.30808-6/440113439_18027145511059396_3075250420791859734_n.jpg?stp=dst-jpg_e35&amp;efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOCJ9&amp;_nc_ht=instagram.fcgk31-1.fna.fbcdn.net&amp;_nc_cat=104&amp;_nc_ohc=kL6_CbMhRHAQ7kNvgGOYIBd&amp;edm=APs17CUAAAAA&amp;ccb=7-5&amp;ig_cache_key=MzM1MzY3MDEyMDU4MzkyNjk5MQ%3D%3D.2-ccb7-5&amp;oh=00_AYC_3L8QlMhyJlJEKpXrqXfnDF1hHFGlIF81oW2WWz0egw&amp;oe=66B7AEDB&amp;_nc_sid=10d13b"></img>
                      <img className="w-full max-w-[250px] rounded-md" src="https://instagram.fcgk31-1.fna.fbcdn.net/v/t39.30808-6/436301994_18026618222059396_7764280160470062101_n.jpg?stp=dst-jpg_e35&amp;efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOCJ9&amp;_nc_ht=instagram.fcgk31-1.fna.fbcdn.net&amp;_nc_cat=104&amp;_nc_ohc=ggMijAYiRrsQ7kNvgFw3p9O&amp;edm=APs17CUAAAAA&amp;ccb=7-5&amp;ig_cache_key=MzM0OTA3OTM1ODY3MjAxMjI4OQ%3D%3D.2-ccb7-5&amp;oh=00_AYAsV9ayhLYWRrQ8ssr_OR7xreCyksVBnM1rOt-6moFMSQ&amp;oe=66B7AFFE&amp;_nc_sid=10d13b"></img>
                      <img className="w-full max-w-[250px] rounded-md" src="https://instagram.fcgk31-1.fna.fbcdn.net/v/t39.30808-6/440367003_18027144809059396_5118538823498032477_n.jpg?stp=dst-jpg_e35&amp;efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOCJ9&amp;_nc_ht=instagram.fcgk31-1.fna.fbcdn.net&amp;_nc_cat=104&amp;_nc_ohc=016zh_OQTWEQ7kNvgEVUn0v&amp;edm=APs17CUAAAAA&amp;ccb=7-5&amp;ig_cache_key=MzM1MzAxNjM0NzkwMTQzODE0NA%3D%3D.2-ccb7-5&amp;oh=00_AYD9Dlo0DqcxafxBtDCSsRnuVoQcXfy9Nqas0Br4TFmlkw&amp;oe=66B7C88C&amp;_nc_sid=10d13b"></img>
                      <img className="w-full max-w-[250px] rounded-md"src="https://instagram.fcgk31-1.fna.fbcdn.net/v/t39.30808-6/436270607_18026293181059396_9164350759498850734_n.jpg?stp=dst-jpg_e35&amp;efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOCJ9&amp;_nc_ht=instagram.fcgk31-1.fna.fbcdn.net&amp;_nc_cat=104&amp;_nc_ohc=0r9F8C4zcTsQ7kNvgFfreYo&amp;edm=APs17CUAAAAA&amp;ccb=7-5&amp;ig_cache_key=MzM0Nzg4OTM5NTY3MDY0ODIxOA%3D%3D.2-ccb7-5&amp;oh=00_AYDnDOmKEQ6ljHeseGxrMuVrAP7wPkgBgrz6G77PQQYByg&amp;oe=66B7C9A0&amp;_nc_sid=10d13b"></img>
                    </div>
                  </div>
               
            

        </div>
      </ProductContextProvider>
    )
}