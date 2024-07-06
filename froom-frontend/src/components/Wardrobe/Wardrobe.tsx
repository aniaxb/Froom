import BodyPartMenu from './CategoryMenu/BodyPartMenu.tsx';
import ClothingItems from './ClothingItems/ClothingItems.tsx';
import NavBar from '../NavBar/NavBar.tsx';
import {useEffect, useState} from 'react';
import {BodyPart} from '../../model/enums/BodyPart.ts';

const Wardrobe = () => {

const [activeBodyPart, setActiveBodyPart] = useState<string>(BodyPart.TOP);
    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        color: [] as string[],
    });

    const handleBodyPartClick = (bodyPart: string) => {
        setActiveBodyPart(bodyPart);
    };

    const handleFiltersChange = (filters: any) => {
        setSelectedFilters(filters);
    };

    useEffect(() => {
        handleFiltersChange(selectedFilters);
    }, [selectedFilters]);

return (
    <>
        <div className="min-h-screen flex flex-col w-screen">
            <NavBar/>
            <div className='flex flex-row w-full pt-4 pb-4 lg:pt-6 xl:py-10 px-4 lg:px-10 grow'>
                <div className='w-full md:w-1/2 lg:w-1/3 max-w-[10rem]'>
                    <BodyPartMenu activeBodyPart={activeBodyPart} handleBodyPartClick={handleBodyPartClick}/>
                </div>
                <div className='grow flex justify-center items-center'>
                    <div className='flex flex-col h-full w-full pl-4 lg:pl-10'>
                        <div className="grow flex flex-col">
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
