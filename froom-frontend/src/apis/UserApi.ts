import axios from 'axios';
import {User} from '../model/User.ts';

export class UserApi {
    static registerUser(firstName: string, lastName: string, username: string, email: string, password: string): Promise<void> {
        return axios.post(`${import.meta.env.BACKEND_URL}/user/register`, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        }).then(response => {
            return response.data
        })
    }

    static getUser(): Promise<User> {
        return axios.get(`${import.meta.env.BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data
        })
    }

    static updateUser(firstName: string, lastName: string, username: string, email: string): Promise<void> {
        return axios.put(`${import.meta.env.BACKEND_URL}/user`, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data
        })
    }

    static updatePassword(password: string): Promise<void> {
        return axios.put(`${import.meta.env.BACKEND_URL}/user/password`, {
            password: password
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data
        })
    }

    static deleteUser(): Promise<void> {
        return axios.delete(`${import.meta.env.BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data
        })
    }

}
