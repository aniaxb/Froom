
const CategoryMenu = () => {
    return (
        <>
            <div className='flex flex-col gap-2'>
                <div className='bg-tearose rounded-lg flex justify-center items-center'>
                    <img className='p-2' src="/src/assets/clothingItems/tshirt icon.png" alt="tshirt" />
                </div
                ><div className='bg-gray-200 rounded-lg flex justify-center items-center'>
                    <img className='p-2' src="/src/assets/clothingItems/pants icon.png" alt="tshirt" />
                </div>
                <div className='bg-gray-200 rounded-lg flex justify-center items-center'>
                    <img className='p-2' src="/src/assets/clothingItems/shoe icon.png" alt="tshirt" />
                </div>
                <div className='bg-gray-200 rounded-lg flex justify-center items-center'>
                    <img className='p-2' src="/src/assets/clothingItems/bag icon.png" alt="tshirt" />
                </div>
                <div className='bg-gray-200 rounded-lg flex justify-center items-center'>
                    <img className='p-2' src="/src/assets/clothingItems/outfit icon.png" alt="tshirt" />
                </div>
            </div>
        </>
    );
}

export default CategoryMenu;