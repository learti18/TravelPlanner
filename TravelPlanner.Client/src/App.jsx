import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home.jsx';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import CreateTrip from './pages/Trips/CreateTrip.jsx';
import ListTrips from './pages/Trips/ListTrips.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='trips' element={<ListTrips/>}/>
          <Route path="/createTrip" element={<CreateTrip />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
