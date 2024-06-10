import { IQuery } from "@/app/utils/interface"
import Pagination from "../../DashBoard/pagination"                                                                                                        
import { useTableTrans } from "@/app/utils/hooks/useTableTrans"
import { TableTrans } from "../../TableTrans"

export const TableTransPage = ({q, page}:IQuery) => {
    const {count,deletePaymentFromState,payments} = useTableTrans(q,page)
    return (
        <div>
            <table className="w-full" > 
                <thead>
                    <tr>
                        <td className="p-2.5" >Name</td>
                        <td className="p-2.5">Status</td>
                        <td className="p-2.5">Date</td>
                        <td className="p-2.5">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((trans, index) => (
                        <TableTrans payments={trans} key={index} deletePaymentFromState={deletePaymentFromState}/>
                    ))}
                </tbody>
            </table>
            <Pagination count={count}/>
        </div>
    )
}