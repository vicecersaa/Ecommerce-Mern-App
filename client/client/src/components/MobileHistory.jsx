import OrderHistory from "./OrderHistory"

export default function MobileHistory() {
    return (
        <div className="flex border-b-2 pt-[65px]">
            <div className="w-full flex flex-col h-full min-h-[340px]">
                <OrderHistory />
            </div>
        </div>
    )
}