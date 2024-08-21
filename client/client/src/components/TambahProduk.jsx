import { useContext, useState, useEffect } from "react";
import axios from "axios";


export default function TambahProduk() {

     // State untuk data produk
    const [namaProduk, setNamaProduk] = useState('');
    const [categoryProduk, setCategoryProduk] = useState([]);
    const [hargaProduk, setHargaProduk] = useState('');
    const [namaToko, setNamaToko] = useState('');
    const [kondisi, setKondisi] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [gambarProduk, setGambarProduk] = useState(null); 
    const [stockProduk, setStockProduk] = useState('');
    const [beratProduk, setBeratProduk] = useState('');
    const [variants, setVariants] = useState([]);
    const [ratings, setRatings] = useState('')
    const [reviews, setReviews] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        // Fetch categories from the server
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                setAvailableCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
   
    
    const uploadImage = async (files) => {
        if (!files || files.length === 0) {
            throw new Error('No files provided');
        }
    
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('image', file); // Nama field harus sesuai dengan yang diharapkan oleh server
        });
    
        try {
            const response = await axios.post('http://localhost:5000/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageUrls; // Pastikan ini sesuai dengan respons server
        } catch (error) {
            console.error('Error uploading images:', error.message);
            if (error.response) {
                console.error('Server Response:', error.response.data);
            }
            throw error;
        }
    };

  

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
        const files = Array.from(e.target.files); 
        console.log('Files Selected:', files);
        const filePreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
    
        console.log('File Previews:', filePreviews); // Pastikan ini menampilkan file dan pratinjau dengan benar
    
        setGambarProduk(filePreviews.map(({ file }) => file)); // Simpan hanya file dalam state
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

    const handleCategoryChange = (e) => {
        const input = e.target.value;
        if (input === '') {
            // Kosongkan filteredCategories jika input kosong
            setFilteredCategories([]);
        } else {
            const filtered = availableCategories.filter(category => 
                category.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
        setCategoryProduk(input.split(',').map(category => category.trim()).filter(category => category !== ''));
    };
      
      const selectCategory = (category) => {
        setCategoryProduk([category]);
        setFilteredCategories([]);
    };


     // Fungsi untuk mengirim data produk ke server
     const createProduct = async (e) => {
        e.preventDefault();
    
        let imageUrls = [];
    
        if (gambarProduk && gambarProduk.length > 0) {
            try {
                imageUrls = await uploadImage(gambarProduk);
                console.log(`image url: ${imageUrls}`); 
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
            categoryProduk,
            kondisi,
            deskripsi,
            stockProduk,
            gambarProduk: imageUrls, 
            variants,
            reviews,
            ratings,
            beratProduk,
        };
    
        // Mengirim data produk ke server
        try {
            const response = await axios.post('http://localhost:5000/products', productData);
            alert('Produk berhasil ditambahkan!');
            console.log(response.data); 
        } catch (error) {
            alert('Gagal menambahkan produk. Silakan coba lagi.');
            console.error('Error creating product:', error);
        }
    };


    return (
        <div>
            <div className="flex items-center gap-2 mb-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
                <h2 className="text-xl font-sans font-medium">Tambah Produk</h2>
            </div>

            <form className="flex flex-col" onSubmit={createProduct}>
                <div className="flex w-full gap-5">
                    <div className="flex items-start w-full max-w-[350px]">
                        <p className="w-full max-w-[150px] font-sans">Gambar Produk: </p>
                        <label className="flex flex-col items-center px-4 py-6 border-[1px] border-slate-500 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-[#194719] hover:text-white">
                            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 5.15a1 1 0 00-.76-.35h-3a.5.5 0 01-.35-.15l-2.54-2.53A1.5 1.5 0 009 2H5.5a.5.5 0 00-.5.5v4.86a.5.5 0 001 0V4h3a.5.5 0 00.35-.15L12.5 6H13v8a.5.5 0 001 0V6.5a.5.5 0 01.5-.5h2.38a.5.5 0 00.36-.15.5.5 0 00.15-.35V6.5a1 1 0 00-.5-.85zM10 11h-.5v1H9v1h.5v1h1v-1H11v-1h-.5v-1h-1zm0 5h-2v1H7v1h1v1h2v-1h1v-1h-1v-1zM10.5 1a.5.5 0 010 1H10V1h.5zm0 1h1V1h-1v1z" />
                            </svg>
                            <span className="mt-2 text-base font-sans leading-normal">Pilih Gambar</span>
                            <input type="file" name="image" className="hidden" onChange={handleFileChange} multiple />
                        </label>
                    </div>

                    <div className="flex gap-5 justify-center items-center">
                        {gambarProduk && gambarProduk.length > 0 ? (
                            gambarProduk.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.preview}
                                    alt={`Preview ${index}`}
                                    className="w-24 h-24 object-cover"
                                />
                            ))
                        ) : (
                            <p></p> 
                        )}
                    </div>
                </div>

                <div className="flex items-center mt-3">
                    <p className="w-full max-w-[150px] font-sans">Nama Produk: </p>
                    <input
                        className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                        type="text" placeholder="Nama Produk"
                        value={namaProduk}
                        onChange={e => setNamaProduk(e.target.value)}
                    />
                </div>

                <div className="flex flex-col items-center mt-3 relative">
                    <div className="flex items-center w-full ">
                        <p className="w-full max-w-[150px]  font-sans">Kategori Produk: </p>
                        <input
                            className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                            type="text"
                            placeholder="Kategori Produk"
                            value={categoryProduk.join(', ')}  
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className="w-full absolute top-10">
                     {filteredCategories.length > 0 && (
                        <div className="bg-white border border-gray-300 mt-1 shadow-lg max-h-40 overflow-y-auto ml-[150px]">
                            {filteredCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => selectCategory(category)}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                </div>
                
                <div className="flex items-center mt-3">
                    <p className="w-full max-w-[150px] font-sans">Harga Produk: </p>
                    <input
                        className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                        type="text"
                        placeholder="Harga Produk"
                        value={formatNumber(hargaProduk)}
                        onChange={handleHargaProdukChange}
                    />
                </div>

                <div className="flex items-center mt-3">
                    <p className="w-full max-w-[150px] font-sans">Nama Toko: </p>
                    <input
                        className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                        type="text" placeholder="Nama Toko"
                        value={namaToko}
                        onChange={e => setNamaToko(e.target.value)}
                    />
                </div>
                <div className="flex items-center mt-3">
                    <p className="w-full max-w-[150px] font-sans">Kondisi Barang: </p>
                    <input
                        className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                        type="text" placeholder="Kondisi Barang"
                        value={kondisi}
                        onChange={e => setKondisi(e.target.value)}
                    />
                </div>

                <div className="flex items-start mt-3">
                    <p className="w-full max-w-[150px] font-sans">Deskripsi Barang: </p>
                    <textarea
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        placeholder="Masukan deskripsi produk..."
                        rows="10"
                        className="mt-1 block w-full p-2 border-slate-500 outline-none rounded-md shadow-sm border-[1px] sm:text-sm"
                    />
                </div>

                <div className="flex items-center mt-3 mb-5">
                    <p className="w-full max-w-[150px] font-sans">Stock Unit: </p>
                    <input
                        className="border-[1px] border-slate-500 w-full py-2 px-2 rounded-md outline-none"
                        type="number" placeholder="Stock Barang"
                        value={stockProduk}
                        onChange={e => setStockProduk(e.target.value)}
                    />
                </div>

                {/* Variants */}
                <div className="flex flex-col p-[20px] border-[1px] border-gray-300 mt-3 mb-3 rounded-lg shadow-xl gap-3 flex-wrap h-full">
                    <div className="w-full flex justify-between items-center mt-2 mb-5">
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                                <p className="font-sans font-semibold text-lg">Varian Produk</p>
                            </div>
                            <span className="font-sans text-gray-500 text-sm">Tambah varian agar pembeli dapat memilih produk yang sesuai</span>
                        </div>
                        <div className="flex h-full justify-center items-center mt-auto">
                            <button
                                type="button"
                                className="bg-[#194719] border-[1px] border-slate-500 text-white text-sm py-1.5 px-4 rounded-full font-sans w-full max-w-[200px]"
                                onClick={addVariant}
                            >
                                + Varian
                            </button>
                        </div>
                    </div>
                    <div className="grid gap-5 grid-cols-2">
                        {variants.map((variant, variantIndex) => (
                            <div className="flex w-full max-w-[500px] h-full border-[1px] border-gray-300 p-[20px] mb-3 rounded-lg shadow-sm">
                                <div key={variantIndex} className="w-full flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="font-sans font-semibold text-lg">Varian Produk</p>
                                        <div className="bg-gray-200 w-[35px] h-[35px] rounded-full flex justify-center hover:bg-red-500">
                                            <button
                                                type="button"
                                                className="text-black font-sans text-sm"
                                                onClick={() => removeVariant(variantIndex)}
                                            >
                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>

                                            </button>
                                        </div>
                                        </div>
                                    <div className="flex align-center">
                                        <input
                                            className="border-[1px] border-slate-500 py-2 px-2 rounded-md w-full outline-none"
                                            type="text" placeholder="Nama Varian"
                                            value={variant.namaVarian}
                                            onChange={(e) => handleVariantChange(variantIndex, 'namaVarian', e.target.value)}
                                        />
                                    </div>
                                    {variant.ukuranVarian.map((ukuran, ukuranIndex) => (
                                        <div key={ukuranIndex} className="w-full flex items-center gap-3 mt-3">
                                            <input
                                                className="border-[1px] border-slate-500 py-2 px-2 rounded-md  outline-none w-3/4"
                                                type="text" placeholder="Tipe/Ukuran"
                                                value={ukuran.ukuran}
                                                onChange={(e) => handleUkuranVarianChange(variantIndex, ukuranIndex, 'ukuran', e.target.value)}
                                            />
                                            <p>Rp.</p>
                                            <input
                                                className="border-[1px] border-slate-500 py-2 px-2 rounded-md  outline-none w-1/4"
                                                type="text"
                                                placeholder="0"
                                                value={formatNumber(ukuran.harga)}
                                                onChange={(e) => handleFormattedChange(e, variantIndex, ukuranIndex, 'harga')}
                                            />
                                            <button
                                                type="button"
                                                className="bg-white text-black border-[1px] border-black py-1 px-2 rounded"
                                                onClick={() => removeUkuranVarian(variantIndex, ukuranIndex)}
                                            >
                                                Hapus
                                            </button>
                                            
                                        </div>
                                    ))}
                                    <div className="flex w-full justify-between items-center mt-5">
                                        <button
                                            type="button"
                                            className="bg-[#194719] text-white py-2 px-4 rounded-full font-sans text-sm"
                                            onClick={() => addUkuranVarian(variantIndex)}
                                        >
                                            Tambah Tipe/Ukuran
                                        </button>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                   
                </div>
            
                <div className="flex justify-end w-full mt-4">
                    <button className='w-full max-w-[150px] bg-[#194719] rounded-md  py-2 px-3 text-white font-sans text-sm hover:cursor-pointer'>Tambah Produk</button>
                </div>
            </form>
        </div>
    )
}