import {Entity} from './Entity.ts';
import {Category} from './enums/Category.ts';
import {BodyPart} from './enums/BodyPart.ts';

export interface Item extends Entity {
    name: string;
    category: Category;
    bodyPart: BodyPart;
    color: string[];
    size: string;
    price: number;
    brand: string;
    image: string;
}
