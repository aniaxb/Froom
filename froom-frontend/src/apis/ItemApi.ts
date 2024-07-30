import axios from 'axios';
import {Item} from '../model/Item.ts';
import {Category} from '../model/enums/Category.ts';
import {BodyPart} from '../model/enums/BodyPart.ts';

const BACKEND_URL='http://localhost:8080'

type ItemResponse = {
    uuid: string,
    category: Category,
    bodyPart: BodyPart,
    color: string[],
    image: string,
}

export class ItemApi {

    static getAllItems(): Promise<Item[]> {
        return axios.get(`${BACKEND_URL}/item`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error fetching Items');
            }
        })
    }

    static getItemByUuId(uuid: string): Promise<Item> {
        return axios.get(`${BACKEND_URL}/item/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error fetching Item');
            }
        })
    }

    static async createItem(file: File): Promise<ItemResponse> {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/item/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error creating Item');
            }
        })
        return response.data;
    }

    static async createItemWithoutDataAnalysis(file: File): Promise<ItemResponse> {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/item/create/without-data-analysis`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error creating Item');
            }
        })
        return response.data;
    }

    static updateItem(uuid: string, data: { category: Category; bodyPart: BodyPart; color: string[]; }): Promise<Item> {
        return axios.put(`${import.meta.env.VITE_BACKEND_URL}/item/${uuid}`, {
            category: data.category.toString(),
            bodyPart: data.bodyPart.toString(),
            color: data.color,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error updating Item');
            }
        })
    }

    static updateItemImage(file: File, uuid: string): Promise<void> {
        const formData = new FormData();
        formData.append('image', file);

        return axios.put(`${import.meta.env.VITE_BACKEND_URL}/item/${uuid}/image`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error updating Item image');
            }
        })
    }

    static deleteItem(uuid: string): Promise<void> {
        return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/item/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error deleting Item');
            }
        })
    }

    static getItemsByFilter(category?: string | undefined, bodyPart?: string, color?: string): Promise<Item[]> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/item/filter`, {
            params: {
                category: category?.toUpperCase(),
                bodyPart: bodyPart,
                color: color
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error fetching Item');
            }
        })
    }

}
