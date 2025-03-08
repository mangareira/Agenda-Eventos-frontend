'use client'
import { useMobile } from "@/app/utils/context"
import { useEvents } from "@/app/utils/hooks/useEvents"
import { useRole } from "@/app/utils/hooks/useRole"
import Link from "next/link"
import { AiOutlineHome } from "react-icons/ai"
import { BsPersonAdd, BsQuestionCircle, BsSignIntersection } from "react-icons/bs"
import { FiFilter, FiLogIn } from "react-icons/fi"
import { LiaMapMarkedSolid } from "react-icons/lia"
import { MdDomainVerification, MdOutlineAddBox, MdOutlinePrivacyTip } from "react-icons/md"

export const SideBar = () => {
    const {role} = useRole()
    const {mobile, setMobile} = useMobile()
    const {isLoggedIn} = useEvents()
    const adminAccess = () => {
        if(role === 'admin') return (
            <Link href={'/create-event'}>
                <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                    <MdOutlineAddBox size={30}/>
                    <span>Adicionar Eventos</span>
                </div>
            </Link>
        )
    }
    
    return (
        <>
            <div className={`sidebar fixed z-10 top-16 bottom-0 text-xs text-blue h-screen right-0 p-2 w-[90px] overflow-auto text-center bg-gray-200 shadow transition-transform duration-300 ${mobile ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-ful px-3 py-4 overflow-y-auto">
                    <Link href={'/'}>
                        <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                            <AiOutlineHome size={30}/>
                            <span>Home</span>
                        </div>
                    </Link>
                    {adminAccess()}
                    <Link href={'/filter-events'}>
                        <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                            <FiFilter size={30}/>
                            <span>Filtrar</span>
                        </div>
                    </Link>
                    {
                        isLoggedIn ? (
                           null
                        ) : (
                            <>
                                <Link href={'/login'} className="sm:hidden">
                                    <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                                        <FiLogIn size={30}/>
                                        <span>login</span>
                                    </div>
                                </Link>
                                <Link href={'/create-account'} className="sm:hidden">
                                    <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                                        <BsPersonAdd size={30}/>
                                        <span>Cadastra-se</span>
                                    </div>
                                </Link>
                            </>
                        )
                    }
                    <Link href={'/verification'}>
                        <div className="flex flex-col cursor-pointer justify-center items-center mb-9">
                            <MdDomainVerification size={30}/>
                            <span>Verificação de certificado</span>
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