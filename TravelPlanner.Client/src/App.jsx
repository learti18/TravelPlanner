import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home.jsx';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Questionnaire from './pages/Questionnaire/Questionnaire';
import ViewDestination from './pages/view-desintaion/ViewDestination';
import ListDestinations from './pages/Destinations/ListDestinations.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='list-destinations' element={<ListDestinations/>}/>
          <Route path="/questionnaire" element={<Questionnaire/>} />
          <Route path="/view-destination/:destinationId" element={<ViewDestination />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
