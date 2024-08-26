import { useState, useEffect } from "react";
import ProdukCard from "../properties/produkCard";

export default function SemuaProduk({ products }) {
    
    const shuffleProduct = (array) => {
        let shuffleProduct = [...array];
        for (let i = shuffleProduct.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffleProduct[i], shuffleProduct[j]] = [shuffleProduct[j], shuffleProduct[i]];
        }
        return shuffleProduct;
    };

    
    const [shuffledProducts, setShuffledProducts] = useState([]);

    useEffect(() => {
        setShuffledProducts(shuffleProduct(products));
    }, [products]);

    
    const formatPrice = (num) => {
        if (!num) return '';
        return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
    };

    return (
        <div className="flex w-full justify-center m-auto">
            <div className="flex w-full max-w-[1200px] justify-center mx-auto">
                <div className="flex flex-wrap justify-start md:justify-center md:gap-5 w-full max-w-[1200px] mx-auto gap-1">
                    {shuffledProducts.map((product) => (
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
        </div>
    )
}
