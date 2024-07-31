import { ModalCert } from "@/app/utils/interface";
import { ModalError } from "./modalError";
import { ModalConfirmCert } from "./modalConfirmCert";
import dayjs from "dayjs"

    export const Modal = ({ isOpen, onRefresh, id, eventDate }: ModalCert) => {
        if(!isOpen) return null 
        return (
            <div className="">
                {dayjs(eventDate).isBefore(new Date()) ?  <ModalConfirmCert isOpen={isOpen} onRefresh={onRefresh} id={id}/>: <ModalError isOpen={isOpen} onRefresh={onRefresh}/>}
            </div>
        )
    }