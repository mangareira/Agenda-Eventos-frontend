import React from 'react'
import { IQuery } from '@/app/utils/interface'
import Pagination from '@/app/components/DashBoard/pagination'
import { TableParticipants } from '@/app/components/TableEvents/TableParticipants'
import { useParticipantsList } from '@/app/utils/hooks/useParticipantsList'
import dayjs from 'dayjs'


export const TableParticipantPage = ({q, page, id}:IQuery ) => {
    const {users, count, deleteParticipantsFromState, event} = useParticipantsList(q,page,id)

    return (
    <div>
        <table className="w-full" > 
            <thead>
                <tr>
                    <td className="p-2.5">Name</td>
                    <td className="p-2.5">Email</td>
                    <td className="p-2.5">Created At</td>
                    <td className="p-2.5">Role</td>
                    <td className="p-2.5">Action</td>
                    {dayjs(new Date()).isAfter(event?.date) ? <td className='p-2.5'>Confirmação</td>: null}
                </tr>
            </thead>
            <tbody>
                {users?.map((user, index) => (
                    <TableParticipants users={user} key={index} deleteUserFromState={deleteParticipantsFromState} eventId={id}/>
                ))}
            </tbody>
        </table>
        <Pagination count={count}/>
    </div>
    )
}
