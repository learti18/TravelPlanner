import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Questionnaire from "./pages/Questionnaire/Questionnaire";
import ViewDestination from "./pages/view-destination/ViewDestination";
import ListDestinations from "./pages/Destinations/ListDestinations";
import { Toaster } from 'sonner';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/protected routes/ProtectedRoute";
import MyTrips from "./components/MyTrips/TripPage";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="mytrips" element={<MyTrips />} />


            {/* Protected Routes */}
            <Route
              path="dashboard/*"
              element={<ProtectedRoute component={Dashboard} />}
            />
            <Route
              path="questionnaire"
              element={<ProtectedRoute component={Questionnaire} />}
            />
            <Route
              path="list-destinations"
              element={<ProtectedRoute component={ListDestinations} />}
            />
            <Route
              path="view-destination/:destinationId"
              element={<ProtectedRoute component={ViewDestination} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
