import { useContext, useState } from "react"
import axios from "axios"
import ProdukCard from "../properties/produkCard";
import { ProductContext } from "../ProductContext";
import ProdukDetail from "../pages/produkDetail";


export default function SemuaProduk() {

     // State untuk data produk
     const [namaProduk, setNamaProduk] = useState('');
     const [hargaProduk, setHargaProduk] = useState(0);
     const [namaToko, setNamaToko] = useState('');
     const [kondisi, setKondisi] = useState('');
     const [deskripsi, setDeskripsi] = useState('');
     const [gambarProduk, setGambarProduk] = useState('');
     const [stockProduk, setStockProduk] = useState(0);

     const { products } = useContext(ProductContext);

 
     // Fungsi untuk mengirim data produk ke server
     async function createProduct(e) {
         e.preventDefault();
         try {
             await axios.post('http://localhost:5000/products', {
                 namaProduk,
                 hargaProduk,
                 namaToko,
                 kondisi,
                 deskripsi,
                 gambarProduk,
                 stockProduk,
             });
             alert("Registrasi berhasil!");
         } catch (error) {
             alert('Registrasi gagal, silakan coba lagi.');
             console.error('Error creating product:', error);
         }
     }

    return (
        <div className="mb-20 flex flex-col">

            <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                    <ProdukCard 
                        key={product._id.toString()}
                        id={product._id.toString()}
                        img={product.gambarProduk}
                        namaProduk={product.namaProduk}
                        hargaProduk={product.hargaProduk}
                        kondisiProduk={product.kondisi}
                        namaToko={product.namaToko}
                        stockProduk={product.stockProduk}
                    />
                ))}
            </div>

            <form className="flex flex-col" onSubmit={createProduct}>
                <input 
                    type="text" placeholder="Gambar Produk" 
                    value={gambarProduk}
                    onChange={e => setGambarProduk(e.target.value)}
                />
                <input 
                    type="text" placeholder="Nama Produk"
                    value={namaProduk}
                    onChange={e => setNamaProduk(e.target.value)}
                />
                <input 
                    type="text" placeholder="Harga Produk" 
                    value={hargaProduk}
                    onChange={e => setHargaProduk(e.target.value)}    
                />
                <input 
                    type="text" placeholder="Nama Toko"
                    value={namaToko}
                    onChange={e => setNamaToko(e.target.value)}
                />
                <input 
                    type="text" placeholder="Kondisi Barang"
                    value={kondisi}
                    onChange={e => setKondisi(e.target.value)} 
                />
                <textarea 
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukan deskripsi produk..."
                    rows="4"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                </textarea>
                <input 
                    type="text" placeholder="Stock Barang"
                    value={stockProduk}
                    onChange={e => setStockProduk(e.target.value)}
                />
                <button className='w-full bg-[#03AC0E] rounded-xl py-3 px-4 text-white font-bold text-[16px] hover:cursor-pointer'>Create Product</button>
            </form>
            
            
        </div>
    )
}