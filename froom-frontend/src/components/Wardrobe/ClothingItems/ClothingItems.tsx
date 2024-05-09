import {useEffect, useState} from 'react';
import {ItemApi} from '../../../apis/ItemApi.ts';
import {Item} from '../../../model/Item.ts';
import {Button} from '@material-tailwind/react';

const ClothingItems = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchClothingItems().then(r => console.log(r));
    }, []);

    const fetchClothingItems = async () => {
        try {
            const response = await ItemApi.getAllItems();
            setItems(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteItem = async (uuid: string) => {
        try {
            await ItemApi.deleteItem(uuid);
            await fetchClothingItems();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="bg-gray-200 rounded-lg h-full flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-auto max-h-[24rem] sm:max-h-[26rem] lg:max-h-[30rem] xl:max-h-[42rem] ">
                    {items.map(item => {
                        return (
                            <div key={item.uuid} className="">
                                <img
                                     src={`data:image/jpeg;base64,${item.image}`}
                                     alt="clothing item"/>
                                <div className="">
                                    <p>{item.category}</p>
                                    <p>{item.bodyPart}</p>
                                    <p>{item.color.join(', ')}</p>
                                </div>
                                <div>
                                    <Button color="red" onClick={() => handleDeleteItem(item.uuid)}>Delete Item</Button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </>
    );
}

export default ClothingItems
