import BodyPartMenu from './CategoryMenu/BodyPartMenu.tsx';
import ClothingItems from './ClothingItems/ClothingItems.tsx';
import FilterSortAddItem from './FilterMenu/FilterSortAddItem.tsx';
import NavBar from '../NavBar/NavBar.tsx';
import {useState} from 'react';
import {BodyPart} from '../../model/enums/BodyPart.ts';

const Wardrobe = () => {

const [activeBodyPart, setActiveBodyPart] = useState<string>(BodyPart.TOP);

const handleBodyPartClick = (bodyPart: string) => {
    setActiveBodyPart(bodyPart);
};

return (
    <>
        <div className="min-h-screen flex flex-col w-screen">
            <NavBar/>
            <div className='flex flex-row w-full py-4 md:py-10 px-4 lg:px-10 grow'>
                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[10rem]'>
                    <BodyPartMenu activeBodyPart={activeBodyPart} handleBodyPartClick={handleBodyPartClick}/>
                </div>
                <div className='grow flex justify-center items-center'>
                    <div className='flex flex-col h-full w-full pl-4 lg:pl-10'>
                        <div className="grow-0 w-full">
                            <FilterSortAddItem activeBodyPart={activeBodyPart}/>
                        </div>
                        <div className="grow mt-6">
                            <ClothingItems activeBodyPart={activeBodyPart}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        );
}

        export default Wardrobe;
