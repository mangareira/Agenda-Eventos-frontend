import { cancelledSub } from '@/app/utils/cancelledSubscribe'
import { IEvents } from '@/app/utils/interface'
import Link from 'next/link'
import React from 'react'

export const TableEventsUser = ({events, deleteEventFromState,userId}: IEvents,) => {
    const date = new Date(events.createdAt)
    const minName = events.title.slice(0,25).toString() + '.'
    const banner = `http://localhost:3333/uploads/${events.banner}`
    const price = () => {
        if(events.price[0].amount === "") return "gratís"
        return events.price[0].amount
    }
    const handleDelete = (id: string) => async () => {
        await cancelledSub(id,userId)
        deleteEventFromState(id)
    }
    return (
        <tr>
            <td className="p-2.5">
                <div className="flex items-center gap-2.5">
                    <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden mb-5">
                        <div style={{ backgroundImage:  `url(${banner})`}} className='w-full h-full relative rounded-3xl shadow bg-cover bg-center'/>
                    </div>
                    {minName}
                </div>
            </td>
            <td className="p-2.5">{events.description}</td>
            <td className="p-2.5">{price()}</td>
            <td className="p-2.5">{date.toString().slice(4,16)}</td>
            <td className="p-2.5">
                <div className="flex gap-2.5">
                    <Link href={`/dashboard/events/${events._id}`}>
                        <button className={`${"py-1 px-2.5 rounded cursor-pointer"} ${"bg-teal-500"}`} >View</button>
                    </Link>
                    <button className={`${"py-1 px-2.5 rounded cursor-pointer"} ${"bg-red-700"}`} onClick={handleDelete(events._id)}>Cancelled subscribe</button>
                </div>
            </td>
        </tr>
  )
}
