'use client'
import { CardFilter } from '@/app/components/Form/CardFilter';
import { FetchWrapper } from '@/app/utils/FetchWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Categories() {
    const [events, setEvents] = useState<any>([])
    const searchParams = useSearchParams();

    
    const getEvents = async (value: any) => {                        
        const response = await FetchWrapper(`/events/category/${value}`, 'GET' )        
        setEvents(response.data)                    
    } 
    useEffect(() =>{
        if(searchParams.get('q')) {
            getEvents(searchParams.get('q'))
        }
    }, [searchParams.get('q')])
    

    return (
        <div className="p-10">
            <div className="mb-10">
                <p className='text-blue text-2xl font-medium'>Categorias : {searchParams.get('q')}</p>
                <p className='text-blue text-base font-light'>Ache o evento do seu gosto :)</p>
            </div>
            <div className="grid sm:grid-cols-3 sm:gap-4 grid-cols-1 gap-0  mt-20 sm:mt-0">
                {events.map((e: any, index: any) =>(
                    <div className="" key={index}>
                        <CardFilter event={e}  />
                    </div>
                ))}
            </div>
        </div>
    );
}
