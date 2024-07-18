import { Category } from '../model/enums/Category';
import axios from 'axios';
import {BodyPart} from '../model/enums/BodyPart.ts';

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

    static getBodyParts(): Promise<Category[]> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/bodypart`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static async getBodyPartCategories(bodyPart: BodyPart): Promise<Category[]> {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/category/bodypart/${bodyPart}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }
}
