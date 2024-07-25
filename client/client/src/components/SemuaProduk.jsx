import { useContext, useState} from "react";
import ProdukCard from "../properties/produkCard";
import { ProductContext } from "../ProductContext";
import {useEffect} from 'react'


export default function SemuaProduk() {
   

    const { products } = useContext(ProductContext);


     // Shuffle function
     const shuffleProduct = (array) => {
        let shuffleProduct = [...array];
        for (let i = shuffleProduct.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffleProduct[i], shuffleProduct[j]] = [shuffleProduct[j], shuffleProduct[i]];
        }
        return shuffleProduct;
    };

    // Shuffle products when the component mounts
    const [shuffledProducts, setShuffledProducts] = useState([]);

    useEffect(() => {
        setShuffledProducts(shuffleProduct(products));
    }, [products]);

     // Formatting function to add thousand separators
    const formatPrice = (num) => {
    if (!num) return '';
    return `Rp${parseFloat(num).toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
};

    return (
        <div className="mb-20 flex w-full justify-center m-auto">
            <div className="flex w-full justify-center mx-auto">
                <div className="flex justify-center flex-wrap max-w-[900px] mx-auto gap-3">
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