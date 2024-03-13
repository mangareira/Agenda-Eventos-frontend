'use client'

import { useForm } from "react-hook-form"
import { Button } from "../Button"
import { Input } from "../Input"
import { PriceWrapper } from "../PriceWrapper"
import { IParticipants } from "@/app/utils/interface"
import { onSubmitParticipants } from "@/app/utils/onSubmit"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const FormWrapper = ({price, eventId, cupom}: any) => {
    
    const {register, handleSubmit, formState: {errors}} = useForm<IParticipants>()
    const [value, setValue] = useState(0)
    const [input, setInput] = useState('')
    const [priceValue, setPriceValue] = useState<string>(price)
    

    useEffect(() => {
        const priceNumber = Number(price.split(',')[0] + '.' + price.split(',')[1])
        const priceInt = value * priceNumber
        setPriceValue(priceInt.toFixed(2).toString())
    }, [value, price])
    const onSubmit = (data: IParticipants) => {        
        onSubmitParticipants(data, eventId)
    }
    const applyCupom = () => {
        const priceNumber = Number(price.split(',')[0] + '.' + price.split(',')[1])
        const priceInt = String(value * priceNumber)
        
        if(input === cupom) {
            const discount =  85/100 * Number(priceInt) 
            setPriceValue(String(discount))
            toast.success('Cupom aplicado')
        } else {
            setPriceValue(String(priceInt))
            toast.error('Cupom não existe')
        }
    }
    
    return (
        <div className=" bg-gray-50 shadow rounded-3xl  ">
            <p className="bg-blue rounded-3xl rounded-b-none p-3 text-white text-center " >Ingressos</p>
            <div className="p-6">
               <PriceWrapper value={value} setValue={setValue} />
                <div className="grid grid-cols-5 gap-3 mt-3 ">
                    <Input 
                        placeholder="Insira aqui um cupom de desconto" 
                        title="Cupom" type="text" 
                        className="col-span-3" 
                        onChange={(e: any) =>setInput(e.target.value)}
                    /> 
                    <Input placeholder={priceValue}  title="Subtotal" type="text" className="col-span-2" /> 
                    
                </div>
                <Button title="Aplicar Cupom" onClick={applyCupom}/>
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