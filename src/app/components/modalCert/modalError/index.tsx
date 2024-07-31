import { ModalCert } from "@/app/utils/interface"
import Link from "next/link"
import { IoClose } from "react-icons/io5"

export const ModalError = ({ isOpen, onRefresh }: ModalCert) => {
    return( 
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-md shadow-lg z-10">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-xl font-semibold mb-4">Certificado não emitido</h2>
                    <Link href={"?modal=false"}>
                        <IoClose size={20}/>
                    </Link>
                </div>
                <p className="mb-4">O seu certificado ainda não foi emitido. Por favor, tente novamente mais tarde.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={onRefresh}
                    >
                        Atualizar
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Contatar SAC
                    </button>
                </div>
            </div>
        </div>
    )
}