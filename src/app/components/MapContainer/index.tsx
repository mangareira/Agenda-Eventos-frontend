'use client'

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useState } from "react"

const containerStyle = {
    width: '100%',
    height: '100vh',
    maxHeight: '100vh'
}

const makers = [
    {lat: -19.381038, lng: -43.1801929}, 
    {lat: -19.346538, lng: -45.1801929}, 
    {lat: -18.381038, lng: -44.1801929}, 
    {lat: -11.381038, lng: -41.1801929}, 
    {lat: -13.381038, lng: -42.1801929}, 
]

export const MapContainer = () => {

    const [center, setCenter] = useState({
        lat: -3.897,
        lng: -32.140
    })

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    if(!apiKey) throw new Error('API KEY NOT FOUND')
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:  apiKey
    })

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords
                setCenter({lat: latitude, lng: longitude})
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
            {makers.map((maker, index) => (
                <Marker key={index} position={{lat: maker.lat, lng: maker.lng}}></Marker>
            ))}
        </GoogleMap>
    ) : <p>Carregando...</p>
}