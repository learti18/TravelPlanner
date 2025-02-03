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
import AdminRoute from "./components/protected routes/AdminRoute";
import MyTrips from "./pages/my-trips/MyTrips";

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

            {/* Admin Routes */}
            <Route
              path="dashboard/*"
              element={<AdminRoute component={Dashboard} />}
            />

            {/* Protected Routes */}
            <Route
              path="questionnaire"
              element={<ProtectedRoute component={Questionnaire} />}
            />
            <Route
              path="my-trips"
              element={<ProtectedRoute component={MyTrips} />}
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
