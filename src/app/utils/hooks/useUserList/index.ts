import { useCallback, useEffect, useState } from "react";
import { FetchWrapper } from "../../FetchWrapper";
import { IUsersPayload } from "../../interface";

export const useUserList = (query: string, pageUrl: number) => {
    const [users, setUsers] = useState<IUsersPayload[]>([]);
    const [count, setCount] = useState<number>();
    const q = query || "";
    const page = pageUrl || 1;

    const fetchUsers = useCallback(async () => {
    const { data } = await FetchWrapper(`/events/get-participants/`, "GET", "", { q: q, page });
    setUsers(data.users);
    setCount(data.count);
    }, [q, page]);
    const deleteUserFromState = (id: string) => {
      setUsers(users.filter((user) => user._id !== id));
    };
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        count,
        deleteUserFromState
    };
};