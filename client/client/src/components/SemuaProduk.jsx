import { useContext, useState } from "react";
import axios from "axios";
import ProdukCard from "../properties/produkCard";
import { ProductContext } from "../ProductContext";
import ProdukDetail from "../pages/produkDetail";

export default function SemuaProduk() {
   

    const { products } = useContext(ProductContext);


    return (
        <div className="mb-20 flex flex-col">
            <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                    <ProdukCard 
                        key={product._id.toString()}
                        id={product._id.toString()}
                        img={`http://localhost:5000${product.gambarProduk}`}
                        namaProduk={product.namaProduk}
                        hargaProduk={product.hargaProduk}
                        kondisiProduk={product.kondisi}
                        namaToko={product.namaToko}
                        stockProduk={product.stockProduk}
                    />
                ))}
            </div>
        </div>
    )
}