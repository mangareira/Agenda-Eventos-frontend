import { toast } from "react-toastify";
import { FetchWrapper } from "../FetchWrapper";
import {  IFormProps, IParticipants } from "../interface";

export const onSubmitCreate = async (data: IFormProps, flyers: any) => {
    const newDate = new Date(`${data.date}T${data.time}`).toISOString()        
    const formData = new FormData()      
    formData.append('title', data.title)
    formData.append('coupons', data.cupom)      
    formData.append('date', newDate)      
    formData.append('location[latitude]', data.latitude)   
    formData.append('location[longitude]', data.longitude)
    formData.append('price[amount]', data.price)         
    formData.append('price[sector]', data.sector)      
    formData.append('description', data.description) 
    formData.append('categories', data.categories)      
    formData.append('banner', data.banner)   
    flyers.forEach((flyer: any) => {
        formData.append('flyers', flyer)
    })
    try {
        const response = await FetchWrapper("/events", 'POST', formData)       
        toast.success('Evento criado com sucesso')     
    } catch (error) {
        toast.error('Erro ao criar evento')
    }
}
export const onSubmitParticipants = async (data: IParticipants, eventsId: any) => {            
    try {
        const response = await FetchWrapper(`/events/${eventsId}/participants`, 'POST', data) 
        localStorage.setItem('id', await response.data.participantId)
        toast.success('Participante adicionado com sucesso')     
    } catch (error) {
        toast.error('Erro ao adcionar o participante')
    }
}