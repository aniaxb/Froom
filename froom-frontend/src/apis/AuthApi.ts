import axios from 'axios';
import {User} from '../model/User.ts';

export class AuthApi {

    static loginUser(email: string, password: string) {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            email: email,
            password: password
        }).then(response => {
            return response.data
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error logging in');
            }
        })
    }

    static refresh(refreshToken: string) {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh`, {
            refreshToken: refreshToken
        }).then(response => {
            return response.data
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error refreshing token');
            }
        })
    }

    static setAuthToken(token: string): void {
        localStorage.setItem('token', token);
    }

    static setUser(user: User | undefined): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static setRefreshToken(refreshToken: string | undefined): void {
        if (typeof refreshToken === 'string') {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }

    static getAuthToken(): string | null {
        return localStorage.getItem('token');
    }

    static getUser(): User | undefined {
        return JSON.parse(localStorage.getItem('user') ?? '{}');
    }

    static getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    static removeData(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
    }
}
