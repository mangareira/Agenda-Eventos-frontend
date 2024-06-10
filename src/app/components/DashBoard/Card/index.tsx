import { MdSupervisedUserCircle } from "react-icons/md"

export const Card = () => {
    return (
        <div className="bg-green_admin p-5 rounded-[10px] flex gap-5 cursor-pointer text-white w-full hover:bg-hover_admin">
            <MdSupervisedUserCircle size={24} />
            <div className="flex flex-col gap-5">
                <span className="" >Total Users</span>
                <span className="text-[24px] font-medium " >10.273</span>
                <span className="text-sm font-light" >
                    <span className="text-lime-500" >12% </span>
                    more than previous week
                </span>
            </div>
        </div>
    )
}