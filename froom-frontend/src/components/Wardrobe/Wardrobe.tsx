import BodyPartMenu from './CategoryMenu/BodyPartMenu.tsx';
import ClothingItems from './ClothingItems/ClothingItems.tsx';
import FilterSortAddItem from './FilterMenu/FilterSortAddItem.tsx';
import NavBar from '../NavBar/NavBar.tsx';

const Wardrobe = () => (
    <>
        <div className="min-h-screen flex flex-col w-screen">
            <NavBar/>
            <div className='flex flex-row w-full py-10 px-10 grow'>
                <div className=' grow-0'>
                    <BodyPartMenu/>
                </div>
                <div className='grow flex justify-center items-center'>
                    <div className='flex flex-col h-full w-full pl-10'>
                        <div className="grow-0 w-full">
                            <FilterSortAddItem/>
                        </div>
                        <div className="grow mt-6 w-full">
                            <ClothingItems/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        );

        export default Wardrobe;
