import { useCallback, useEffect, useState } from "react";
import { FetchWrapper } from "../../FetchWrapper";
import { IUsersPayload } from "../../interface";

export const useParticipantsList = (query: string, pageUrl: number, id :string) => {
    const [users, setUsers] = useState<IUsersPayload[]>([]);
    const [count, setCount] = useState<number>();
    const q = query || "";
    const page = pageUrl || 1;

    const fetchUsers = useCallback(async () => {
    const { data } = await FetchWrapper(`/events/get-events-participants/${id}`, "GET", "", { q, page });
    setUsers(data.users);
    setCount(data.count);
    }, [q, page]);
    const deleteParticipantsFromState = (id: string) => {
      setUsers(users.filter((user) => user._id !== id));
    };
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        count,
        deleteParticipantsFromState
    };
};