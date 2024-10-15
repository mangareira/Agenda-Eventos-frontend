'use client'

import { Button } from "@/app/components/Form/Button";
import { Input } from "@/app/components/Form/Input";
import { AutoComplete } from "@/app/components/Form/InputAutoComplete";
import { InputFile } from "@/app/components/Form/InputFile";
import { LoginError } from "@/app/components/LoginError";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import { categories } from "@/app/utils/categories";
import { IFormProps } from "@/app/utils/interface";
import { onSubmitCreate } from "@/app/utils/onSubmit";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default  function CreateEvent() {
    const [flyers, setFlyers] = useState<File[]>([])
    const [state, setState] = useState('')
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<IFormProps>()
    const [role, setRole] = useState('')
    useEffect(() => {
        const role = async () => {
            const id = localStorage.getItem('user')
            const data = await FetchWrapper(`/events/get-participant-role/${id}`, 'GET')
            setRole(data.data)
        }
        role()
    }, [])
    const handleFileChange = (name: any, file: File) => {
        if(name === 'flyers') {
            setFlyers([...flyers, file])
        }else {
            setValue(name, file)
        }
    }
    const onSelect = (address: any) => {
        setValue('latitude', address.lat)
        setValue('longitude', address.lng)
    }
    const onSubmit = async (data: IFormProps) => {
        const create = await onSubmitCreate(data,flyers)
        if(create === 'use uma data valida') toast.error('use uma data valida')       
        setState(create)
    }
    const handleCloseError = () => {
        setState(""); 
    }
    if(role !== 'admin') return (
        <div className="">
            você não tem acesso
        </div>
    )
    return (
        <>
        <div className=""><LoginError state={state} onClose={handleCloseError}/></div>
        <div className="container mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className="grid sm:grid-cols-2 gap-1 grid-cols-1 p-8">
                    <div className="mb-4 pr-6 border-r-2 border-[#61D9DE] ">
                        <div className="mb-4">
                            <p className="text-blue text-2xl font-medium" >Adicionar Eventos</p>
                            <p className="text-blue text-base font-light" >Crie sue próprio evento da maneira que você preferir :)</p>
                        </div>
                        <Input 
                            title="Título" 
                            placeholder="Insira o nome do seu evento" 
                            type="text" 
                            {...register("title")}
                        />
                        {errors.title && (
                            <span className="text-red-500" >Campo obrigatorio</span>
                        )}
                        <AutoComplete onSelect={onSelect}/>
                        <Input 
                            title="Cupom" 
                            placeholder="Insira o cupom do seu evento"
                            type="text" 
                            {...register("cupom")}
                        />
                        <div className="grid grid-cols-2 grid-rows-2 gap-3">
                            <Input 
                                title="Data de inicio" 
                                placeholder="dd/mm/aaaa" 
                                type="Date" 
                                {...register("date")}
                            />
                            <Input 
                                title="Horário" 
                                placeholder="hh:mm" 
                                type="time" 
                                {...register("time")}
                            />
                            <Input 
                                title="Data final" 
                                placeholder="dd/mm/aaaa" 
                                type="Date" 
                                {...register("finalDate")}
                            />
                            <Input 
                                title="Carga horaria" 
                                placeholder="00" 
                                type="text" 
                                {...register("hours")}
                            />
                        </div>
                        <p className="text-blue text-base font-medium mb-4" >Categoria do Evento</p>
                        <div className="grid grid-cols-4 gap-2 ">
                            {categories.map((category, index) => (
                                <div key={index} className="text-blue">
                                    <input type="checkbox" className="mr-2 " {...register("categories")} value={category.name}/>
                                    <label htmlFor="">{category.name}</label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <p className="text-base font-medium text-blue" >Valor</p>
                            <p className="text-neutral-500 text-sm font-light ">Caso seu evento seja gratuito, o campo deverá ficar em vazio. Caso haja mais de um setor, basta adicionar a seção. Se houver um cupom promocional, basta colocar o código no campo "cupom"</p>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            <Input 
                                title="Preço" 
                                placeholder="R$00,00" 
                                type="text" 
                                className="col-span-2"
                                {...register("price")}
                            />
                            <Input 
                                title="setor" 
                                placeholder="Insira o nome do setor" 
                                type="text" 
                                className="col-span-3"
                                {...register("sector")}
                            />
                        </div>
                        <Input 
                            title="Descrição" 
                            placeholder="Descrição" 
                            type="textarea" 
                            className="col-span-3"
                            {...register("description")}
                        />
                    </div>
                    <div className="mb-4 ml-4 ">
                        <p className="text-blue text-2xl font-medium" >Adicionar Eventos</p>
                        <p className="text-blue text-base font-light" >Crie sue próprio evento da maneira que você preferir :)</p>
                        <div className="my-4">
                            <p className="text-blue text-base font-medium">Banner</p>
                            <p className="text-neutral-500 text-sm font-light ">Insira um banner no formato 336x280</p>
                            <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                                <InputFile {...register("banner")} onChange={(e: any) => handleFileChange('banner', e)} />
                            </div>
                        </div>
                        <div className="my-4">
                            <p className="text-blue text-base font-medium">Flyers</p>
                            <p className="text-neutral-500 text-sm font-light ">Insira ate três flyers</p>
                            <div className="grid  grid-cols-3 gap-2">
                                <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                                    <InputFile  onChange={(e: any) => handleFileChange('flyers', e)}/>
                                </div>
                                <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                                    <InputFile onChange={(e: any) => handleFileChange('flyers', e)}/>
                                </div>
                                <div className="w-full h-28 bg-zinc-300 rounded-3xl shadow">
                                    <InputFile  onChange={(e: any) => handleFileChange('flyers', e)}/>
                                </div>
                            </div>
                        </div>
                        <Button title="Cadastrar Evento" className="" />
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}