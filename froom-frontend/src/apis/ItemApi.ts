import axios from 'axios';
import {Item} from '../model/Item.ts';
import {Category} from '../model/enums/Category.ts';
import {BodyPart} from '../model/enums/BodyPart.ts';

export class ItemApi {

    static getAllItems(): Promise<Item[]> {
        return axios.get(`${import.meta.env.BACKEND_URL}/item`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static getItemByUuId(uuid: string): Promise<Item> {
        return axios.get(`${import.meta.env.BACKEND_URL}/item/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static createItem(file: File): Promise<void> {
        const formData = new FormData();
        formData.append('image', file);

        return axios.post(`${import.meta.env.BACKEND_URL}/item/create`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        });
    }

    static createItemWithoutDataAnalysis(file: File): Promise<void> {
        const formData = new FormData();
        formData.append('image', file);

        return axios.post(`${import.meta.env.BACKEND_URL}/item/create/without-data-analysis`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        });
    }

    static updateItem(uuid: string, data: { category: Category; bodyPart: BodyPart; color: string[]; }): Promise<Item> {
        return axios.put(`${import.meta.env.BACKEND_URL}/item/${uuid}`, {
            category: data.category,
            bodyPart: data.bodyPart,
            color: data.color,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static updateItemImage(file: File, uuid: string): Promise<void> {
        const formData = new FormData();
        formData.append('image', file);

        return axios.put(`${import.meta.env.BACKEND_URL}/item/${uuid}/image`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        });
    }

    static deleteItem(uuid: string): Promise<void> {
        return axios.delete(`${import.meta.env.BACKEND_URL}/item/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static getItemsByFilter(category?: Category, bodyPart?: BodyPart, color?: string[]): Promise<Item[]> {
        return axios.get(`${import.meta.env.BACKEND_URL}/item/filter`, {
            params: {
                category: category,
                bodyPart: bodyPart,
                color: color
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

}
