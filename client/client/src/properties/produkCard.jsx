import { useContext } from "react"
import { ProductContext, ProductContextProvider } from "../ProductContext"
import { Link } from "react-router-dom"
import '../index.css'


export default function ProdukCard(props) {

    // fungsi untuk membatasi teks
    const truncateText = (text, length) => {
        if (text.length > length) {
          return text.slice(0, length) + '...';
        }
        return text;
      };

    return (
        <Link to={`/products/${props.id}`}>
            <div className="flex flex-row w-full max-w-[200px] border-[1px] border-slate-100 shadow-md rounded-xl flex-wrap cursor-pointer">
                <img className="rounded-t-xl" src={props.img} alt="" />
                <div className="flex flex-col items-start justify-center p-[10px]">
                    <p className="w-full text-sm mb-1 text-clamp-2 max-w-[180px]">{props.namaProduk}</p>
                    <span className="font-bold mb-1">{props.hargaProduk}</span>
                    <span className="text-xs">{props.deskripsiProduk}</span>
                    <span className="text-xs text-[#03AC0E] font-semibold">{props.kondisiProduk}</span>
                    <span className="font-semibold text-sm">{props.namaToko} -</span>
                </div>
            </div>
        </Link>
    )
}