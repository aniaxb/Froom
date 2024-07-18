import React, {useEffect, useState} from 'react';
import {ItemApi} from '../../../apis/ItemApi.ts';
import {Item} from '../../../model/Item.ts';
import {Category} from '../../../model/enums/Category.ts';
import {BodyPart} from '../../../model/enums/BodyPart.ts';
import {
    Button,
    Checkbox,
    Dialog,
    DialogBody, DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select,
    Typography
} from '@material-tailwind/react';
import {OutfitApi} from '../../../apis/OutfitApi.ts';
import {Outfit} from '../../../model/Outfit.ts';
import {toast} from 'react-hot-toast';
import OutfitCreator from '../../Outfit/OutfitCreator.tsx';
import EditOutfit from '../../Outfit/EditOutfit.tsx';
import {CategoryApi} from '../../../apis/CategoryApi.ts';

interface ClothingItemsProps {
    activeBodyPart: string;
}

const ClothingItems: React.FC<ClothingItemsProps> = ({activeBodyPart: activeBodyPart}) => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
    const [newCategory, setNewCategory] = useState<string | undefined>('');
    const [newBodyPart, setNewBodyPart] = useState<string | undefined>('');
    const [newColor, setNewColor] = useState(['']);
    const [outfits, setOutfits] = useState<Outfit[]>([]);
    const [selectedOutfit, setSelectedOutfit] = useState<Outfit | undefined | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedColor, setSelectedColor] = useState<string>();

    const [openDialog, setOpenDialog] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState<string | undefined>(Category.TSHIRT.toUpperCase());
    const [bodyPart, setBodyPart] = useState<string | undefined>(BodyPart.TOP);
    const [color, setColor] = useState(['']);
    const [uuid, setUuid] = useState('');

    const [isAddOutfitDialogOpen, setIsAddOutfitDialogOpen] = useState(false);
    const [isEditOutfitDialogOpen, setIsEditOutfitDialogOpen] = useState(false);
    const [filterColors, setFilterColors] = useState<string[]>([]);
    const [bodyPartCategories, setBodyPartCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchAllColorsFromItems();
        fetchClothingItems();
        fetchOutfits();
    }, []);

    useEffect(() => {
        const fetchBodyPartCategories = async () => {
            try {
                const categoriesFromApi = await CategoryApi.getBodyPartCategories(BodyPart[activeBodyPart.toUpperCase() as keyof typeof BodyPart]);
                const categories = categoriesFromApi.map(categoryString => Category[categoryString.toUpperCase() as keyof typeof Category]);

                setBodyPartCategories(categories);

            } catch (error) {
                console.error('Error fetching body part categories:', error);
            }
        };

        if (activeBodyPart) {
            fetchBodyPartCategories();
        }
    }, [activeBodyPart]);

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

    const handleOutfitUpdated = () => {
        fetchOutfits();
        setIsEditOutfitDialogOpen(false);
        setSelectedOutfit(null);
    };

    const handleUpdateItem = async (uuid: string) => {
        const updatedCategory: Category = Category[newCategory?.toUpperCase() as keyof typeof Category];
        const updatedBodyPart: BodyPart = BodyPart[newBodyPart?.toUpperCase() as keyof typeof BodyPart];

        await ItemApi.updateItem(uuid, {
            category: updatedCategory,
            bodyPart: updatedBodyPart,
            color: newColor
        }).then(r => {
            fetchClothingItems();
            fetchAllColorsFromItems();
            console.log(r);
            handleOpenDialog();
            toast.success('Item updated');
        }).catch(e => {
            console.error(e);
            toast.error('Error updating item');
        });
    }

    const handleUpdateItemImage = async (event: React.ChangeEvent<HTMLInputElement>, uuid: string) => {
        const file = event.target.files![0];
        try {
            await ItemApi.updateItemImage(file, uuid);
            handleOpenDialog();
            await fetchClothingItems();
            toast.success('Image updated');
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleDeleteItem = async (uuid: string) => {
        try {
            await ItemApi.deleteItem(uuid);
            handleOpenDialog();
            await fetchClothingItems();
            toast.success('Item deleted');
            } catch (error) {
                console.error(error);
                toast.error('Error deleting item');
            }
    }

    const getGridClassNames = () => {
        const baseClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4';

        if (activeBodyPart === BodyPart.SHOES) {
            return `${baseClasses} xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2`;
        }

        if (activeBodyPart === 'OUTFITS') {
            return `${baseClasses} xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-8`;
        }

        return `${baseClasses} xl:grid-cols-4`;
    };

    const handleFilterItems = () => {
        if (selectedCategory || selectedColor) {
            const filterCategory: Category = Category[selectedCategory?.toUpperCase() as keyof typeof Category];
            ItemApi.getItemsByFilter(filterCategory, activeBodyPart, selectedColor)
                .then(r => {
                    setItems(r);
                })
                .catch(e => console.error(e));
        }
    };

    const fetchAllColorsFromItems = () => {
        ItemApi.getAllItems()
            .then(response => {
                const allColors = response.flatMap(item => item.color);

                const uniqueColors = Array.from(new Set(allColors.map(color => String(color))));

                setFilterColors(uniqueColors);
            })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    };

    const handleOpen = () => setOpenDialog(!openDialog);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        if (isCheckboxChecked) {
            handleAddItemWithDataAnalysis(file);
        } else {
            handleAddItemWithoutDataAnalysis(file);
        }
    };

    const handleAddItemWithoutDataAnalysis = (file: File) => {
        ItemApi.createItemWithoutDataAnalysis(file).then(response => {
            console.log(response);
            setImage(response.image);
            setCategory(response.category);
            setBodyPart(response.bodyPart);
            setColor(response.color);
            setUuid(response.uuid);
            toast.success('Image uploaded successfully');
        }).catch(error => {
            console.error(error);
            toast.error('Failed to upload image');
        });
    };

    const handleAddItemWithDataAnalysis = (file: File) => {
        toast.promise(
            ItemApi.createItem(file)
                .then(response => {
                    console.log(response);
                    setImage(response.image);
                    setCategory(response.category);
                    setBodyPart(response.bodyPart);
                    setColor(response.color);
                    setUuid(response.uuid);
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                }),
            {
                loading: 'Analyzing image...',
                success: 'Image analyzed successfully!',
                error: 'Failed to analyze image',
            }
        ).then(r => console.log(r));
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColors = event.target.value.split(',');
        setColor(newColors);
    };

    const handleUpdateItemRequest = (id: string) => {
        const updatedCategory: Category = Category[category?.toUpperCase() as keyof typeof Category];
        const updatedBodyPart: BodyPart = BodyPart[bodyPart?.toUpperCase() as keyof typeof BodyPart];
        ItemApi.updateItem(id, {
            category: updatedCategory,
            bodyPart: updatedBodyPart,
            color: color
        }).then(response => {
            console.log(response);
            toast.success('Item updated');
        }).catch(error => {
            console.error(error);
            toast.error('Error updating item');
        });
    };

    const handleClear = () => {
        setCategory('');
        setBodyPart('');
        setColor(['']);
        setImage('');
    };

    const handleOpenAddOutfitDialog = () => {
        setIsAddOutfitDialogOpen(!isAddOutfitDialogOpen);
    };

    const handleOpenEditOutfitDialog = (outfit: Outfit | undefined) => {
        setSelectedOutfit(outfit);
        setIsEditOutfitDialogOpen(!isEditOutfitDialogOpen);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedColor('');
        fetchClothingItems();
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 w-full justify-between items-stretch mb-6">
                <div className='grow'>
                    <Select
                        variant="outlined"
                        label="Filter by categories"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e as string)}
                    >
                        {bodyPartCategories.map((category) => (
                            <Option key={category} value={category}>{category}</Option>
                        ))}
                    </Select>
                </div>
                <div className='grow'>
                    <Select
                        label="Filter by colors"
                        value={selectedColor}
                        onChange={(value) => setSelectedColor(value as string)}
                        selected={(element) =>
                            element &&
                            React.cloneElement(element, {
                                disabled: true,
                                className:
                                    'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
                            })
                        }
                    >
                        {filterColors.map((color) => (
                            <Option key={color} value={color} className="flex items-center gap-2">
            <span
                className='h-5 w-5 rounded-full'
                style={{ backgroundColor: color }}
            />
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className='grow'>
                    <Button
                        variant="gradient"
                        className="capitalize w-full"
                        onClick={handleFilterItems}
                    >
                        Filter
                    </Button>
                </div>
                <div className='grow'>
                    <Button
                        className="capitalize w-full bg-teal-500"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                </div>
                <div className='grow'>
                    <Button onClick={handleOpen}
                            className="grow bg-brown-200 flex text-center items-center gap-2 font-normal capitalize tracking-normal w-full justify-center">
                        Add Item{' '}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </Button>
                </div>
                <div>
                    {activeBodyPart === 'OUTFITS' && (
                        <div className="flex flex-row w-full justify-center items-center grow">
                            <Button
                                variant="gradient"
                                className="capitalize lg:w-28 w-full"
                                onClick={handleOpenAddOutfitDialog}
                            >
                                Add outfit
                            </Button>
                        </div>
                    )}
                </div>
                <Dialog open={openDialog} handler={handleOpen} size="lg">
                    <DialogHeader>
                        <div className='flex w-full justify-center'>
                            <Typography className='text-3xl font-black'>Add New Item</Typography>
                        </div>
                    </DialogHeader>
                    <DialogBody>
                        <div className='flex flex-col gap-2 justify-center items-center mb-4'>
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg"
                                onChange={handleImageChange}
                                id="image-input"
                                capture="environment"
                                hidden
                            />
                            <label htmlFor="image-input" className="w-2/3 flex justify-center">
                                <div
                                    className="shadow-lg bg-indigo-300 text-white py-2 rounded-lg w-full text-center hover:shadow-indigo-100 hover:cursor-pointer">
                                    Select Image
                                </div>
                            </label>
                            <Typography variant='small'>Choose image from file explorer or gallery</Typography>
                            <Checkbox label="Turn on data analysis" className="pb-0" checked={isCheckboxChecked}
                                      onChange={(e) => setIsCheckboxChecked(e.target.checked)}/>
                        </div>
                        <div
                            className='flex flex-col lg:flex-row lg:justify-center gap-4 w-full justify-center items-center'>
                            <div className='w-3/4 lg:w-1/3'>
                                {image ? <img src={`data:image/jpeg;base64,${image}`}
                                              className='rounded-md'
                                              alt="Selected image"/> :
                                    <div className="flex justify-center items-center h-full">Select an image first to
                                        see the preview</div>}
                            </div>
                            <div className="flex flex-col justify-center gap-8 w-3/4 lg:w-1/3">
                                <Select
                                    variant='outlined'
                                    label='Select Category'
                                    value={category}
                                    onChange={(value) => setCategory(value)}
                                >
                                    {Object.keys(Category).map((category) => (
                                        <Option key={category} value={category}>{category}</Option>
                                    ))}
                                </Select>
                                <Select
                                    variant='outlined'
                                    label='Select BodyPart'
                                    value={bodyPart}
                                    onChange={v => setBodyPart(v)}
                                >
                                    {Object.keys(BodyPart).map((bodyPart) => (
                                        <Option key={bodyPart} value={bodyPart}>{bodyPart}</Option>
                                    ))}
                                </Select>
                                <Input label='Color' value={color.join(',')}
                                       onChange={handleColorChange}/>
                                <Button onClick={handleClear}>Clear Inputs</Button>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className='flex flex-row gap-4 mt-4 pt-2 justify-center items-center w-full'>
                        <div className="w-1/3">
                            <Button className='bg-lightblue w-full'
                                    onClick={() => {
                                        handleUpdateItemRequest(uuid);
                                        fetchClothingItems();
                                        handleOpen();
                                    }}>
                                Update
                            </Button>
                        </div>
                        <div className="w-1/3">
                            <Button onClick={() => {
                                handleOpen();
                                fetchClothingItems();
                            }} className='mr-1 bg-red-500 w-full'>
                                Close
                            </Button>
                        </div>
                    </DialogFooter>
                </Dialog>
                <OutfitCreator isAddOutfitDialogOpen={isAddOutfitDialogOpen}
                               handleOpenAddOutfitDialog={handleOpenAddOutfitDialog}
                               onOutfitUpdated={handleOutfitUpdated}/>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-y-scroll max-h-[28rem] md:max-h-[30rem] lg:max-h-[40rem] xl:max-h-[44rem] flex-grow">
                <div className={getGridClassNames()}>
                    {activeBodyPart === 'OUTFITS' ? (
                        <>
                            {outfits.map(outfit => (
                                <div key={outfit.uuid} className="relative group" onClick={() => {
                                    handleOpenEditOutfitDialog(outfit);
                                }}>
                                    <div
                                        className="flex flex-row justify-center items-center gap-4 p-4 border-2 border-gray-300 rounded-lg">
                                        <div
                                            className="w-24 h-24 border-2 border-gray-300 rounded-lg flex justify-center items-center bg-white">
                                            {outfit.items.find(item => item.bodyPart === 'ACCESSORY') ? (
                                                <img
                                                    src={`data:image/jpeg;base64,${outfit.items.find(item => item.bodyPart === 'ACCESSORY')?.image}`}
                                                    alt="Accessory"
                                                    className="w-full h-full object-contain rounded-lg"
                                                />
                                            ) : (
                                                'Accessory'
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div
                                                className="w-24 h-24 border-2 border-gray-300 rounded-lg flex justify-center items-center bg-white">
                                                {outfit.items.find(item => item.bodyPart === 'TOP') ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${outfit.items.find(item => item.bodyPart === 'TOP')?.image}`}
                                                        alt="Top"
                                                        className="w-full h-full object-contain rounded-lg"
                                                    />
                                                ) : (
                                                    'Top'
                                                )}
                                            </div>
                                            <div
                                                className="w-24 h-24 border-2 border-gray-300 rounded-lg flex justify-center items-center bg-white">
                                                {outfit.items.find(item => item.bodyPart === 'BOTTOM') ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${outfit.items.find(item => item.bodyPart === 'BOTTOM')?.image}`}
                                                        alt="Bottom"
                                                        className="w-full h-full object-contain rounded-lg"
                                                    />
                                                ) : (
                                                    'Bottom'
                                                )}
                                            </div>
                                            <div
                                                className="w-24 h-24 border-2 border-gray-300 rounded-lg flex justify-center items-center bg-white">
                                                {outfit.items.find(item => item.bodyPart === 'SHOES') ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${outfit.items.find(item => item.bodyPart === 'SHOES')?.image}`}
                                                        alt="Shoes"
                                                        className="w-full h-full object-contain rounded-lg"
                                                    />
                                                ) : (
                                                    'Shoes'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="absolute bottom-0 rounded-b-lg left-0 w-full bg-black bg-opacity-50 text-white py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Typography>{outfit.name}</Typography>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {items
                                .filter(item => item.bodyPart === BodyPart[activeBodyPart.toUpperCase() as keyof typeof BodyPart])
                                .map(item => (
                                    <div key={item.uuid} className="relative" onClick={() => {
                                        setSelectedItem(item);
                                        setIsItemDialogOpen(!isItemDialogOpen);
                                    }}>
                                        <div className="group relative">
                                            <img
                                                src={`data:image/jpeg;base64,${item.image}`}
                                                alt="clothing item"
                                                className="w-full h-auto rounded-lg shadow-lg"
                                            />
                                            <div
                                                className="absolute bottom-0 rounded-b-lg left-0 w-full bg-black bg-opacity-50 text-white py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <p>{item.category}</p>
                                                <p>{item.bodyPart}</p>
                                                <p>{item.color.join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    )}
                </div>
            </div>
            {selectedItem && (
                <Dialog open={isItemDialogOpen} handler={handleOpenDialog}>
                    <DialogBody>
                        <div
                            className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-scroll max-h-[40rem] lg:overflow-y-hidden pr-4 lg:pr-0">
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
                                <Select
                                    variant='outlined'
                                    label='Select Category'
                                    value={newCategory}
                                    onChange={(val) => setNewCategory(val)}
                                >
                                    {Object.keys(Category).map((category) => (
                                        <Option key={category} value={category}>{category}</Option>
                                    ))}
                                </Select>
                                <Select
                                    variant='outlined'
                                    label='Select BodyPart'
                                    value={newBodyPart}
                                    onChange={(val) => setNewBodyPart(val)}
                                >
                                    {Object.keys(BodyPart).map((bodyPart) => (
                                        <Option key={bodyPart} value={bodyPart}>{bodyPart}</Option>
                                    ))}
                                </Select>
                                <Input type="text" label="Color"
                                       value={newColor}
                                       onChange={(e) => {
                                           const colors = e.target.value.replace(/\s/g, '').split(',');
                                           setNewColor(colors);
                                       }}
                                />
                                <Button className="w-full bg-teal-400"
                                        onClick={() => handleUpdateItem(selectedItem?.uuid)}>Update Item</Button>
                                <Button className="w-full" color="red"
                                        onClick={() => handleDeleteItem(selectedItem.uuid)}>Delete Item</Button>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            )}
            {selectedOutfit && (
                <EditOutfit uuid={selectedOutfit.uuid}
                            isEditOutfitDialogOpen={isEditOutfitDialogOpen}
                            handleOpenEditOutfitDialog={handleOpenEditOutfitDialog}
                            onOutfitUpdated={handleOutfitUpdated}/>
            )}
        </>
    );
}

export default ClothingItems
