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
import ProdukUnggulan from "./ProdukUnggulan";
import MobileTab from "./MobileTab.jsx";
import MobileCart from "./MobileCart.jsx";

export default function Main() {

  const { products } = useContext(ProductContext);

       
 
        const images = [
            BANNER1,
            BANNER2,
            BANNER3,
            BANNER4
        ]
   

        const [currentIndex, setCurrentIndex] = useState(1);
        const [isTransitioning, setIsTransitioning] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState('Semua');
        const [filteredProducts, setFilteredProducts] = useState(products);
        const [activeTab, setActiveTab] = useState('home');
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
     
      const handleCartClick = () => {
        setActiveTab('cart')
        console.log(activeTab)
      };

      const handleHomeClick = () => {
        setActiveTab('home')
        console.log(activeTab)
      };

      const handleProdukClick = () => {
        setActiveTab('produk')
        console.log(activeTab)
      }


    return(
      <ProductContextProvider>

        {activeTab === 'home' && 
          (
            <div className="container mx-auto w-full max-w-[1200px] pt-[75px]">

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
        
              <h2 className="flex font-sans text-xl font-bold px-4 mt-4 mb-2 md:hidden">Produk Unggulan</h2>

              <div className="flex-col items-center w-full md:mt-10 md:mb-10">
                  <div className="hidden flex-col items-center md:flex">
                      <p className="text-center text-xl">- Produk Terlaris</p>
                      <h2 className="text-4xl font-sans font-medium text-center mt-2 mb-14">
                          <span className="text-[#194719]">Produk Unggulan</span> Forland Living
                      </h2>
                  </div>
                  <div className="w-full">
                      <ProdukUnggulan />
                  </div>
              </div>

            <div className="flex flex-col items-center gap-1 mb-10 justify-center align-middle w-full m-auto">
              <div className="hidden md:flex w-full max-w-[1200px] flex-wrap justify-center gap-4 mb-10">
                <button
                  onClick={() => handleCategoryClick('Semua')}
                  className={`${selectedCategory === 'Semua' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
                >
                  <img className="w-6 h-6 mr-2" src={PRODUCT} alt="" />
                  <span className="hidden sm:inline">Semua</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('Sofa')}
                  className={`${selectedCategory === 'Sofa' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
                >
                  <img className="w-6 h-6 mr-2" src={SOFA} alt="" />
                  <span className="hidden sm:inline">Furniture</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('Springbed')}
                  className={`${selectedCategory === 'Springbed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
                >
                  <img className="w-6 h-6 mr-2" src={BED} alt="" />
                  <span className="hidden sm:inline">Springbed</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('Multibed')}
                  className={`${selectedCategory === 'Multibed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
                >
                  <img className="w-6 h-6 mr-2" src={MULTIBED} alt="" />
                  <span className="hidden sm:inline">Multibed</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('Matras')}
                  className={`${selectedCategory === 'Matras' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
                >
                  <img className="w-6 h-6 mr-2" src={MATRAS} alt="" />
                  <span className="hidden sm:inline">Matras</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('Box')}
                  className={`${selectedCategory === 'Box' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
                >
                  <img className="w-6 h-6 mr-2" src={BOX} alt="" />
                  <span className="hidden sm:inline">In A Box</span>
                </button>

                <button
                  onClick={() => handleCategoryClick('Aksesoris')}
                  className={`${selectedCategory === 'Aksesoris' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
                >
                  <img className="w-6 h-6 mr-2" src={AKSESORIS} alt="" />
                  <span className="hidden sm:inline">Aksesoris</span>
                </button>
              </div>

              <div id="semuaProduk" className="flex w-full items-center overflow-hidden md:hidden px-2 mb-2">
                <div className="flex w-full items-center gap-4 overflow-x-auto scroll-snap-mandatory scrollbar-hide touch-pan-x pb-3">
                    <button 
                        onClick={() => handleCategoryClick('Semua')} 
                        className={`${selectedCategory === 'Semua' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[120px] py-2 px-4 border-[1px] rounded-full`}
                    >
                        <img className="w-full max-w-[22px] mr-2" src={PRODUCT} alt="" />
                        <span>Semua</span>
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('Sofa')} 
                        className={`${selectedCategory === 'Sofa' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                    >
                        <img className="w-full max-w-[22px] mr-2" src={SOFA} alt="" />
                        <span>Furniture</span>
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('Springbed')} 
                        className={`${selectedCategory === 'Springbed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                    >
                        <img className="w-full max-w-[22px] mr-2" src={BED} alt="" />
                        <span>Springbed</span>
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('Multibed')} 
                        className={`${selectedCategory === 'Multibed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                    >
                        <img className="w-full max-w-[22px] mr-2" src={MULTIBED} alt="" />
                        <span>Multibed</span>
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('Matras')} 
                        className={`${selectedCategory === 'Matras' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                    >
                        <img className="w-full max-w-[22px] mr-2" src={MATRAS} alt="" />
                        <span>Matras</span>
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('Box')} 
                        className={`${selectedCategory === 'Box' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                    >
                        <img className="w-full max-w-[22px] mr-2" src={BOX} alt="" />
                        <span>In A Box</span>
                    </button>
                    <button 
                        onClick={() => handleCategoryClick('Aksesoris')} 
                        className={`${selectedCategory === 'Aksesoris' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                    >
                        <img className="w-full max-w-[22px] mr-2" src={AKSESORIS} alt="" />
                        <span>Aksesoris</span>
                    </button>
                </div>
            </div>






                  
                  <div className="flex justify-center items-center mb-5">
                    <SemuaProduk products={filteredProducts} />
                  </div>

                  
                </div>

                <div className="hidden w-full max-w-[800px] mx-auto md:flex">
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
          )
        }

        {activeTab === 'cart' && <MobileCart />}

        {activeTab === 'produk' && (
          <div className="container mx-auto w-full max-w-[1200px] pt-[75px]">

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
      
            <h2 className="flex font-sans text-xl font-bold px-4 mt-4 mb-2 md:hidden">Produk Unggulan</h2>

            <div className="flex-col items-center w-full md:mt-10 md:mb-10">
                <div className="hidden flex-col items-center md:flex">
                    <p className="text-center text-xl">- Produk Terlaris</p>
                    <h2 className="text-4xl font-sans font-medium text-center mt-2 mb-14">
                        <span className="text-[#194719]">Produk Unggulan</span> Forland Living
                    </h2>
                </div>
                <div className="w-full">
                    <ProdukUnggulan />
                </div>
            </div>

          <div className="flex flex-col items-center gap-1 mb-10 justify-center align-middle w-full m-auto">
            <div className="hidden md:flex w-full max-w-[1200px] flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={() => handleCategoryClick('Semua')}
                className={`${selectedCategory === 'Semua' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
              >
                <img className="w-6 h-6 mr-2" src={PRODUCT} alt="" />
                <span className="hidden sm:inline">Semua</span>
              </button>

              <button
                onClick={() => handleCategoryClick('Sofa')}
                className={`${selectedCategory === 'Sofa' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
              >
                <img className="w-6 h-6 mr-2" src={SOFA} alt="" />
                <span className="hidden sm:inline">Furniture</span>
              </button>

              <button
                onClick={() => handleCategoryClick('Springbed')}
                className={`${selectedCategory === 'Springbed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
              >
                <img className="w-6 h-6 mr-2" src={BED} alt="" />
                <span className="hidden sm:inline">Springbed</span>
              </button>

              <button
                onClick={() => handleCategoryClick('Multibed')}
                className={`${selectedCategory === 'Multibed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
              >
                <img className="w-6 h-6 mr-2" src={MULTIBED} alt="" />
                <span className="hidden sm:inline">Multibed</span>
              </button>

              <button
                onClick={() => handleCategoryClick('Matras')}
                className={`${selectedCategory === 'Matras' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
              >
                <img className="w-6 h-6 mr-2" src={MATRAS} alt="" />
                <span className="hidden sm:inline">Matras</span>
              </button>

              <button
                onClick={() => handleCategoryClick('Box')}
                className={`${selectedCategory === 'Box' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
              >
                <img className="w-6 h-6 mr-2" src={BOX} alt="" />
                <span className="hidden sm:inline">In A Box</span>
              </button>

              <button
                onClick={() => handleCategoryClick('Aksesoris')}
                className={`${selectedCategory === 'Aksesoris' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-slate-100 border border-slate-200'} flex items-center justify-center py-2 px-4 md:py-3 md:px-6 border rounded-md transition-transform transform hover:scale-105`}
              >
                <img className="w-6 h-6 mr-2" src={AKSESORIS} alt="" />
                <span className="hidden sm:inline">Aksesoris</span>
              </button>
            </div>

            <div id="semuaProduk" className="flex w-full items-center overflow-hidden md:hidden px-2 mb-2">
              <div className="flex w-full items-center gap-4 overflow-x-auto scroll-snap-mandatory scrollbar-hide touch-pan-x pb-3">
                  <button 
                      onClick={() => handleCategoryClick('Semua')} 
                      className={`${selectedCategory === 'Semua' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[120px] py-2 px-4 border-[1px] rounded-full`}
                  >
                      <img className="w-full max-w-[22px] mr-2" src={PRODUCT} alt="" />
                      <span>Semua</span>
                  </button>
                  <button 
                      onClick={() => handleCategoryClick('Sofa')} 
                      className={`${selectedCategory === 'Sofa' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                  >
                      <img className="w-full max-w-[22px] mr-2" src={SOFA} alt="" />
                      <span>Furniture</span>
                  </button>
                  <button 
                      onClick={() => handleCategoryClick('Springbed')} 
                      className={`${selectedCategory === 'Springbed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                  >
                      <img className="w-full max-w-[22px] mr-2" src={BED} alt="" />
                      <span>Springbed</span>
                  </button>
                  <button 
                      onClick={() => handleCategoryClick('Multibed')} 
                      className={`${selectedCategory === 'Multibed' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                  >
                      <img className="w-full max-w-[22px] mr-2" src={MULTIBED} alt="" />
                      <span>Multibed</span>
                  </button>
                  <button 
                      onClick={() => handleCategoryClick('Matras')} 
                      className={`${selectedCategory === 'Matras' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                  >
                      <img className="w-full max-w-[22px] mr-2" src={MATRAS} alt="" />
                      <span>Matras</span>
                  </button>
                  <button 
                      onClick={() => handleCategoryClick('Box')} 
                      className={`${selectedCategory === 'Box' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                  >
                      <img className="w-full max-w-[22px] mr-2" src={BOX} alt="" />
                      <span>In A Box</span>
                  </button>
                  <button 
                      onClick={() => handleCategoryClick('Aksesoris')} 
                      className={`${selectedCategory === 'Aksesoris' ? 'bg-gradient-to-r from-emerald-900 to-emerald-600 text-white' : 'bg-white border border-slate-200'} flex items-center flex-shrink-0 max-w-[150px] py-2 px-4 border-[1px] rounded-full`}
                  >
                      <img className="w-full max-w-[22px] mr-2" src={AKSESORIS} alt="" />
                      <span>Aksesoris</span>
                  </button>
              </div>
          </div>






                
                <div className="flex justify-center items-center mb-5">
                  <SemuaProduk products={filteredProducts} />
                </div>

                
              </div>

              <div className="hidden w-full max-w-[800px] mx-auto md:flex">
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
        )}

        

        <MobileTab 
            keranjang={handleCartClick}
            home={handleHomeClick}
            produk={handleProdukClick}
        />
      </ProductContextProvider>
    )
}