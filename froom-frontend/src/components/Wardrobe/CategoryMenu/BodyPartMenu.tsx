
interface BodyPartMenuProps {
    activeBodyPart: string;
    handleBodyPartClick: (category: string) => void;
}
const BodyPartMenu: React.FC<BodyPartMenuProps> = ({ activeBodyPart: activeBodyPart, handleBodyPartClick: handleBodyPartClick }) => {

    return (
        <>
            <div id='bodypart' className='flex flex-col justify-between h-full gap-2'>
                <div
                    id='categoryIcon'
                    onClick={() => handleBodyPartClick('TOP')}
                    className={`bg-${activeBodyPart === 'TOP' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/tshirt icon.png"
                         alt="Upper clothes category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleBodyPartClick('BOTTOM')}
                    className={`bg-${activeBodyPart === 'BOTTOM' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/pants icon.png"
                         alt="Bottom clothes category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleBodyPartClick('SHOES')}
                    className={`bg-${activeBodyPart === 'SHOES' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/shoe icon.png" alt="Shoes category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleBodyPartClick('ACCESSORY')}
                    className={`bg-${activeBodyPart === 'ACCESSORY' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/bag icon.png" alt="Accessory category"/>
                </div>
                <div
                    id='categoryIcon'
                    onClick={() => handleBodyPartClick('OUTFITS')}
                    className={`bg-${activeBodyPart === 'OUTFITS' ? 'tearose' : 'gray-200'} rounded-lg flex justify-center items-center cursor-pointer`}
                >
                    <img className='p-2 w-36' src="/src/assets/clothingItems/outfit icon.png" alt="Outfits category"/>
                </div>
            </div>
        </>
    );
}

export default BodyPartMenu;
