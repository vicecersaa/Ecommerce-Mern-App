import { useContext } from "react"
import { ProductContext, ProductContextProvider } from "../ProductContext"

export default function ProdukCard(props) {

   

    return (
        <div className="flex flex-row w-full max-w-[200px] border-[1px] border-green flex-wrap">
            <img src={props.Img} alt="" />
            <div className="flex flex-col items-start justify-center">
                <p>{props.namaProduk}</p>
                <span>{props.hargaProduk}</span>
                <span>{props.namaToko}</span>
                <span>{props.ratingProduk}</span>
            </div>
        </div>
    )
}