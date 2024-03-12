'use client'

import { FetchWrapper } from "@/app/utils/FetchWrapper"
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { CardFilter } from "../Form/CardFilter"

const containerStyle = {
    width: '100%',
    height: '100vh',
    maxHeight: '100vh'
}

export const MapContainer = () => {

    const [center, setCenter] = useState({
        lat: -3.897,
        lng: -32.140
    })
    const [markers, setMarkers] = useState([])
    const [selected, setSelected] = useState<any>(null)

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    if(!apiKey) throw new Error('API KEY NOT FOUND')
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:  apiKey
    })

    const getEventByLocation = async (lat: number, lng: number) => {
        const response = await FetchWrapper(
            `/events?latitude=${lat}&longitude=${lng}`,
            'GET'
        )
        setMarkers(response.data)        
    }

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords
                setCenter({lat: latitude, lng: longitude})
                getEventByLocation(latitude, longitude)
            }, (error) => {
                console.log('Erro to location')
            })
        }
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {markers.map((marker: any, index) => (
                <Marker 
                key={index} 
                position={{lat: Number(marker.location.latitude), lng: Number(marker.location.longitude)}}
                onClick={() => setSelected(marker)}
                ></Marker>
            ))}
            {selected && (
                <InfoWindow position={{
                    lat: Number(selected?.location.latitude) ,
                    lng: Number(selected?.location.longitude) ,
                }} 
                onCloseClick={() => setSelected(null)}
                >
                    <CardFilter event={selected} />
                </InfoWindow>
            )}
        </GoogleMap>
    ) : <p>Carregando...</p>
}