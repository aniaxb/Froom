import {Entity} from './Entity.ts';
import {Item} from './Item.ts';

export interface Outfit extends Entity {
    name: string;
    items: Item[];
}
