import {
    Button, Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography
} from '@material-tailwind/react';
import {useState} from 'react';
import {ItemApi} from '../../../apis/ItemApi.ts';
import {Category} from "../../../model/enums/Category.ts";
import {BodyPart} from "../../../model/enums/BodyPart.ts";


const FilterSortAddItem = () => {
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [openSortMenu, setOpenSortMenu] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [color, setColor] = useState(['']);
    const [uuid, setUuid] = useState('');

    const handleOpen = () => setOpenDialog(!openDialog);

    const filterItems = [
        {
            name: 'Color',
        },
        {
            name: 'Category',
        },
        {
            name: 'Size',
        },
    ];
    const sortItems = [
        {
            name: 'Price',
        },
        {
            name: 'Category',
        },
        {
            name: 'Size',
        },
    ];

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
            if (isCheckboxChecked) {
                handleAddItemWithDataAnalysis(file)
            } else {
                handleAddItemWithoutDataAnalysis(file)
            }
    }

    const handleAddItemWithoutDataAnalysis = (file: File) => {
        ItemApi.createItemWithoutDataAnalysis(file).then(response => {
            console.log(response);
            setImage(response.image);
            setCategory(response.category);
            setBodyPart(response.bodyPart);
            setColor(response.color);
            setUuid(response.uuid)
        }).catch(error => {
            console.error(error);
        });
    }

    const handleAddItemWithDataAnalysis = (file: File) => {
        ItemApi.createItem(file).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColors = event.target.value.split(',');
        setColor(newColors);
    };

    const handleUpdateItemRequest = (id: string) => {
        const updatedCategory: Category = Category[category.toUpperCase() as keyof typeof Category];
        const updatedBodyPart: BodyPart = BodyPart[bodyPart.toUpperCase() as keyof typeof BodyPart];
        ItemApi.updateItem(
            id,
            {
                category: updatedCategory,
                bodypart: updatedBodyPart,
                color: color
            }
        ).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        }
        )
    }

    const handleClear = () => {
        setCategory('');
        setBodyPart('');
        setColor(['']);
        setImage('');
    }

    return(
        <>
            <div className='flex flex-col lg:flex-row gap-4 w-full justify-center'>
                <div className="grow">
                    <Input size={'lg'} color={'teal'} label="Search Item" className="w-1/3"
                           icon={
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                               </svg>
                           } />
                </div>
                <div>
                    <Menu open={openFilterMenu} handler={setOpenFilterMenu} allowHover>
                        <MenuHandler>
                            <Button
                                className="bg-lightblue flex items-center gap-2 text-sm font-normal capitalize tracking-normal w-full xl:w-auto justify-center"
                            >
                                Filter{' '}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </MenuHandler>
                        <MenuList className="hidden overflow-visible lg:grid">
                            <ul className=" flex w-full flex-col gap-1">
                                {filterItems.map(({ name }) => (
                                    <a href="#" key={name}>
                                        <MenuItem>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                {name}
                                            </Typography>
                                        </MenuItem>
                                    </a>
                                ))}
                            </ul>
                        </MenuList>
                    </Menu>
                </div>
                <div>
                    <Menu open={openSortMenu} handler={setOpenSortMenu} allowHover>
                        <MenuHandler>
                            <Button
                                className="bg-tearose flex items-center gap-2 text-sm font-normal capitalize tracking-normal w-full xl:w-auto justify-center"
                            >
                                Sort{' '}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </MenuHandler>
                        <MenuList className="hidden overflow-visible lg:grid">
                            <ul className=" flex w-full flex-col gap-1">
                                {sortItems.map(({ name }) => (
                                    <a href="#" key={name}>
                                        <MenuItem>
                                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                                {name}
                                            </Typography>
                                        </MenuItem>
                                    </a>
                                ))}
                            </ul>
                        </MenuList>
                    </Menu>
                </div>
                <div>
                    <Button onClick={handleOpen}
                            className="bg-timberwolf flex text-center items-center gap-2 text-sm font-normal capitalize tracking-normal w-full xl:w-auto justify-center">
                        Add Item{' '}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
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
                                hidden
                            />
                                <label htmlFor="image-input" className="w-2/3 flex justify-center">
                                    <div className="shadow-lg bg-indigo-300 text-white py-2 rounded-lg w-full text-center hover:shadow-indigo-100 hover:cursor-pointer">
                                        Select Image
                                    </div>
                                </label>
                            <Typography variant='small'>Choose image from file explorer or gallery</Typography>
                            <Checkbox label="Turn on data analysis" className="pb-0" checked={isCheckboxChecked} onChange={(e) => setIsCheckboxChecked(e.target.checked)}/>
                        </div>
                        <div className='flex flex-col lg:flex-row lg:justify-center gap-4 w-full justify-center items-center'>
                            <div className='w-3/4 lg:w-1/3'>
                                {image ? (
                                    <img src={`data:image/jpeg;base64,${image}`}
                                         className='rounded-md'
                                         alt="Selected image"/>
                                ) : (
                                    <div className="flex justify-center items-center h-full">Select an image first to see the preview</div>
                                    )}
                            </div>
                            <div className="flex flex-col justify-center gap-8 w-3/4 lg:w-1/3">
                                <Input label='Category' value={category}
                                       onChange={e => setCategory(e.target.value)}></Input>
                                <Input label='BodyPart' value={bodyPart}
                                       onChange={e => setBodyPart(e.target.value)}></Input>
                                <Input label='Color' value={color.join(',')}
                                       onChange={handleColorChange}></Input>
                                <Button onClick={handleClear}>Clear Inputs</Button>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className='flex flex-row gap-4 mt-4 pt-2 justify-center items-center w-full'>
                        <div className="w-1/3">
                               <Button className='bg-lightblue w-full'
                                       onClick={() => handleUpdateItemRequest(uuid)}>
                                   Update
                               </Button>
                           </div>
                            <div className="w-1/3">
                                <Button onClick={handleOpen} className='mr-1 bg-red-500 w-full'>
                                    Close
                                </Button>
                            </div>
                    </DialogFooter>
                </Dialog>
            </div>
        </>
    );
}
export default FilterSortAddItem;
