import { ReactNode } from "react"

export interface IFormFilter {
    name: string
    categories: string
    price: string
    date: string
    radius: string
    latitude: string
    longitude: string
}
export interface IFormProps {
    title: string
    cupom: string
    date: string
    time: string
    latitude: string
    longitude: string
    price: string
    sector: string
    description: string
    categories: string
    banner: File
    map: File
}
export interface IParticipants {
    valor: string
    tickets: string
    discount: string
}
export interface ILogin {
    email: string
    password: string
}
export interface IAccount {
    name: string
    email: string
    cpf: string
    password: string
    role?: string
}
export interface IAccountPayload{
    name: string
    email: string
    cpf: string
    password: string
    role: string
}
export type IPagination = {
    page: number 
    limit: number
    total: number
    classNameDiv?: string
}
export interface IPayProps {
    _id: string
    eventId: string
    userId: string
    payment: {
        status: string
        txid: string
        valor: string
        qrCode: string
        pixCopiaECola: string
        expirationTime: string
    }
    tickets: string
    discount: string
}
export type IItem = {
    item: {
        icon: ReactNode
        title: string
        path: string
    }
}
export type ISearch = {
    placeholder : string
}
export interface IUsersPayload {
    _id: string
    name: string
    email: string
    cpf: string
    password: string
    eventos: string[]
    role: string
    createdAt: string
}
export type IUsers = {
    users: IUsersPayload,
    deleteUserFromState: (id: string) => void
    eventId?: string
}
type Price = {
    amount: string
    sector: string
}
export interface IEventsPayload {
    _id: string
    title: string
    location: {
        latitute: string
        longitude: string
    }
    date: string
    coupons: string[]
    description: string
    categories: string[]
    banner: string
    flyers: string[]
    price: Price[]
    city: string
    formattedAddress: string
    participants: string[]
    createdAt: string
}
export type IEvents = {
    events: IEventsPayload
    deleteEventFromState: (id: string) => void,
    userId?: string
}
export type IQuery ={
    q: string
    page: number,
    id?: string | any
}
export type IPayLoad = {
    name: string
    status: string,
    _id: string,
    value: string,
    userId: string,
    createdAt: string
}
export type IPay = {
    payments: IPayLoad
    deletePaymentFromState: (id: string) => void,
}