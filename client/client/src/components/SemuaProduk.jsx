import { useContext, useState } from "react";
import ProdukCard from "../properties/produkCard";
import { ProductContext } from "../ProductContext";


export default function SemuaProduk() {
   

    const { products } = useContext(ProductContext);

     // Formatting function to add thousand separators
    const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};

    return (
        <div className="mb-20 flex flex-col">
            <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                    <ProdukCard 
                        key={product._id.toString()}
                        id={product._id.toString()}
                        img={`http://localhost:5000${product.gambarProduk[0]}`}
                        namaProduk={product.namaProduk}
                        hargaProduk={formatPrice(product.hargaProduk)}
                        kondisiProduk={product.kondisi}
                        namaToko={product.namaToko}
                        stockProduk={product.stockProduk}
                    />
                ))}
            </div>
        </div>
    )
}