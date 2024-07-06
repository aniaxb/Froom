import React, { useState } from 'react';

import { Item } from '../../model/Item';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography} from '@material-tailwind/react';
import {OutfitApi} from '../../apis/OutfitApi.ts';
import OutfitItems from './OutfitItems.tsx';

interface OutfitCreatorProps {
    isAddOutfitDialogOpen: boolean;
    handleOpenAddOutfitDialog: () => void;
}

const OutfitCreator: React.FC<OutfitCreatorProps> = ({isAddOutfitDialogOpen: isAddOutfitDialogOpen, handleOpenAddOutfitDialog: handleOpenAddOutfitDialog}) => {
    const [selectedItems, setSelectedItems] = useState<{
        top?: Item;
        bottom?: Item;
        shoes?: Item;
        accessory?: Item;
    }>({});
    const [outfitName, setOutfitName] = useState('');
    const [outfitItems, setOutfitItems] = useState<string[]>([]);

    const handleItemSelect = (item: Item) => {
        setSelectedItems((prevItems) => ({
            ...prevItems,
            [item.bodyPart.toLowerCase()]: item,
        }));
        setOutfitItems((prevItems) => [
            ...prevItems,
            item.uuid]
        );
    };

    const handleAddOutfitRequest = () => {
        OutfitApi.createOutfit(outfitName, outfitItems).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleCancel = () => {
        handleOpenAddOutfitDialog();
        setOutfitName('');
        setOutfitItems([]);
    }

    return (
        <Dialog size={'xl'} open={isAddOutfitDialogOpen} handler={handleOpenAddOutfitDialog}>
            <DialogHeader className="flex justify-center">
                <Typography className='text-3xl font-black'>Add New Outfit</Typography>
            </DialogHeader>
            <DialogBody>
                Mannequin
                <div className='flex flex-row gap-8 justify-evenly'>
                    <div className='grow flex flex-row gap-8 justify-center items-center'>
                        <div className='w-40 h-40 border-2 border-gray-300 rounded-lg flex justify-center items-center'>
                            {selectedItems.accessory ? (
                                <img src={selectedItems.accessory.image} alt="Accessory"
                                     className="w-full h-full object-contain"/>
                            ) : (
                                'Accessory'
                            )}
                        </div>
                        <div className='flex flex-col gap-8'>
                            <div
                                className='w-40 h-40 border-2 border-gray-300 rounded-lg flex justify-center items-center'>
                                {selectedItems.top ? (
                                    <img src={`data:image/jpeg;base64,${selectedItems.top.image}`} alt="Top"
                                         className="w-full h-full object-contain"/>
                                ) : (
                                    'Top'
                                )}
                            </div>
                            <div
                                className='w-40 h-40 border-2 border-gray-300 rounded-lg flex justify-center items-center'>
                                {selectedItems.bottom ? (
                                    <img src={`data:image/jpeg;base64,${selectedItems.bottom.image}`} alt="Bottom"
                                         className="w-full h-full object-contain"/>
                                ) : (
                                    'Bottom'
                                )}
                            </div>
                            <div
                                className='w-40 h-40 border-2 border-gray-300 rounded-lg flex justify-center items-center'>
                                {selectedItems.shoes ? (
                                    <img src={`data:image/jpeg;base64,${selectedItems.shoes.image}`} alt="Shoes"
                                         className="w-full h-full object-contain"/>
                                ) : (
                                    'Shoes'
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='grow'>
                        <OutfitItems onSelectItem={handleItemSelect}/>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <div className='flex flex-row gap-8 w-full justify-between'>
                    <div className='grow'>
                        <Input label='Outfit name'
                               value={outfitName}
                               onChange={(e) => setOutfitName(e.target.value)}/>
                    </div>
                    <Button color='red' className='grow' onClick={handleCancel}>Cancel</Button>
                    <Button className='bg-darkcyan grow' onClick={handleAddOutfitRequest}>Add Outfit</Button>
                </div>
            </DialogFooter>
        </Dialog>
    );
};

export default OutfitCreator;
