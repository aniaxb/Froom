import {SetStateAction, useState} from 'react';

const BodyPartMenu = () => {

    const [activeCategory, setActiveCategory] = useState('upper');

    const handleCategoryClick = (category: SetStateAction<string>) => {
        setActiveCategory(category);
    };

    return (
        <>
            <div id='bodypart' className='flex flex-col justify-between h-full'>
                <div
                    id='categoryIcon'
                    onClick={() => handleCategoryClick('upper')}
                    className={`bg-${activeCategory === 'upper' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/tshirt icon.png"
                         alt="Upper clothes category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleCategoryClick('bottom')}
                    className={`bg-${activeCategory === 'bottom' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/pants icon.png"
                         alt="Bottom clothes category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleCategoryClick('shoes')}
                    className={`bg-${activeCategory === 'shoes' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/shoe icon.png" alt="Shoes category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleCategoryClick('accessory')}
                    className={`bg-${activeCategory === 'accessory' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/bag icon.png" alt="Accessory category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleCategoryClick('outfits')}
                    className={`bg-${activeCategory === 'outfits' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/outfit icon.png" alt="Outfits category"/>
                </div>
            </div>
        </>
    );
}

export default BodyPartMenu;
