'use client'

import axios from "axios"
import { Input } from "../Input"
import { useState } from "react"

export const AutoComplete = () => {
    const [suggestions, setSuggestions] = useState([])
    const [inputValue, setInputValue] = useState('')
    const handleChangeInput = async (e: any) => {
        setInputValue(e.target.value)
        const fetchSuggestions = await axios.get(`/api?input=${e.target.value}`)     
        setSuggestions(await fetchSuggestions.data.predictions)           
    }
    const handleSelect = (value: any) => {
        setInputValue(value.description)
        setSuggestions([])
    }

    return (
        <>
            <Input title="Localização" placeholder="Insira o endereço do seu evento" type="input" onChange={handleChangeInput} value={inputValue} />
            <ul className="rounded bg-white shadow" >
                {suggestions.map((result: any, index) => (
                    <li key={index} className="p-2 cursor-pointer hover:bg-gray-200 z-10 " onClick={() => handleSelect(result)}> {result.description} </li>
                ))}
            </ul>
        </>
    )
}