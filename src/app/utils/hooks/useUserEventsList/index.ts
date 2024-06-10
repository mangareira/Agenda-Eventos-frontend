import { useCallback, useEffect, useState } from "react";
import { FetchWrapper } from "../../FetchWrapper";
import { IEventsPayload } from "../../interface";

export const useUserEventsList = (query: string, pageUrl: number, id :string) => {
    const [events, setEvents] = useState<IEventsPayload[]>([]);
    const [count, setCount] = useState<number>();
    const q = query || "";
    const page = pageUrl || 1;

    const fetchEvents = useCallback(async () => {
    const { data } = await FetchWrapper(`/events/get-user-events/${id}`, "GET", "", { q, page });
    setEvents(data.events);
    setCount(data.count);
    }, [q, page]);
    const deleteEventsFromState = (id: string) => {
      setEvents(events.filter((events) => events._id !== id));
    };
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return {
        events,
        count,
        deleteEventsFromState
    };
};