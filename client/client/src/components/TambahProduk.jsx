import { useContext, useState } from "react";
import axios from "axios";


export default function TambahProduk() {

     // State untuk data produk
    const [namaProduk, setNamaProduk] = useState('');
    const [hargaProduk, setHargaProduk] = useState('');
    const [namaToko, setNamaToko] = useState('');
    const [kondisi, setKondisi] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [gambarProduk, setGambarProduk] = useState(null); // Update to file input
    const [stockProduk, setStockProduk] = useState('');
    const [beratProduk, setBeratProduk] = useState('');
    const [variants, setVariants] = useState([]);
    const [ratings, setRatings] = useState('')
    const [reviews, setReviews] = useState([]);
    
    
    const uploadImage = async (files) => {
        if (!files || files.length === 0) {
            throw new Error('No files provided');
        }
    
        const formData = new FormData();
        for (const file of files) {
            formData.append('image', file); // Ensure 'image' matches the server-side field name
        }
    
        try {
            const response = await axios.post('http://localhost:5000/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageUrls; 
        } catch (error) {
            console.error('Error uploading images:', error);
            throw error;
        }
    };

    // pengaturan perubahan harga

    const formatNumber = (num) => {
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleFormattedChange = (e, variantIndex, ukuranIndex, field) => {
        const rawValue = e.target.value.replace(/\./g, '');
        if (!isNaN(rawValue)) {
            const formattedValue = formatNumber(rawValue);
            handleUkuranVarianChange(variantIndex, ukuranIndex, field, rawValue);
            e.target.value = formattedValue; 
        }
    };

    const handleHargaProdukChange = (e) => {
        const rawValue = e.target.value.replace(/\./g, '');
        if (!isNaN(rawValue)) {
            const formattedValue = formatNumber(rawValue);
            setHargaProduk(rawValue);
            e.target.value = formattedValue; // Update the input field with the formatted value
        }
    };
    
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array
        console.log(files); // Logs the array of files
        setGambarProduk(files); // Sets the array of files to state
    };


      // Handle variant changes
        const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };

    // Handle ukuranVarian changes

    const handleUkuranVarianChange = (variantIndex, ukuranIndex, field, value) => {
        const newVariants = [...variants];
        const newUkuranVarian = [...newVariants[variantIndex].ukuranVarian];
        newUkuranVarian[ukuranIndex] = { ...newUkuranVarian[ukuranIndex], [field]: value };
        newVariants[variantIndex] = { ...newVariants[variantIndex], ukuranVarian: newUkuranVarian };
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { namaVarian: '', ukuranVarian: [] }]);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    // sizes setting

    const addUkuranVarian = (variantIndex) => {
        const newVariants = [...variants];
        newVariants[variantIndex].ukuranVarian.push({ ukuran: '', harga: '' });
        setVariants(newVariants);
    };

    const removeUkuranVarian = (variantIndex, ukuranIndex) => {
        const newVariants = [...variants];
        newVariants[variantIndex].ukuranVarian = newVariants[variantIndex].ukuranVarian.filter((_, i) => i !== ukuranIndex);
        setVariants(newVariants);
    };

    

     // Fungsi untuk mengirim data produk ke server
     const createProduct = async (e) => {
        e.preventDefault();
    
        let imageUrls = [];
    
        if (gambarProduk && gambarProduk.length > 0) {
            try {
                imageUrls = await uploadImage(gambarProduk);
                console.log(imageUrls); // Verifikasi URL gambar yang diterima
            } catch (error) {
                alert('Gagal meng-upload gambar. Silakan coba lagi.');
                return;
            }
        }
    
        // Membuat objek data produk
        const productData = {
            namaProduk,
            hargaProduk,
            namaToko,
            kondisi,
            deskripsi,
            stockProduk,
            gambarProduk: imageUrls, // Array URL gambar
            variants,
            reviews,
            ratings,
            beratProduk,
        };
    
        // Mengirim data produk ke server
        try {
            const response = await axios.post('http://localhost:5000/products', productData,);
            alert('Produk berhasil ditambahkan!');
            console.log(response.data); // Verifikasi respons dari server
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
                        <input type="file" name="image" className="hidden" onChange={handleFileChange} multiple />
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
                        type="text"
                        placeholder="Harga Produk"
                        value={formatNumber(hargaProduk)}
                        onChange={handleHargaProdukChange}
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
                        className="mt-1 block w-full p-2 border-slate-500 outline-none rounded-md shadow-sm border-[1px] sm:text-sm"
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

                {/* Variants */}
                <div className="mt-5">
                    <p className="text-lg font-semibold">Varian Produk</p>
                    {variants.map((variant, variantIndex) => (
                        <div key={variantIndex} className="flex flex-col mt-3">
                            <div className="flex align-center ">
                                <input
                                    className="border-[1px] border-slate-500 py-2 px-2 rounded-md mb-2 w-full mr-2"
                                    type="text" placeholder="Nama Varian"
                                    value={variant.namaVarian}
                                    onChange={(e) => handleVariantChange(variantIndex, 'namaVarian', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="p-1 pb-2"
                                    onClick={() => removeVariant(variantIndex)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>
                            </div>
                            {variant.ukuranVarian.map((ukuran, ukuranIndex) => (
                                <div key={ukuranIndex} className="flex flex-col mt-2">
                                    <input
                                        className="border-[1px] border-slate-500 py-2 px-2 rounded-md mb-2"
                                        type="text" placeholder="Ukuran"
                                        value={ukuran.ukuran}
                                        onChange={(e) => handleUkuranVarianChange(variantIndex, ukuranIndex, 'ukuran', e.target.value)}
                                    />
                                    <input
                                        className="border-[1px] border-slate-500 py-2 px-2 rounded-md mb-2"
                                        type="text"
                                        placeholder="Harga"
                                        value={formatNumber(ukuran.harga)}
                                        onChange={(e) => handleFormattedChange(e, variantIndex, ukuranIndex, 'harga')}
                                    />
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white py-1 px-2 rounded mt-2"
                                        onClick={() => removeUkuranVarian(variantIndex, ukuranIndex)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="bg-green-500 text-white py-2 px-4 rounded mt-3 mb-3 font-semibold"
                                onClick={() => addUkuranVarian(variantIndex)}
                            >
                                Add Size
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-green-500 text-white py-2 px-4 rounded mt-3 mb-3 font-semibold"
                        onClick={addVariant}
                    >
                        Add Variant
                    </button>
                </div>

                <button className='w-full bg-[#03AC0E] rounded-xl py-3 px-4 text-white font-bold text-[16px] hover:cursor-pointer'>Create Product</button>
            </form>
        </div>
    )
}