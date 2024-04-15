import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './pages/Layout';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import NotfoundPage from './pages/NotfoundPage/NotfoundPage';
import StoragePage from './pages/StoragePage/StoragePage';
import PlanPage from './pages/PlanPage/PlanPage';
import ForgotPassPage from './pages/LoginPage/ForgotPassPage';
import NewPasswordPage from './pages/LoginPage/NewPasswordPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />s
                <Route path="list/*" element={<HomePage />} />
                <Route path="storage" element={<StoragePage />} />
                <Route path="plan" element={<PlanPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="forgot-password" element={<ForgotPassPage />} />
                <Route path="new-password" element={<NewPasswordPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<NotfoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
