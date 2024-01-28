import {
    Button,
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

const FilterSortAddItem = () => {
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [openSortMenu, setOpenSortMenu] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

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
                                className="bg-lightblue flex items-center gap-2 text-sm font-normal capitalize tracking-normal"
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
                                className="bg-tearose flex items-center gap-2 text-sm font-normal capitalize tracking-normal"
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
                    <Button onClick={handleOpen} className="bg-timberwolf flex text-center items-center gap-2 text-sm font-normal capitalize tracking-normal">
                        Add Item{' '}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                </div>
                <Dialog open={openDialog} handler={handleOpen}>
                    <DialogHeader>
                        <div className='flex w-full justify-center'>
                            <Typography className='text-3xl font-black'>Add New Item</Typography>
                        </div>
                    </DialogHeader>
                    <DialogBody>
                        <div className='flex flex-col gap-2 justify-center items-center pb-4'>
                            <Button>Select Image</Button>
                            <Typography variant='small'>Choose image from file explorer or gallery</Typography>
                        </div>
                        <div className='flex flex-row justify-center gap-8'>
                            <div className='w-1/3'>
                                <img src="/src/assets/clothingItems/exampletshirt.webp"
                                     className='rounded-md'
                                     alt="Example tshirt"/>
                            </div>
                            <div>
                            <Input label='Category'></Input>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter className='flex flex-row gap-8 mt-0 pt-2 justify-center items-center'>
                           <div>
                               <Button
                                   onClick={handleOpen}
                                   className='mr-1 bg-red-500'
                               >
                                   <span>Cancel</span>
                               </Button>
                           </div>
                            <div>
                                <Button className='bg-lightblue' onClick={handleOpen}>
                                    <span>Confirm</span>
                                </Button>
                            </div>
                    </DialogFooter>
                </Dialog>
            </div>
        </>
    );
}
export default FilterSortAddItem;