'use client'

import { Button } from "@/app/components/Form/Button";
import { CardFilter } from "@/app/components/Form/CardFilter";
import { Input } from "@/app/components/Form/Input";
import { AutoComplete } from "@/app/components/Form/InputAutoComplete";
import { InputRange } from "@/app/components/Form/InputRange";
import { FetchWrapper } from "@/app/utils/FetchWrapper";
import { categories } from "@/app/utils/categories";
import { IFormFilter } from "@/app/utils/interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function FilterEvents() {
    const searchParams = useSearchParams()
    const [events, setEvents] = useState<any>([])
    const {register, handleSubmit, setValue} = useForm<IFormFilter>()
    const getEvents = async (data: any) => {
        const response = await FetchWrapper(`/events/filter?` + new URLSearchParams({
            name: data.name
        }), 'GET')
        setEvents(response.data)    
    } 
    useEffect(() =>{
        if(searchParams.get('q')) {
            getEvents({name: searchParams.get('q')})
        }
    }, [searchParams.get('q')])
    const onSelect = (address: any) => {
        setValue('latitude', address.lat)
        setValue('longitude', address.lng)
    }
    const onSubmit = async (data: IFormFilter) => {
        
        const response = await FetchWrapper(
          `/events/filter?` +
            new URLSearchParams({
              name: data.name,
              category: data.categories,
              price: data.price,
              date: data.date,
              latitude: String(data.latitude),
              longitude: String(data.longitude),
              radius: data.radius,
            }),
          'GET',
        );
        setEvents(response.data);
    }    
    return (
        <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 gap-1 grid-cols-1 p-8">
                <div className="mb-4 pr-6 border-r-2 border-[#61D9DE] ">
                    <div className="mb-4">
                        <p className="text-blue text-2xl font-medium" >Filtrar Eventos</p>
                        <p className="text-blue text-base font-light" >
                            Busque o evento que é sua cara de maneira mais detalhada!
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Input title="Nome" placeholder="Insira o nome do seu evento" type="text"
                        {...register('name')}
                        />
                        <AutoComplete onSelect={onSelect} />
                        <div className="grid grid-cols-2 gap-3">
                            <Input title="Data" placeholder="dd/mm/aaaa" type="Date" 
                            {...register('date')}
                            />
                            <div className="text-blue">
                                <label className="mb-4  font-medium">Categoria</label>
                                <select  {...register('categories')} className=" w-full px-6 py-[5px] bg-white rounded-lg border border-teal-400 ">
                                    <option value="" >Selecione...</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.name}
                                           
                                        >{category.name}</option>
                                    ))} 
                                </select>
                            </div>
                        </div>
                        <InputRange title="Distância" {...register('radius')}/>
                        <InputRange title="Valor" {...register('price')} />
                        <div className="grid grid-cols-2 gap-7 w-2/3 m-auto">
                            <Button title="Limpar" className="bg-white border text-blue border-blue"/>
                            <Button title="Buscar"/>
                        </div>
                    </form>
                </div>
                <div className="mb-4 ml-4 ">
                    <p className="text-blue text-2xl font-medium" >Eventos</p>
                    <p className="text-blue text-base font-light" >Aqui estão os eventos filtrados de acordo com as suas preferências :)</p>
                    {events.map((event: any, index: any) => {
                        return <CardFilter event={event} key={index} />;
                    })}
                </div>
            </div>
        </div>
    )
}