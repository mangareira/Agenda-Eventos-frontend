import React from 'react'
import { IQuery } from '@/app/utils/interface'
import Pagination from '@/app/components/DashBoard/pagination'
import { useUserEventsList } from '@/app/utils/hooks/useUserEventsList'
import { TableEventsUser } from '@/app/components/TableUsers/TableUserEvents'


export const TableEventsUserPage = ({q, page, id}:IQuery ) => {
    const {events, count, deleteEventsFromState} = useUserEventsList(q,page,id)
    return (
    <div>
        <table className="w-full" > 
            <thead>
                <tr>
                    <td className="p-2.5">Title</td>
                    <td className="p-2.5">Description</td>
                    <td className="p-2.5">Price</td>
                    <td className="p-2.5">Created At</td>
                </tr>
            </thead>
            <tbody>
                {events?.map((user, index) => (
                    <TableEventsUser events={user} key={index} deleteEventFromState={deleteEventsFromState} userId={id}/>
                ))}
            </tbody>
        </table>
        <Pagination count={count}/>
    </div>
    )
}
