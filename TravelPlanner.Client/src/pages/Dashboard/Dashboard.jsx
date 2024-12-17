import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import DashboardOverview from "./DashboardOverview";
import DestinationManager from "./DestinationManager";
import Settings from "./Settings";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="destinations" element={<DestinationManager />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
