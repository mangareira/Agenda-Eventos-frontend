import { toast } from "react-toastify";
import { FetchWrapper } from "../FetchWrapper";
import {  IAccount, IAccountPayload, IExport, IFormProps, ILogin, IParticipants } from "../interface";
import { IEmail } from "@/app/(admin)/dashboard/events/[id]/participant/add/page";



export const onSubmitCreate = async (data: IFormProps, flyers: any) => {    
    if(!data.date && !data.time) return 'use uma data valida'  
    const newDate = new Date(`${data.date}T${data.time}`).toISOString()  
    const finalDate =  new Date(data.finalDate).toISOString()
    const formData = new FormData()      
    formData.append('title', data.title)
    formData.append('coupons', data.cupom)      
    formData.append('date', newDate) 
    formData.append('finalDate', finalDate)
    formData.append('hours', data.hours) 
    formData.append('limit', String(data.limit))    
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
    if(response.response?.data?.message == 'token is missing') return response.response.data.message  
    if(response.code === 'ERR_BAD_REQUEST') {
        toast.error('Erro ao criar evento')
    }
    if(response.status === 201) {
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
    if(response.response?.data?.message == 'token is missing') return response.response.data.message
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
        
    return response 
}
export const onSubimtAddParticipantWithEmail = async (data: IEmail, eventId: string) => {
    const response =  await FetchWrapper(`/events/add-with-email/participants`, 'POST','',{email:data.email,tickets: data.tickets,discount: data.discount, eventId})          
    if(response.code === 'ERR_BAD_REQUEST'){
        toast.error(response.response.data.message)
    }   
    if(response.status === 200) {
        toast.success("Usuario adicionado com sucesso")
    } 
        
    return response 
}
export const onSubmitExport = async (data: IExport) => {
    let tokenLoc
    if (typeof window !== 'undefined'){
        const token = localStorage.getItem('token');            
        tokenLoc = token
    }   
    try {
        // Formatar as datas
        const startDate = new Date(data.startDate).toISOString();
        const endDate = new Date(data.endDate).toISOString();

        // Fazer a requisição POST para o backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/exports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenLoc}`
            },
            body: JSON.stringify({ ...data, startDate, endDate })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            toast.error(errorResponse.message || "Failed to download the file");
            return;
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
        toast.success("Arquivo exportado com sucesso!");

    } catch (error) {
        console.error('Erro ao exportar os dados:', error);
        toast.error("Erro ao exportar os dados.");
    }
};

export const onSendCertificate = async (params: string) => {
    try {
        await FetchWrapper(`/events/certificate`, 'POST', '', {id: params})
        toast.success("Certificados enviados com sucesso")
    } catch (error) {
        console.log(error)
    }
}
