'use client'

import { useForm } from "react-hook-form"
import { Button } from "../Button"
import { Input } from "../Input"
import { PriceWrapper } from "../PriceWrapper"
import { IParticipants } from "@/app/utils/interface"
import { onSubmitParticipants } from "@/app/utils/onSubmit"

export const FormWrapper = ({price, eventId}: any) => {
    const {register, handleSubmit, formState: {errors}} = useForm<IParticipants>()

    const onSubmit = (data: IParticipants) => {        
        onSubmitParticipants(data, eventId)
    }
    return (
        <div className=" bg-gray-50 shadow rounded-3xl ">
            <p className="bg-blue rounded-3xl rounded-b-none p-3 text-white text-center " >Ingressos</p>
            <div className="p-6">
               <PriceWrapper/>
                <div className="grid grid-cols-5 gap-3 mt-3 ">
                    <Input placeholder="Insira aqui um cupom de desconto" title="Cupom" type="text" className="col-span-3" /> 
                    <Input placeholder={price} title="Subtotal" type="text" className="col-span-2" /> 
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input title="Nome" placeholder="Insira seu nome" type="text" {...register('name')} />
                    {errors.name && (
                            <span className="text-red-500" >Campo obrigatorio</span>
                    )}
                    <Input title="Email" placeholder="Insira seu email" type="text"{...register('email')} />
                    {errors.email && (
                            <span className="text-red-500" >Campo obrigatorio</span>
                    )}
                    <Button title="Cadastrar" />
                </form>
            </div>
        </div>
    )
}