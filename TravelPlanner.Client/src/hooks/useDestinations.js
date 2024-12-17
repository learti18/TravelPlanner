import { useState, useEffect } from 'react';
import apiClient from '@/services/Api';
import { toast } from 'sonner';

export default function useDestinations(destinationId) {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [destination,setDestination] = useState({})

  useEffect(() => {
    fetchDestinations();
  }, []);
  
  useEffect(() => {
    if (destinationId) {
      fetchDestination();
    }
  }, [destinationId]);

  const fetchDestinations = async () => {
    try {
      const response = await apiClient.get("destinations");
      setDestinations(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch destinations');
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDestination = async () => {
    try{
        const response = await apiClient.get(`destinations/${destinationId}`)
        setDestination(response.data)
    }catch(error){
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  const addDestination = async (formData) => {
    try {
      const response = await apiClient.post("destinations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDestinations(prev => [...prev, response.data]);
      toast.success('Destination added successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add destination');
      throw error;
    }
  };

  const updateDestination = async (id, formData) => {
    try {
      const response = await apiClient.put(`destinations/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDestinations(prev =>
        prev.map(dest => dest.id === id ? response.data : dest)
      );
      toast.success('Destination updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update destination');
      throw error;
    }
  };

  const deleteDestination = async (id) => {
    try {
      await apiClient.delete(`destinations/${id}`);
      setDestinations(prev => prev.filter(dest => dest.id !== id));
      toast.success('Destination deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete destination');
      throw error;
    }
  };

  return {
    destinations,
    destination,
    isLoading,
    addDestination,
    updateDestination,
    deleteDestination
  };
}
