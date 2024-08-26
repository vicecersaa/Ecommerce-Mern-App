import { useContext } from "react"
import { ProductContext, ProductContextProvider } from "../ProductContext"
import { Link } from "react-router-dom"
import '../index.css'


export default function ProdukCard(props) {


    return (
        <Link to={`/products/${props.id}`}>
            <div className="hidden flex-row w-full max-w-[228px] h-[300px] border-[1px] border-gray-300 shadow-lg rounded-xl flex-wrap cursor-pointer mb-4 md:flex">
                <img className="rounded-t-xl w-full max-w-[150px] m-auto" src={props.img} alt="" loading="lazy"/>
                <div className="flex flex-col items-start justify-center p-[10px]">
                    <p className="w-full text-sm mb-1 text-clamp-2 max-w-[180px]">{props.namaProduk}</p>
                    <span className="font-bold mb-1">{props.hargaProduk}</span>
                    <span className="text-xs">{props.deskripsiProduk}</span>
                    <span className="text-xs text-[#194719] font-semibold">{props.kondisiProduk}</span>
                    <span className="font-semibold text-sm">{props.namaToko} -</span>
                </div>
            </div>

            <div className="flex flex-row w-full max-w-[185px] max-h-[297px] border-[1px] shadow-mdrounded-xl flex-wrap cursor-pointer mb-1 md:hidden">
                <img className="rounded-t-xl w-full max-w-[150px] m-auto" src={props.img} alt="" loading="lazy"/>
                <div className="flex flex-col items-start justify-center p-[10px]">
                    <p className="w-full text-sm mb-1 text-clamp-2 max-w-[180px]">{props.namaProduk}</p>
                    <span className="font-bold mb-1">{props.hargaProduk}</span>
                    <span className="text-xs">{props.deskripsiProduk}</span>
                    <span className="text-xs text-[#194719] font-semibold">{props.kondisiProduk}</span>

                </div>
            </div>
        </Link>
    )
}