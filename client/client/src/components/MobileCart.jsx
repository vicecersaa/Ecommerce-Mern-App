import { useEffect, useState,useContext } from "react";
import KeranjangCard from "./KeranjangCard";
import { Link } from "react-router-dom";
import LOGO from '../assets/img/LOGO1.jpg'
import axios from "axios";
import { UserContext } from "../UserContext";
import { API_URL } from "../config";



export default function MobileCart() {

    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const {user, setUser} = useContext(UserContext);


    useEffect(() => {
        const fetchCart = async () => {
          
          if (!user || !user._id) {
            console.error('User ID is not available');
            return;
          }
      
          try {
            const response = await axios.get(`${API_URL}/get-cart`, {
              params: { userId: user._id }
            });
      
            if (response.status === 200) {
              setCart(response.data.cart || []);
            } else {
              console.error('Failed to fetch cart:', response.status);
            }
          } catch (error) {
            console.error('Failed to fetch cart:', error);
            setError(error);
          } finally {
            setLoading(false);
          }
        };
      
        
        if (user && user._id) {
          fetchCart();
        }
      }, [user]); 


if (!user) {
    return <div>Loading...</div>;
}

    return (
        <div className="flex pt-[80px]">
            <div className="w-full flex flex-col">
                {cart.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-screen max-h-[500px]">
                        <img loading="lazy" className="w-full max-w-[150px]" src={LOGO} alt="Forland Living Logo" />
                        <h2 className="font-medium font-sans text-2xl">Keranjang Anda Kosong</h2>
                        <p className="font-sans">Silahkan Isi Keranjang Anda.</p>
                        <Link to={'/'}>
                            <button className="bg-[#194719] text-white font-sans  rounded-full px-3 py-2 mt-1">
                                Belanja Sekarang!
                            </button>
                        </Link>
                    </div>
                ) : (
                    <KeranjangCard />
                )}
            </div>
        </div>
    )
}