import { useCallback, useEffect, useState } from "react";
import { IPayLoad, IPayProps } from "../../interface";
import { FetchWrapper } from "../../FetchWrapper";

export const useTableTrans = (query: string, pageUrl: number) => {
    const [payments, setPayments] = useState<IPayLoad[]>([]);
    const [count, setCount] = useState<number>();
    const q = query || "";
    const page = pageUrl || 1;
    const fetchPayments = useCallback(async () => {
        const { data } = await FetchWrapper(`/events/get-all-payments`, "GET", "", { q, page });
        setPayments(data.payments);
        setCount(data.count);
        }, [q, page]);
    const deletePaymentFromState = (id: string) => {
        setPayments(payments.filter((payments) => payments._id !== id));
    };
    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);
    return {
        payments,
        count,
        deletePaymentFromState,
    }
}