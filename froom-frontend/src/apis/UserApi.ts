import axios from 'axios';
import {User} from '../model/User.ts';

export class UserApi {
    static registerUser(firstName: string, lastName: string, username: string, email: string, password: string): Promise<void> {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        }).then(response => {
            return response.data
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error registering User');
            }
        })
    }

    static async getUser(): Promise<User> {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }

    static updateUser(firstName: string, lastName: string, username: string, email: string): Promise<void> {
        return axios.put(`${import.meta.env.VITE_BACKEND_URL}/user`, {
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
        }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error('Error updating User');
                }
            })
    }

    static updatePassword(oldPassword: string, newPassword: string, newPasswordConfirmation: string): Promise<void> {
        return axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/password`, {
            oldPassword: oldPassword,
            newPassword: newPassword,
            newPasswordConfirmation: newPasswordConfirmation
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error updating password');
            }
        })

    }

    static deleteUser(): Promise<void> {
        return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error deleting User');
            }
        })
    }

}
