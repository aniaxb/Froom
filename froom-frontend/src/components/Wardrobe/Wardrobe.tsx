import CategoryMenu from "./CategoryMenu/CategoryMenu.tsx";
import ClothingItems from "./ClothingItems/ClothingItems.tsx";
import FilterSortAddItem from "./FilterMenu/FilterSortAddItem.tsx";

const Wardrobe = () => (
    <>
        <div className='flex flex-row w-full py-4 px-10'>
            <div className='w-28 grow-0'>
                <CategoryMenu/>
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
    </>
);

export default Wardrobe;
