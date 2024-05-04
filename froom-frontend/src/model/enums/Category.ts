import {BodyPart} from './BodyPart.ts';

enum Category {
    TSHIRT = 'TShirt',
    TROUSERS = 'Trousers',
    PULLOVER = 'Pullover',
    DRESS = 'Dress',
    COAT = 'Coat',
    SANDALS = 'Sandals',
    SHIRT = 'Shirt',
    SNEAKERS = 'Sneakers',
    BAG = 'Bag',
    ANKLE_BOOTS = 'Ankle Boots',
    UNKNOWN = 'Unknown'
}

const categoryToBodyPart = new Map<Category, BodyPart>([
    [Category.TSHIRT, BodyPart.TOP],
    [Category.TROUSERS, BodyPart.BOTTOM],
    [Category.PULLOVER, BodyPart.TOP],
    [Category.DRESS, BodyPart.TOP],
    [Category.COAT, BodyPart.TOP],
    [Category.SANDALS, BodyPart.SHOES],
    [Category.SHIRT, BodyPart.TOP],
    [Category.SNEAKERS, BodyPart.SHOES],
    [Category.BAG, BodyPart.ACCESSORY],
    [Category.ANKLE_BOOTS, BodyPart.SHOES],
    [Category.UNKNOWN, BodyPart.UNKNOWN]
]);


export {Category, categoryToBodyPart};
