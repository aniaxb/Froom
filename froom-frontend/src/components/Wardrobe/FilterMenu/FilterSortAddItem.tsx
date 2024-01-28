import {Button, Input, Menu, MenuHandler} from "@material-tailwind/react";
import {useState} from "react";

const FilterSortAddItem = () => {
    const [openMenu, setOpenMenu] = useState(false);
    return(
        <>
            {/*<div>Search Input Filter Sort</div>*/}
            <div className='flex flex-col lg:flex-row gap-4 w-full justify-center'>
                <div className="grow">
                    <Input size={"lg"} color={"teal"} label="Search Item" className="w-1/3"
                           icon={
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                               </svg>
                           } />
                </div>
                <div>
                    <Menu open={openMenu} handler={setOpenMenu} allowHover>
                        <MenuHandler>
                            <Button
                                className="bg-darkcyan flex items-center gap-2 text-sm font-normal capitalize tracking-normal"
                            >
                                Filter{" "}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </MenuHandler>
                    </Menu>
                </div>
                <div>
                    <Menu open={openMenu} handler={setOpenMenu} allowHover>
                        <MenuHandler>
                            <Button
                                className="bg-tearose flex items-center gap-2 text-sm font-normal capitalize tracking-normal"
                            >
                                Sort{" "}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </MenuHandler>
                    </Menu>
                </div>
                <div>
                    <Button className="bg-timberwolf flex text-center items-center gap-2 text-sm font-normal capitalize tracking-normal">
                        Add Item{" "}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                </div>
            </div>
        </>
    );
}
export default FilterSortAddItem;