import apiClient from '@/services/Api'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function useHotels(destinationId,hotelId) {
    const [hotels,setHotels] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [hotel,setHotel] = useState({})

    useEffect(() => {
        fetchHotels(destinationId)
    },[])

    useEffect(() => {
        if(hotelId){
            fetchHotel(destinationId,hotelId)
        }
    },[])

    const fetchHotels = async (destinationId) => {
        try{
            const response = await apiClient.get(`destinations/${destinationId}/hotels`)
            setHotels(response.data)
        }catch(error){
            toast.error('Failed to fetch hotels')
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }
    const fetchHotel = async (destinationId,hotelId) => {
        try{
            const response = await apiClient.get(`destinations/${destinationId}/hotels/${hotelId}`)
            setHotel(response.data)
        }catch{
            toast.error('Failed to fetch hotel')
        }finally{
            setIsLoading(false)
        }
    }
    const addHotel = async  (destinationId,formData) => {
        try{
            const response = await apiClient.post(`destinations/${destinationId}/hotels`,formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            setHotels([...hotels,response.data])
            toast.success('Hotel added successfully')
        }catch(error){
            toast.error('Failed to add hotel')
        }finally{
            setIsLoading(false)
        }
    }
    const updateHotel = async (destinationId,hotelId,formData) => {
        try{
            const response = await apiClient.put(`destinations/${destinationId}/hotels/${hotelId}`,formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            const data = response.data
            setHotels(prev => prev.map(hotel => hotel.id === hotelId ? data : hotel))
            toast.success('Hotel updated successfully')
        }catch(error){
            toast.error('Failed to update hotel')
        }finally{
            setIsLoading(false)
        }
    }
    const deleteHotel = async (destinationId,hotelId) => {
        try{
            await apiClient.delete(`destinations/${destinationId}/hotels/${hotelId}`)
            setHotels(hotels.filter(hotel => hotel.id !== hotelId))
            toast.success('Hotel deleted successfully')
        }catch(error){
            toast.error('Failed to delete hotel')
        }finally{
            setIsLoading(false)
        }
    }
    return {
        hotels,
        hotel,
        isLoading,
        addHotel,
        updateHotel,
        deleteHotel
    }
}
