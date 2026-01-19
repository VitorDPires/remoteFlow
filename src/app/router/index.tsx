import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/components/layout";
import { LoginPage, RegisterPage } from "@/features/auth/pages";
import { LandingPage } from "@/features/landing";
import { DashboardPage } from "@/features/dashboard/pages";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}