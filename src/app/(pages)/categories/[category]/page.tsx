'use client'
import { CardFilter } from '@/app/components/Form/CardFilter';
import { Pagination } from '@/app/components/Pagination';
import { FetchWrapper } from '@/app/utils/FetchWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export default function Categories({searchParams}: {searchParams: {page: string, limit: string}}) {
    const page = Number(searchParams?.page) || 1
    const limit = Number(searchParams?.limit) ||6
    const [events, setEvents] = useState<any>([])
    const [quantity, setQuantity] = useState<Number | any>()
    const searchParam = useSearchParams();

    
    const getEvents = async (value: any) => {                        
        const response = await FetchWrapper(`/events/category/${value}`, 'GET' )
        setEvents(response.data.events) 
        setQuantity(response.data.quantity)                   
    } 
    useEffect(() =>{
        if(searchParam.get('q')) {
            getEvents(searchParam.get('q'))
        }
    }, [searchParam.get('q')])
    
    const p = () => {
        if(!quantity) {
            return <div className="absolute top-[50%] left-[45%]"><AiOutlineLoading className="animate-spin text-blue" size={30}/></div>
        }
        return <Pagination limit={limit} page={page} total={quantity} classNameDiv="flex justify-center" />
    }

    return (
        <div className="p-10">
            <div className="mb-10">
                <p className='text-blue text-2xl font-medium'>Categorias : {searchParam.get('q')}</p>
                <p className='text-blue text-base font-light'>Ache o evento do seu gosto :)</p>
            </div>
            <div className="grid sm:grid-cols-3 sm:gap-4 grid-cols-1 gap-0  mt-20 sm:mt-0">
                {events.map((e: any, index: any) =>(
                    <div className="" key={index}>
                        <CardFilter event={e}  />
                    </div>
                ))}
            </div>
            {p()}
        </div>
    );
}
