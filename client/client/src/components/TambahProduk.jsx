import { useContext, useState } from "react";
import axios from "axios";
import ProdukCard from "../properties/produkCard";
import { ProductContext } from "../ProductContext";

export default function TambahProduk() {

     // State untuk data produk
    const [namaProduk, setNamaProduk] = useState('');
    const [hargaProduk, setHargaProduk] = useState('');
    const [namaToko, setNamaToko] = useState('');
    const [kondisi, setKondisi] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [gambarProduk, setGambarProduk] = useState(null); // Update to file input
    const [stockProduk, setStockProduk] = useState('');
    const [variants, setVariants] = useState([]);

    const { products } = useContext(ProductContext);

    const handleAddVariant = () => {
        setVariants([...variants, { namaVarian: '', ukuran: '', warna: '', harga: 0, stock: 0 }]);
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const handleRemoveVariant = (index) => {
        const newVariants = variants.filter((_, i) => i !== index);
        setVariants(newVariants);
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
    
        try {
          const response = await axios.post('http://localhost:5000/upload-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data.imageUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      };

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setGambarProduk(e.target.files[0]);
    };

     // Fungsi untuk mengirim data produk ke server
     const createProduct = async (e) => {
        e.preventDefault();
    
        let imageUrl = '';
    
        if (gambarProduk) {
          try {
            imageUrl = await uploadImage(gambarProduk);
            console.log(imageUrl)
          } catch (error) {
            alert('Gagal meng-upload gambar. Silakan coba lagi.');
            return;
          }
        }
    
        const formData = {
          namaProduk,
          hargaProduk,
          namaToko,
          kondisi,
          deskripsi,
          stockProduk,
          gambarProduk: imageUrl,
          variants
        };
    
        try {
          await axios.post('http://localhost:5000/products', formData);
          alert('Produk berhasil ditambahkan!');
        } catch (error) {
          alert('Gagal menambahkan produk. Silakan coba lagi.');
          console.error('Error creating product:', error);
        }
      };


    return (
        <div>
                <p className="text-4xl font-sans font-bold mb-10">Tambah Produk</p>


                <form className="flex flex-col" onSubmit={createProduct}>

                    <div className="flex items-start">
                        <p className="w-full max-w-[150px] font-semibold font-sans">Gambar Produk: </p>
                        <label className="flex flex-col items-center px-4 py-6 border-[1px] border-slate-500 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-blue-400 hover:text-white">
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 5.15a1 1 0 00-.76-.35h-3a.5.5 0 01-.35-.15l-2.54-2.53A1.5 1.5 0 009 2H5.5a.5.5 0 00-.5.5v4.86a.5.5 0 001 0V4h3a.5.5 0 00.35-.15L12.5 6H13v8a.5.5 0 001 0V6.5a.5.5 0 01.5-.5h2.38a.5.5 0 00.36-.15.5.5 0 00.15-.35V6.5a1 1 0 00-.5-.85zM10 11h-.5v1H9v1h.5v1h1v-1H11v-1h-.5v-1h-1zm0 5h-2v1H7v1h1v1h2v-1h1v-1h-1v-1zM10.5 1a.5.5 0 010 1H10V1h.5zm0 1h1V1h-1v1z" />
                            </svg>
                            <span className="mt-2 text-base leading-normal">Select a file</span>
                            <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>

                    <div className="flex items-center mt-3">
                        <p className="w-full max-w-[150px] font-semibold font-sans">Nama Produk: </p>
                        <input 
                            className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                            type="text" placeholder="Nama Produk"
                            value={namaProduk}
                            onChange={e => setNamaProduk(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mt-3">
                        <p className="w-full max-w-[150px] font-semibold font-sans">Harga Produk: </p>
                        <input 
                            className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                            type="text" placeholder="Harga Produk" 
                            value={hargaProduk}
                            onChange={e => setHargaProduk(e.target.value)}    
                        />
                    </div>

                    <div className="flex items-center mt-3">
                        <p className="w-full max-w-[150px] font-semibold font-sans">Nama Toko: </p>
                        <input 
                            className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                            type="text" placeholder="Nama Toko"
                            value={namaToko}
                            onChange={e => setNamaToko(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center mt-3">
                        <p className="w-full max-w-[150px] font-semibold font-sans">Kondisi Barang: </p>
                        <input 
                            className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                            type="text" placeholder="Kondisi Barang"
                            value={kondisi}
                            onChange={e => setKondisi(e.target.value)} 
                        />
                    </div>

                <div className="flex items-start mt-3">
                        <p className="w-full max-w-[150px] font-semibold font-sans">Deskripsi Barang: </p>
                        <textarea 
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            placeholder="Masukan deskripsi produk..."
                            rows="10"
                            className="mt-1 block w-full p-2  border-slate-500 outline-none rounded-md shadow-sm border-[1px] sm:text-sm"
                        />
                    </div>

                    <div className="flex items-center mt-3 mb-5">
                        <p className="w-full max-w-[150px] font-semibold font-sans">Stock Unit: </p>
                        <input 
                            className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                            type="number" placeholder="Stock Barang"
                            value={stockProduk}
                            onChange={e => setStockProduk(e.target.value)}
                        />
                    </div>


                    <button type="button" onClick={handleAddVariant} className="bg-blue-500 text-white rounded-md p-2 mb-2">
                    Tambah Varian
                </button>

                {variants.map((variant, index) => (
                    <div key={index} className="flex flex-col mb-2 p-[20px] border-[1px] border-slate-500 rounded-md mt-5">
                        
                        <div className="flex items-center px-2 gap-2"> 
                            <p className="w-full max-w-[80px] font-semibold font-sans">Varian: </p>
                            <input
                                className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none mt-3"
                                type="text"
                                placeholder="Nama Varian"
                                value={variant.namaVarian}
                                onChange={e => handleVariantChange(index, 'namaVarian', e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-center px-2 gap-2">
                            <p className="w-full max-w-[80px] font-semibold font-sans">Ukuran: </p>
                            <input
                                className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none mt-3"
                                type="text"
                                placeholder="Ukuran"
                                value={variant.ukuran}
                                onChange={e => handleVariantChange(index, 'ukuran', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center px-2 gap-2">
                            <p className="w-full max-w-[80px] font-semibold font-sans">Warna: </p>
                            <input
                                className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none mt-3"
                                type="text"
                                placeholder="*Kosongkan jika tidak ada"
                                value={variant.warna}
                                onChange={e => handleVariantChange(index, 'warna', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center px-2 gap-2">
                            <p className="w-full max-w-[80px] font-semibold font-sans">Harga: </p>
                            <input
                                className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none mt-3"
                                type="number"
                                placeholder="Harga"
                                value={variant.harga}
                                onChange={e => handleVariantChange(index, 'harga', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center px-2 gap-2">
                            <p className="w-full max-w-[80px] font-semibold font-sans">Stock: </p>
                            <input
                                className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none mt-3"
                                type="number"
                                placeholder="Stock"
                                value={variant.stock}
                                onChange={e => handleVariantChange(index, 'stock', e.target.value)}
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveVariant(index)} className="bg-red-500 text-white rounded-md p-2 mt-2">
                            Hapus Varian
                        </button>
                    </div>
                ))}

                    <button className='w-full bg-[#03AC0E] rounded-xl py-3 px-4 text-white font-bold text-[16px] hover:cursor-pointer'>Create Product</button>
                </form>
            </div>
    )
}