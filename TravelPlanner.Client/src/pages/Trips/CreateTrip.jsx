import DefaultColumn from './../../components/Inputs/DefaultColumn.jsx';
import NameInput from './../../components/Inputs/NameInput.jsx';
import DefaultInput from './../../components/Inputs/DefaultInput.jsx';
import CurrencyInput from './../../components/Inputs/CurrencyInput.jsx';
import {React,useState} from 'react'
import apiClient from '../../services/Api.js';

export default function CreateTrip() {
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    cost: "",
    startDate: "",
    endDate: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = await apiClient.post("Trips",formData)
      
    }catch(error){
      console.log(error)
    }
  };

  return (
    <section className="mt-10 py-12 dark:bg-dark flex justify-center items-center min-h-screen">
      <div className="container border border-neutral-200 border rounded-lg p-10">
        <form onSubmit={handleSubmit}>
          <div className="-mx-4 flex flex-wrap">

            <DefaultColumn>
              <DefaultInput
                  label="Trip Name"
                  name={"name"}
                  value={formData.name} 
                  onChange={handleInputChange}
                  placeholder="Enter trip name" 
                />
            </DefaultColumn>

            <DefaultColumn>
              <DefaultInput
                label="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Enter Destination"
              />
            </DefaultColumn>

            <DefaultColumn>
              <CurrencyInput
                  label="Cost"
                  name="cost"
                  value={formData.cost} 
                  onChange={handleInputChange} />
            </DefaultColumn>

            <DefaultColumn>
              <DefaultInput
                label="Departure Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                placeholder="Select Departure Date"
              />
            </DefaultColumn>

            <DefaultColumn>
              <DefaultInput
                label="Return Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                placeholder="Select Return Date"
              />
            </DefaultColumn>

         
              <button
                type="submit"
                className="m-auto py-[10px] px-5 bg-slate-600 text-white rounded-md mt-6 transition hover:bg-primary-dark"
              >
                Submit Trip Details
              </button>
          
          </div>
        </form>
      </div>
    </section>
  )
}
