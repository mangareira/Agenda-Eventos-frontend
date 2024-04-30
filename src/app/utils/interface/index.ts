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
}
export type IPagination = {
    page: number 
    limit: number
    total: number
    classNameDiv?: string
}