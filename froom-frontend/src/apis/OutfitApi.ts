import axios from 'axios';
import {Outfit} from '../model/Outfit.ts';

export class OutfitApi {
    static getAllOutfits(): Promise<Outfit[]> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/outfit`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static getOutfitByUuId(uuid: string): Promise<Outfit> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/outfit/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static createOutfit(name: string, itemUuids: string[]): Promise<Outfit> {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/outfit`, {
            name: name,
            itemUuids: itemUuids
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static addItemToOutfit(outfitUuid: string, itemUuid: string): Promise<Outfit> {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/outfit/${outfitUuid}/item/${itemUuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static removeItemFromOutfit(outfitUuid: string, itemUuid: string): Promise<Outfit> {
        return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/outfit/${outfitUuid}/item/${itemUuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static updateOutfit(name: string, items: string[]): Promise<Outfit> {
        return axios.put(`${import.meta.env.VITE_BACKEND_URL}/outfit`, {
            name: name,
            items: items
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static deleteOutfit(uuid: string): Promise<void> {
        return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/outfit/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static getOuftfitByName(name: string): Promise<Outfit> {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/outfit/filter`, {
            names: name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }

    static getRandomOutfit(): Promise<Outfit> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/outfit/random`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        });
    }
}
