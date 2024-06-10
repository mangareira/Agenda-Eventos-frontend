'use client'
import { InputAdmin } from '@/app/components/inputAdmin'
import { useGetEvent } from '@/app/utils/hooks/useGetEvent'
import { IEvents, IEventsPayload} from '@/app/utils/interface'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineLoading } from 'react-icons/ai'
import { toast } from 'react-toastify'

function Event({ params }: { params: { id: string } }) {
    const {event, updateEvent} = useGetEvent(params.id)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<IEventsPayload>()
    useEffect(() => {
        if (event) {
            setValue('categories', event.categories)
            setValue('city', event.city)
            setValue('coupons', event.coupons)
            setValue('date', event.date)
            setValue('description', event.description)
            setValue('formattedAddress', event.formattedAddress)
            setValue('price.0.amount', event.price[0].amount)
            setValue('price.0.sector', event.price[0].sector)
            setValue('title', event.title)
        }
    }, [event, setValue]);
    if(!event) return <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
    const date = new Date(String(event?.date))
    const banner = `http://localhost:3333/uploads/${event?.banner}`  
    const submit = async (data: IEventsPayload) => {
        if(!event?._id) return toast.error("id is required")
        await updateEvent(data,event?._id)
    }  
    return (
        <div className='flex gap-12 mt-5 text-white' >
            <div className="flex-[1] bg-green_admin p-5 rounded-xl-0.5 font-bold h-max ">
                <div className="w-full h-72 relative rounded-xl-0.5 overflow-hidden mb-5">
                    <div style={{ backgroundImage:  `url(${banner})`}} className='w-full h-[280px] relative rounded-3xl shadow bg-cover bg-center'/>
                </div>
                {event?.title}
            </div>
            <div className="flex-[3] bg-green_admin p-5 rounded-xl-0.5 ">
                <form onSubmit={handleSubmit(submit)} className='flex flex-col text-xs'>
                    <InputAdmin title='Nome' type='text' placeholder={event?.title || ''} {...register('title')}/>
                    <InputAdmin title='categoria' type='text' placeholder={event?.categories[0] || ''} {...register('categories.0')}/>
                    <InputAdmin title='Cidade' type='text' placeholder={event?.city || ''} {...register('city')}/>
                    <InputAdmin title='Cupom' type='text' placeholder={event?.coupons[0] || "não tem"} {...register('coupons.0')}/>
                    <InputAdmin title='Data do evento' type='text' placeholder={date.toString().slice(4,16) || ""} {...register('date')}/>
                    <InputAdmin title='Descrição' type='textarea' placeholder={event?.description || ""} {...register('description')}/>
                    <InputAdmin title='Endereço' type='text' placeholder={event?.formattedAddress || ""} {...register('formattedAddress')}/>
                    <InputAdmin title='Preço' type='text' placeholder={event?.price[0].amount || ""} {...register('price.0.amount')}/>
                    <InputAdmin title='Setor' type='text' placeholder={event?.price[0].sector || ""} {...register('price.0.sector')}/>
                    <button className='w-full p-5 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin text-base mt-5'>Update</button>
                </form>
                <Link href={`/dashboard/events/${event._id}/participant`} >
                    <button className='w-full p-5 bg-green_button rounded-md-0.5 cursor-pointer hover:bg-hover_admin text-base mt-5'>Participantes</button>
                </Link>
            </div>
        </div>
    )
}

export default Event
