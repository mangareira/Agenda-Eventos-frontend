import { useTableTrans } from "@/app/utils/hooks/useTableTrans"
import { TableTrans } from "../../TableTrans"

export const Transactions = () => {
    const {payments} = useTableTrans()

    return (
        <div className="bg-green_admin p-5 rounded-[10px]">
            <h2 className="mb-5 text-xl  font-extralight text-gray-300" >Lastest Transactions</h2>
            <table className="w-full text-white">
                <thead>
                    <tr>
                        <td className="p-[10px]" >Name</td>
                        <td className="p-[10px]">Status</td>
                        <td className="p-[10px]">Date</td>
                        <td className="p-[10px]">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((trans, index) => (
                        <TableTrans payments={trans} key={index}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}