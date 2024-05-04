import {User} from './User.ts';

export interface AuthToken {
    expiresIn: string;
    token: string;
    refresh?: string;
    user?: User;
}
