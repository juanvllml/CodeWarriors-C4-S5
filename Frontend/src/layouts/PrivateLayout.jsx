import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/authContext';
import { REFRESH_TOKEN } from '../graphql/Users/mutations';
import { useNavigate, Outlet } from 'react-router-dom';

const PrivateLayout = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [loadingAuth, setLoadingAuth] = useState(true);

    // falta captura de error de mutacion
    const [refreshToken, { data: dataMutation }] =
        useMutation(REFRESH_TOKEN);

    useEffect(() => {
        refreshToken();
    }, [refreshToken]);

    useEffect(() => {
        if (dataMutation) {
            if (dataMutation.refreshToken.token) {
                setToken(dataMutation.refreshToken.token);
            } else {
                setToken(null);
                navigate('/auth/login');
            }
            setLoadingAuth(false);
        }
    }, [dataMutation, setToken, loadingAuth, navigate]);

    return (
        <>
            <Sidebar />
            <div className={`d-flex flex-column main `}>
            <NavBar />
                <div className="container mt-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default PrivateLayout;