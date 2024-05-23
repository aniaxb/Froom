import React, {useEffect, useState} from 'react';
import {ItemApi} from '../../../apis/ItemApi.ts';
import {Item} from '../../../model/Item.ts';
import {Category} from '../../../model/enums/Category.ts';
import {BodyPart} from '../../../model/enums/BodyPart.ts';
import {Button, Dialog, DialogBody, Input, Typography} from '@material-tailwind/react';
import {OutfitApi} from '../../../apis/OutfitApi.ts';
import {Outfit} from '../../../model/Outfit.ts';

interface ClothingItemsProps {
    activeBodyPart: string;
}

const ClothingItems: React.FC<ClothingItemsProps> = ({activeBodyPart: activeBodyPart}) => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newBodyPart, setNewBodyPart] = useState('');
    const [newColor, setNewColor] = useState(['']);
    const [outfits, setOutfits] = useState<Outfit[]>([]);

    useEffect(() => {
        fetchClothingItems();
    },[]);

    useEffect(() => {
        if (selectedItem) {
            setNewCategory(selectedItem?.category as string);
            setNewBodyPart(selectedItem?.bodyPart as string);
            setNewColor(selectedItem?.color as string[]);
        }
    }, [selectedItem]);

    const handleOpenDialog = () => {
        setIsItemDialogOpen(!isItemDialogOpen)
    }

    const fetchClothingItems = async () => {
        try {
            const response = await ItemApi.getAllItems();
            setItems(response);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchOutfits = async () => {
        OutfitApi.getAllOutfits().then(r => {
            setOutfits(r);
            console.log(r);
        }).catch(e => console.error(e));
    }

    const handleUpdateItem = async (uuid: string) => {
        const updatedCategory: Category = Category[newCategory.toUpperCase() as keyof typeof Category];
        const updatedBodyPart: BodyPart = BodyPart[newBodyPart.toUpperCase() as keyof typeof BodyPart];

        await ItemApi.updateItem(uuid, {
            category: updatedCategory,
            bodyPart: updatedBodyPart,
            color: newColor
        }).then(r => {
            fetchClothingItems();
            console.log(r)
        }).catch(e => console.error(e));
    }

    const handleUpdateItemImage = async (event: React.ChangeEvent<HTMLInputElement>, uuid: string) => {
        const file = event.target.files![0];
        try {
            await ItemApi.updateItemImage(file, uuid);
            await fetchClothingItems();
        }
        catch (error) {
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

    const getGridClassNames = () => {
        const baseClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4';
        return activeBodyPart === BodyPart.SHOES ? `${baseClasses} xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2` : `${baseClasses} xl:grid-cols-4`;
    };

    return (
        <>
            <div className="bg-gray-200 rounded-lg h-full overflow-y-scroll">
                <div className={getGridClassNames()}>
                    {activeBodyPart === 'OUTFITS' ? (
                        <div>Outfits</div>
                    ) : (
                        <>
                            {items.map(item => {
                                if (item.bodyPart === BodyPart[activeBodyPart.toUpperCase() as keyof typeof BodyPart]) {
                                    return (
                                        <div key={item.uuid} className="relative" onClick={() => {
                                            setSelectedItem(item);
                                            setIsItemDialogOpen(!isItemDialogOpen);
                                        }}>
                                            <div className="group">
                                                <img
                                                    src={`data:image/jpeg;base64,${item.image}`}
                                                    alt="clothing item"
                                                    className="w-full h-auto rounded-lg shadow-lg"
                                                />
                                                <div
                                                    className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <p>{item.category}</p>
                                                    <p>{item.bodyPart}</p>
                                                    <p>{item.color.join(', ')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </>
                        )}
                </div>
            </div>
            {selectedItem && (
                <Dialog open={isItemDialogOpen} handler={handleOpenDialog}>
                    <DialogBody>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-scroll max-h-[40rem] lg:overflow-y-hidden pr-4 lg:pr-0">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <img
                                    src={`data:image/jpeg;base64,${selectedItem.image}`}
                                    alt="clothing item"
                                    className="h-[18rem] lg:w-full lg:h-auto rounded-lg shadow-lg"
                                />
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg"
                                    onChange={(e) => handleUpdateItemImage(e, selectedItem.uuid)}
                                    id="image-input"
                                    hidden
                                />
                                <label htmlFor="image-input" className="w-full flex justify-center">
                                    <div
                                        className="shadow-lg bg-indigo-300 text-white py-3 px-6 rounded-lg w-full text-center text-xs hover:shadow-indigo-100 hover:cursor-pointer">
                                        CLICK TO CHANGE IMAGE
                                    </div>
                                </label>
                            </div>
                            <div className="flex flex-col justify-between items-center gap-8">
                                <Typography variant="h3" className="text-blue-gray-800">Update item</Typography>
                                <Input type="text" label="Category"
                                       value={newCategory}
                                       onChange={(e) => {setNewCategory(e.target.value)}}
                                />
                                <Input type="text" label="Body Part"
                                       value={newBodyPart}
                                       onChange={(e) => {setNewBodyPart(e.target.value)}}
                                />
                                <Input type="text" label="Color"
                                       value={selectedItem.color.join(', ')}
                                       onChange={(e) => {setNewColor(e.target.value.split(','))}}
                                />
                                <Button className="w-full bg-teal-400"
                                        onClick={() => handleUpdateItem(selectedItem?.uuid)}>Update Item</Button>
                                <Button className="w-full" color="red" onClick={() => handleDeleteItem(selectedItem.uuid)}>Delete Item</Button>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            )}
        </>

    );
}

export default ClothingItems
