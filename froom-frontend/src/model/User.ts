import {Entity} from './Entity.ts';

export interface User extends Entity {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
