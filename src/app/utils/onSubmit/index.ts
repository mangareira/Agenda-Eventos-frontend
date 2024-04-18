import { toast } from "react-toastify";
import { FetchWrapper } from "../FetchWrapper";
import {  IAccount, IFormProps, ILogin, IParticipants } from "../interface";



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
    const response = await FetchWrapper("/events", 'POST',formData) 
    if(response.response.data.message == 'token is missing') return response.response.data.message  
    if(response.code === 'ERR_BAD_REQUEST') {
        toast.error('Erro ao criar evento')
    }
    if(response.status === 200) {
        toast.success('Evento criado com sucesso')      
    }
}
export const onSubmitParticipants = async (data: IParticipants, eventsId: any,) => {   
    const getUserId = () => {
        if (typeof window !== 'undefined'){
            const user = localStorage.getItem('user');            
            return user
        } 
    }         
    const response = await FetchWrapper(`/events/${eventsId}/${getUserId()}/participants`, 'POST',data) 
    if(response.code === 'ERR_BAD_REQUEST') {
        toast.error(response.response.data.message)
    }
    if(response.status === 200) {
        toast.success('Participante adicionado com sucesso')
    }
    return response
    
}

export const onSubimtLogin = async (data: ILogin) => {
        const response =  await FetchWrapper(`/events/login`, 'POST',data)          
        if(response.code === 'ERR_BAD_REQUEST'){
            toast.error(response.response.data.message)
        }
        if(response.status === 200) {
            localStorage.setItem('token', await response.data.access_token )
            localStorage.setItem('refresh_token', await response.data.access_refresh_token ) 
            localStorage.setItem('user', response.data.user_id) 
            toast.success("login feito com sucesso")
        }     
        return response             
}
export const onSubimtCreateAccount = async (data: IAccount) => {
    const response =  await FetchWrapper(`/events/create-account`, 'POST',data)          
    if(response.code === 'ERR_BAD_REQUEST'){
        toast.error(response.response.data.message)
    }
    if(response.status === 201) {
        toast.success("Conta criada com sucesso")
    } 
    console.log(response);
        
    return response 
}