import React from 'react'
import Pagination from '../../DashBoard/pagination'
import { useEventsList } from '@/app/utils/hooks/useEventsList'
import { TableEvents } from '../../TableEvents'
import { IQuery } from '@/app/utils/interface'

export const TableEventsPage = ({q, page}:IQuery) => {
const {count, events, deleteEventFromState} = useEventsList(q, page)    

  return (
    <div>
        <table className="w-full" > 
            <thead>
                <tr>
                    <td className="p-2.5">Title</td>
                    <td className="p-2.5">Description</td>
                    <td className="p-2.5">Price</td>
                    <td className="p-2.5">Created At</td>
                    <td className="p-2.5">Participants</td>
                    <td className="p-2.5">Action</td>
                </tr>
            </thead>
            <tbody>
                {events.map((event, index) => (
                    <TableEvents events={event} key={index} deleteEventFromState={deleteEventFromState}/>
                ))}
            </tbody>
        </table>
        <Pagination count={count}/>
    </div>
  )
}
