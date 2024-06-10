import Image from "next/image"

export const Transactions = () => {
    const data = {
        pending: "bg-[#f7cb7375]",
        cancelled: "bg-[#f7747475]",
        done: "bg-[#afd6ee75]"
    }
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
                    <tr>
                        <td className="p-[10px]">
                            <div className="flex gap-[10px] items-center">
                                <Image src="/noavatar.png" alt="" width={40} height={40} className="object-cover rounded-3xl" />
                                jhon Doe
                            </div>
                        </td>
                        <td className="p-[10px]">
                            <span className={`${"rounded-md p-[5px] text-sm"} ${data.pending} `}>Pending</span>
                        </td>
                        <td className="p-[10px]">14.02.2024</td>
                        <td className="p-[10px]">$3.200</td>
                    </tr>
                    <tr>
                        <td className="p-[10px]">
                            <div className="flex gap-[10px] items-center">
                                <Image src="/noavatar.png" alt="" width={40} height={40} className="object-cover rounded-3xl" />
                                jhon Doe
                            </div>
                        </td>
                        <td className="p-[10px]">
                            <span className={`${"rounded-md p-[5px] text-sm"} ${data.done} `}>Done</span>
                        </td>
                        <td className="p-[10px]">14.02.2024</td>
                        <td className="p-[10px]">$3.200</td>
                    </tr>
                    <tr>
                        <td className="p-[10px]">
                            <div className="flex gap-[10px] items-center">
                                <Image src="/noavatar.png" alt="" width={40} height={40} className="object-cover rounded-3xl" />
                                jhon Doe
                            </div>
                        </td>
                        <td className="p-[10px]">
                            <span className={`${"rounded-md p-[5px] text-sm"} ${data.pending} `}>Pending</span>
                        </td>
                        <td className="p-[10px]">14.02.2024</td>
                        <td className="p-[10px]">$3.200</td>
                    </tr>
                    <tr>
                        <td className="p-[10px]">
                            <div className="flex gap-[10px] items-center">
                                <Image src="/noavatar.png" alt="" width={40} height={40} className="object-cover rounded-3xl" />
                                jhon Doe
                            </div>
                        </td>
                        <td className="p-[10px]">
                            <span className={`${"rounded-md p-[5px] text-sm"} ${data.cancelled} `}>Cancelled</span>
                        </td>
                        <td className="p-[10px]">14.02.2024</td>
                        <td className="p-[10px]">$3.200</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}