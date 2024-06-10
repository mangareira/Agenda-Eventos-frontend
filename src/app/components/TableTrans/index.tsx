import { IPay } from "@/app/utils/interface"
import Image from "next/image"

export const TableTrans = ({payments, deletePaymentFromState}: IPay) => {
    const data: {[key: string]: string} = {
        pendente: "bg-[#f7cb7375]",
        cancelled: "bg-[#f7747475]",
        pago: "bg-[#afd6ee75]"
    }
    const date = new Date(payments.createdAt)
    let name
    if(payments.name) name = payments.name.slice(0,20) + '...'
    const price = () => {
        if(payments.status == 'gratis') return 'gratis'
        return 'R$'+payments.value
    }
    return (
        <tr>
            <td className="p-2.5">
                <div className="flex gap-2.5 items-center">
                    <Image src="/noavatar.png" alt="" width={40} height={40} className="object-cover rounded-3xl" />
                    {name}
                </div>
            </td>
            <td className="p-2.5">
                <span className={`rounded-md p-[5px] text-sm ${data[payments.status.toLowerCase()]}`}>{payments.status}</span>
            </td>
            <td className="p-2.5">{date.toString().slice(4,16)}</td>
            <td className="p-2.5">{price()}</td>
        </tr>
    )
}