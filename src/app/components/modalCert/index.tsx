import { ModalCert } from "@/app/utils/interface";
import { ModalError } from "./modalError";
import { ModalConfirmCert } from "./modalConfirmCert";
import dayjs from "dayjs"

    export const Modal = ({ isOpen, onRefresh, events }: ModalCert) => {
        if(!isOpen) return null 
        return (
            <div className="">
                {dayjs(events?.date).isBefore(new Date()) ?  <ModalConfirmCert isOpen={isOpen} onRefresh={onRefresh} events={events}/>: <ModalError isOpen={isOpen} onRefresh={onRefresh}/>}
            </div>
        )
    }