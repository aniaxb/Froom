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
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error fetching Outfits');
            }
        })
    }

    static getOutfitByUuId(uuid: string): Promise<Outfit> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/outfit/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error fetching Outfit');
            }
        })
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
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error creating Outfit');
            }
        })
    }

    static addItemToOutfit(outfitUuid: string, itemUuid: string): Promise<Outfit> {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/outfit/${outfitUuid}/item/${itemUuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error adding Item to Outfit');
            }
        })
    }

    static removeItemFromOutfit(outfitUuid: string, itemUuid: string): Promise<Outfit> {
        return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/outfit/${outfitUuid}/item/${itemUuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error removing Item from Outfit');
            }
        })

    }

    static updateOutfit(uuid: string, data: { name: string; items: string[]; }):  Promise<Outfit> {
        return axios.put(`${import.meta.env.VITE_BACKEND_URL}/outfit/${uuid}`, {
            name: data.name,
            items: data.items
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
                throw new Error('Error updating Outfit');
            }
        })
    }

    static deleteOutfit(uuid: string): Promise<void> {
        return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/outfit/${uuid}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error deleting Outfit');
            }
        })
    }

    static duplicateOutfit(uuid: string): Promise<Outfit> {
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/outfit/${uuid}/duplicate`, {},
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error duplicating Outfit');
            }
        })
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
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error fetching Outfit');
            }
        })

    }

    static getRandomOutfit(): Promise<Outfit> {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/outfit/random`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Error generating random Outfit');
            }
        })
    }
}
