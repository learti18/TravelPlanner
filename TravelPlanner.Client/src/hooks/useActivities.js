import apiClient from '@/services/Api'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function useActivities(destinationId,activityId) {
    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(true) 
    const [activity, setActivity] = useState({})
    
    useEffect(() => { 
        fetchActivities(destinationId)
    }, [])

    useEffect(() => {
        if(activityId){
            fetchActivity(destinationId,activityId)
        }
    }, [])

    const fetchActivities = async (destinationId) => {
        if (!destinationId) return;
        setIsLoading(true);
        try {
            const response = await apiClient.get(`destinations/${destinationId}/activities`)
            setActivities(response.data)
        } catch(error) {
            toast.error(error.response?.data?.message || 'Failed to fetch activities')
        } finally {
            setIsLoading(false)
        }
    }

    const fetchActivity = async (destinationId,activityId) => {
        if (!destinationId) return;
        try{
            const response = await apiClient.get(`destinations/${destinationId}/activities/${activityId}`)
            setActivity(response.data)
        }catch(error){
            toast.error(error.response?.data?.message || 'Failed to fetch activity')
        }finally{
            setIsLoading(false)
        }
    }

    const addActivity = async (destinationId,formData) => {
        try{
            const response = await apiClient.post(`destinations/${destinationId}/activities`,formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            setActivities(prev => [...prev,response.data])
            toast.success('Activity added successfully')
        }catch(error){
            toast.error(error.response?.data?.message || 'Failed to add activity')
        }finally{
            setIsLoading(false)
        }  
    }
    
    const updateActivity = async (destinationId,activityId,formData) => {
        try{
            const response = await apiClient.put(`destinations/${destinationId}/activities/${activityId}`,formData, { 
                headers: { "Content-Type": "multipart/form-data" } })
            const data = response.data
            setActivities(prev => prev.map(activity => activity.id === activityId ? data : activity))
            toast.success('Activity updated successfully')
        }catch(error){
            toast.error(error.response?.data?.message || 'Failed to update activity')
        }finally{
            setIsLoading(false)
        }
    }

    const deleteActivity = async (destinationId,activityId) => {
        try{
            const response = await apiClient.delete(`destinations/${destinationId}/activities/${activityId}`)
            setActivities(prev => prev.filter(activitiy => activitiy.id !== activityId))
            toast.success('Activity deleted successfully')
        }catch(error){
            toast.error(error.response?.data?.message || 'Failed to delete activity')
        }finally{
            setIsLoading(false)
        }
    }
  
    return {
        activities,
        activity,
        isLoading,
        fetchActivities,
        addActivity,
        updateActivity,
        deleteActivity
    }
}
