import React, { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    sub: string;
    exp: number;
    UUID: string;
    iat: number;
}

const isTokenValid = (token: string | null): number | boolean => {
    if (!token) return false;

    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp && decodedToken.exp > currentTime;
};

const logout = (): void => {
    localStorage.removeItem('token');
};

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!isTokenValid(token)) {
            logout();
        }

        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (!isTokenValid(token)) {
                logout();
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return <>{children}</>;
};

export default AuthWrapper;
