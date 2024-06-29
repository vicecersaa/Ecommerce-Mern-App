import React, {useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext, ProductContextProvider } from "../ProductContext";
import Header from "../components/header";
import STARS from "../assets/img/star.png";


export default function ProdukDetail() {
    const {id} = useParams();
    console.log('ID from URL:', id);
    const {products, loading} = useContext(ProductContext);
    const [product, setProduct] = useState(null);


    useEffect(() => {
        if (!loading && products) {
          console.log('Available products:', products); // Debug log
          console.log('Searching for product with ID:', id); // Debug log
          const foundProduct = products.find((p) => p._id.toString() === id.toString());
          setProduct(foundProduct);
          console.log('Found product:', foundProduct); // Debug log
        }
      }, [products, loading, id]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!product) {
        return <div>Product not found</div>;
      }

      return (
            <div>
                <Header />

                <div className="container mx-auto w-full max-w-[1200px] mt-5 flex justify-between gap-5">

                    <div className="w-full max-w-[350px]">
                        <img className="w-full max-w-[350px]" src={product.gambarProduk} alt={product.namaProduk} />
                        <div className="flex mt-2 gap-5">
                            <img className="w-full max-w-[60px]" src={product.gambarProduk} alt={product.namaProduk} />
                            <img className="w-full max-w-[60px]" src={product.gambarProduk} alt={product.namaProduk} />
                            <img className="w-full max-w-[60px]" src={product.gambarProduk} alt={product.namaProduk} />
                            <img className="w-full max-w-[60px]" src={product.gambarProduk} alt={product.namaProduk} />
                        </div>
                    </div>

                    <div className="w-full max-w-[450px]">
                        <h1 className="font-bold text-[20px]">{product.namaProduk}</h1>

                        <div className="flex items-center gap-1">
                            <img className="w-full max-w-[13px]" src={STARS} alt="" />
                            <span>{product.ratings}</span>
                        </div>

                        <p className="font-bold text-[28px] mb-5 mt-3">{product.hargaProduk}</p>

                        <p className="text-slate-500 font-medium">
                            Kondisi : <span className="text-black font-normal">{product.kondisi}</span>
                        </p>

                        <p className="text-slate-500 font-medium">
                            Minimal Pesanan : <span className=" text-black font-normal">1 Buah</span>
                        </p>

                        <p className="mb-3 text-slate-500 font-medium">
                            Toko : <span className="text-[#03AC0E] font-semibold">{product.namaToko}</span>
                        </p>

                        <p className="whitespace-pre-wrap text-sm">
                            {product.deskripsi}
                        </p>

                    </div>


                    <div className="w-full max-w-[300px] p-[12px] border-[1px] shadow-md h-full rounded-lg">
                        <p className="font-bold text-[#212121] text-[18px] mb-[12px]">Atur jumlah dan catatan</p>

                        <div className="flex items-center">
                            <img className="w-full max-w-[60px] mr-2" src={product.gambarProduk} alt={product.namaProduk} />
                            <p className="w-full truncate max-w-[200px]">{product.namaProduk}</p>
                        </div>
                        
                        <div className="flex items-center mt-5">

                            <div className="flex w-full max-w-[100px] items-center justify-between border-[1px] border-slate-400 rounded-lg mr-3">
                                <button class="px-3  text-black rounded-l-md ">-</button>
                                <span id="counterValue" class="px-4 py-1 bg-gray-100 text-gray-800 font-bold">0</span>
                                <button class="px-3 text-black rounded-r-md ">+</button>
                            </div>

                            <p>Stok: <span className="font-bold">{product.stockProduk}</span></p>
                        </div>

                        <div className="flex items-center mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1 text-[#03AC0E]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <p className="text-sm text-[#03AC0E] font-semibold">Tambahkan Catatan</p>
                        </div>

                        <div className="flex items-center justify-between mt-10">
                            <p className="text-gray-500">Subtotal</p>
                            <p className="text-[#212121] font-bold text-[18px]">{product.hargaProduk}</p>
                        </div>

                        <div className="mt-3">
                            <button className="w-full bg-[#00AA5B] py-2 px-1 text-white font-semibold rounded-lg">+ Keranjang</button>
                            <button className="w-full border-[#00AA5B] border-[1px] bg-white py-2 text-[#00AA5B] font-semibold rounded-lg mt-2">Beli Langsung</button>
                        </div>
                    </div>


                </div>


            </div>
      )
    
}