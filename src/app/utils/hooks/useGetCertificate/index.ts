import { useCallback, useEffect, useState } from "react"
import { FetchWrapper } from "../../FetchWrapper"

type CertificateData = {
    name: string
    cpf: string
    email: string
    eventName: string
    eventDate: Date
}

export const useGetCertificate = (slug: string) => {
    const [data, setData] = useState<CertificateData>()
    const [status, setStatus] = useState<number>()
    const [message, setMessage] = useState<string>()

    const getCertificate = useCallback(async(slug:string) => {
        const getData = await FetchWrapper(`/events/certificate/${slug}`, "GET")
        setData(getData.data)
        setStatus(getData?.response?.data?.status)
        setMessage(getData?.response?.data?.message)
    }, [slug])
    useEffect(() => {
        if(slug !== undefined) {
            getCertificate(slug)
        }
    }, [slug])

    return {data, getCertificate, status, message}
}