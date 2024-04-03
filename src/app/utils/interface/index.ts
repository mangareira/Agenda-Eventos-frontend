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
    name: string
    email: string
    valor: string
    tickets: string
    discount: string
}