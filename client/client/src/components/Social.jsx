import SHOPEE from '../assets/img/Shopee.png';
import TOKOPEDIA from '../assets/img/Tokopedia.png';
import LAZADA from '../assets/img/Lazada.png';
import AKULAKU from '../assets/img/Akulaku.png';
import BLIBLI from '../assets/img/Blibli.png';
import BUKALAPAK from '../assets/img/Bukalapak.png'
import INSTAGRAM from '../assets/img/Instagram.png';
import TIKTOK from '../assets/img/tiktok.png';
import YOUTUBE from '../assets/img/youtube.png';
import FACEBOOK from '../assets/img/facebook.png'

export default function Social() {
    return (
        <div id='tentang-kami'>
            <div className="hidden md:flex justify-center mt-10 mb-10">
                <h2 className="font-sans font-bold text-4xl"><span className="text-[#194719]">Forland Living</span> Sosial Media :</h2>
            </div>
            
            <div className="hidden justify-center mt-4 gap-5 md:flex">
                <a href="https://www.instagram.com/forland.living/" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={INSTAGRAM} alt="" />
                      <span className="font-sans">Instagram</span>
                  </button>
                  </a>
                  <a href="https://www.tiktok.com/@forlandliving" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={TIKTOK} alt="" />
                      <span className="font-sans">Tiktok</span>
                  </button>
                  </a>
                  <a href="https://www.youtube.com/channel/UCMbvvF7XvONQADJx1c1LwCw" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={YOUTUBE} alt="" />
                      <span className="font-sans">Youtube</span>
                  </button>
                  </a>
                  <a href="https://www.facebook.com/forland.springbed/" target="_blank">
                  <button 
                     className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={FACEBOOK} alt="" />
                      <span className="font-sans">Facebook</span>
                  </button>
                  </a>
            </div>

            <div className="hidden md:flex justify-center mt-14 mb-10">
                <h2 className="font-sans font-bold text-4xl"><span className="text-[#194719]">Forland Living</span> Tersedia Juga Di :</h2>
            </div>

            <div className="hidden justify-center mt-4 gap-5 md:flex">
                <a href="https://shopee.co.id/forland.living" target="_blank">
                    <button 
                        className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                    >
                        <img className="w-full max-w-[22px] mr-2" src={SHOPEE} alt="" />
                        <span className="font-sans">Shopee</span>
                    </button>
                </a>
                <a href="https://www.tokopedia.com/forland" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={TOKOPEDIA} alt="" />
                      <span className="font-sans">Tokopedia</span>
                  </button>
                </a>
                <a href="https://www.blibli.com/brand/forland" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={BLIBLI} alt="" />
                      <span className="font-sans">BliBli</span>
                  </button>
                </a>
                <a href="https://m.bukalapak.com/forland-living-official" target="_blank">
                  <button 
                     className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={BUKALAPAK} alt="" />
                      <span className="font-sans">Bukalapak</span>
                  </button>
                </a>
                <a href="https://ec-mall.akulaku.com/ec-basic/merchant/main?vendorId=3237797879657824259&shopId=3237797879657824259&hideTopBar=1" target="_blank">
                  <button 
                     className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={AKULAKU} alt="" />
                      <span className="font-sans">Akulaku</span>
                  </button>
                </a>
                <a href="https://www.lazada.co.id/shop/forland/" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={LAZADA} alt="" />
                      <span className="font-sans">Lazada</span>
                  </button>
                </a>

            </div>

            

            <div className="h-[5px] bg-[#e6e5e5] mb-6 flex md:hidden"></div>

            <div className="flex">
                <h2 className="flex font-sans text-xl font-bold px-4 mt-4 mb-4 md:hidden text-center">Belanja juga disini</h2>
            </div>

            <div className="flex w-full items-center overflow-hidden md:hidden px-2 mb-2">
              <div className="flex w-full items-center gap-4 overflow-x-auto scroll-snap-mandatory scrollbar-hide touch-pan-x pb-3">
                  <a href="https://shopee.co.id/forland.living" target="_blank">
                    <button 
                        className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                    >
                        <img className="w-full max-w-[22px] mr-2" src={SHOPEE} alt="" />
                        <span className="font-sans">Shopee</span>
                    </button>
                  </a>
                  <a href="https://www.tokopedia.com/forland" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={TOKOPEDIA} alt="" />
                      <span className="font-sans">Tokopedia</span>
                  </button>
                  </a>
                  <a href="https://www.blibli.com/brand/forland" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={BLIBLI} alt="" />
                      <span className="font-sans">BliBli</span>
                  </button>
                  </a>
                  <a href="https://m.bukalapak.com/forland-living-official" target="_blank">
                  <button 
                     className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={BUKALAPAK} alt="" />
                      <span className="font-sans">Bukalapak</span>
                  </button>
                  </a>
                  <a href="https://ec-mall.akulaku.com/ec-basic/merchant/main?vendorId=3237797879657824259&shopId=3237797879657824259&hideTopBar=1" target="_blank">
                  <button 
                     className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={AKULAKU} alt="" />
                      <span className="font-sans">Akulaku</span>
                  </button>
                  </a>
                  <a href="https://www.lazada.co.id/shop/forland/" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={LAZADA} alt="" />
                      <span className="font-sans">Lazada</span>
                  </button>
                  </a>
              </div>
          </div>

       

          <div className="flex">
                <h2 className="flex font-sans text-xl font-bold px-4 mt-4 mb-4 md:hidden text-center">Social Media Forland</h2>
            </div>

            <div className="flex w-full items-center overflow-hidden md:hidden px-2 mb-2 pb-[75px]">
              <div className="flex w-full items-center gap-4 overflow-x-auto scroll-snap-mandatory scrollbar-hide touch-pan-x pb-3">
                  <a href="https://www.instagram.com/forland.living/" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={INSTAGRAM} alt="" />
                      <span className="font-sans">Instagram</span>
                  </button>
                  </a>
                  <a href="https://www.tiktok.com/@forlandliving" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={TIKTOK} alt="" />
                      <span className="font-sans">Tiktok</span>
                  </button>
                  </a>
                  <a href="https://www.youtube.com/channel/UCMbvvF7XvONQADJx1c1LwCw" target="_blank">
                  <button 
                      className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={YOUTUBE} alt="" />
                      <span className="font-sans">Youtube</span>
                  </button>
                  </a>
                  <a href="https://www.facebook.com/forland.springbed/" target="_blank">
                  <button 
                     className="px-5 py-2 flex items-center justify-center md:py-3 md:px-6 border rounded-full transition-transform transform hover:scale-105 font-sans text-center"
                  >
                      <img className="w-full max-w-[22px] mr-2" src={FACEBOOK} alt="" />
                      <span className="font-sans">Facebook</span>
                  </button>
                  </a>
              </div>
          </div>
         </div>

    )
}