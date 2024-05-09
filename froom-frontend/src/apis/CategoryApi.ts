import { Category } from '../model/enums/Category';
import axios from 'axios';

export class CategoryApi {

    static getCategories(): Promise<Category[]> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/category`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static getBodyPartCategories(): Promise<Category[]> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/bodypart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }
}
