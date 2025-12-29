import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/features/auth/pages";
import { LandingPage } from "@/features/landing";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}