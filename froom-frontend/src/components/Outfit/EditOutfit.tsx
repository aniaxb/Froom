import React, {useEffect, useState} from 'react';

import { Item } from '../../model/Item';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography} from '@material-tailwind/react';
import {OutfitApi} from '../../apis/OutfitApi.ts';
import OutfitItems from './OutfitItems.tsx';
import {toast} from 'react-hot-toast';
import {Outfit} from '../../model/Outfit.ts';

interface EditOutfitProps {
    isEditOutfitDialogOpen: boolean;
    handleOpenEditOutfitDialog: (outfit: Outfit | undefined) => void;
    uuid: string;
    onOutfitUpdated: () => void;
}

const EditOutfit: React.FC<EditOutfitProps> =  ({
                                                         isEditOutfitDialogOpen: isEditOutfitDialogOpen,
                                                         handleOpenEditOutfitDialog: handleOpenEditOutfitDialog,
                                                         uuid: outfitUuid,
                                                         onOutfitUpdated
                                                     }) => {
    const [selectedItems, setSelectedItems] = useState<{
        top?: Item;
        bottom?: Item;
        shoes?: Item;
        accessory?: Item;
    }>({});
    const [outfit, setOutfit] = useState<Outfit>();
    const [outfitName, setOutfitName] = useState('');
    const [outfitItems, setOutfitItems] = useState<string[]>([]);

    useEffect(() => {
        fetchOutfitData();
    }, []);

    const handleItemSelect = (item: Item) => {
        const bodyPart = item.bodyPart.toLowerCase() as keyof typeof selectedItems;

        if (bodyPart in selectedItems) {
            setOutfitItems(prevItems => prevItems.map(prevUuid =>
                prevUuid === selectedItems[bodyPart]!.uuid ? item.uuid : prevUuid
            ));
        } else {
            setOutfitItems(prevItems => [...prevItems, item.uuid]);
        }

        setSelectedItems(prevItems => ({
            ...prevItems,
            [bodyPart]: item,
        }));
    };

    const handleUpdateOutfitRequest = () => {
        OutfitApi.updateOutfit(outfitUuid, {name: outfitName, items: outfitItems}).then(response => {
            console.log(response);
            onOutfitUpdated();
            handleOpenEditOutfitDialog(outfit);
            toast.success('Outfit updated');
        }).catch(error => {
            console.error(error);
            toast.error('Error updating outfit');
        })
    }

    const handleCancel = () => {
        handleOpenEditOutfitDialog(outfit);
    }

    const fetchOutfitData = async () => {
        OutfitApi.getOutfitByUuId(outfitUuid).then(r => {
            setOutfit(r);
            setSelectedItems({
                top: r.items.find(item => item.bodyPart === 'TOP'),
                bottom: r.items.find(item => item.bodyPart === 'BOTTOM'),
                shoes: r.items.find(item => item.bodyPart === 'SHOES'),
                accessory: r.items.find(item => item.bodyPart === 'ACCESSORY'),
            });
            setOutfitItems(r.items.map(item => item.uuid));
            setOutfitName(r.name);
        })
    }

    const handleDeleteOutfit = async (uuid: string) => {
        try {
            await OutfitApi.deleteOutfit(uuid);
            handleOpenEditOutfitDialog(outfit);
            onOutfitUpdated();
            toast.success('Outfit deleted');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting outfit');
        }
    }

    const handleDuplicateOutfit = async (uuid: string) => {
        try {
            await OutfitApi.duplicateOutfit(uuid);
            handleOpenEditOutfitDialog(outfit);
            onOutfitUpdated();
            toast.success('Outfit duplicated');
        } catch (error) {
            console.error(error);
            toast.error('Error duplicating outfit');
        }
    }

    return (
        <Dialog size={'xl'} open={isEditOutfitDialogOpen} handler={handleOpenEditOutfitDialog}
                aria-labelledby="edit-outfit-dialog-title"
                aria-describedby="edit-outfit-dialog-description">
            <DialogHeader className="flex justify-center">
                <Typography id="edit-outfit-dialog-title" className='text-3xl font-black'>Edit Outfit</Typography>
            </DialogHeader>
            <DialogBody id="edit-outfit-dialog-description">
                <div className='flex flex-row gap-8 justify-evenly'>
                    <div className='grow flex flex-row gap-8 justify-center items-center'>
                        <div className='w-40 h-40 border-2 border-gray-300 rounded-lg flex justify-center items-center'>
                            {selectedItems.accessory ? (
                                <img src={`data:image/jpeg;base64,${selectedItems.accessory.image}`} alt="Accessory"
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
                    <Button className='bg-indigo-300 grow' onClick={handleCancel}>Cancel</Button>
                    <Button className='bg-red-600 grow' onClick={() => handleDeleteOutfit(outfitUuid)}>Delete
                        Outfit</Button>
                    <Button className='bg-light-blue-600 grow' onClick={() => handleDuplicateOutfit(outfitUuid)}>Duplicate
                        Outfit</Button>
                    <Button className='bg-darkcyan grow' onClick={handleUpdateOutfitRequest}>Update Outfit</Button>
                </div>
            </DialogFooter>
        </Dialog>
    );
};

export default EditOutfit;
