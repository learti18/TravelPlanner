import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Questionnaire from "./pages/Questionnaire/Questionnaire";
import ViewDestination from "./pages/view-desintaion/ViewDestination";
import ListDestinations from "./pages/Destinations/ListDestinations";
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="list-destinations" element={<ListDestinations />} />
            <Route path="questionnaire" element={<Questionnaire />} />
            <Route
              path="view-destination/:destinationId"
              element={<ViewDestination />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
