import Link from "next/link"
import { AiOutlineHome } from "react-icons/ai"
import { BsQuestionCircle } from "react-icons/bs"
import { FiFilter } from "react-icons/fi"
import { LiaMapMarkedSolid } from "react-icons/lia"
import { MdOutlineAddBox, MdOutlinePrivacyTip } from "react-icons/md"

export const SideBar = () => {
    return (
        <>
            <div className="sidebar fixed z-10 top-16 bottom-0 text-xs text-blue h-screen right-0 p-2 w-[90px] overflow-auto text-center bg-gray-200 shadow">
                <div className="h-ful px-3 py-4 overflow-y-auto">
                    <Link href={'/'}>
                        <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                            <AiOutlineHome size={30}/>
                            <span>Home</span>
                        </div>
                    </Link>
                    <Link href={'/maps'}>
                        <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                            <LiaMapMarkedSolid size={30}/>
                            <span>Mapa</span>
                        </div>
                    </Link>
                    <Link href={'/create-event'}>
                        <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                            <MdOutlineAddBox size={30}/>
                            <span>Adicionar Eventos</span>
                        </div>
                    </Link>
                    <Link href={'/filter-events'}>
                        <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                            <FiFilter size={30}/>
                            <span>Filtrar</span>
                        </div>
                    </Link>
                    <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                        <BsQuestionCircle size={30}/>
                        <span>SAC</span>
                    </div>
                    <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                        <MdOutlinePrivacyTip size={30}/>
                        <span>Privacidade</span>
                    </div>
                </div>
            </div>
        </>
    )
}