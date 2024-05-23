import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from '@material-tailwind/react';
import React, {useEffect, useState} from 'react';
import {Item} from '../../model/Item.ts';
import { ItemApi } from '../../apis/ItemApi.ts';
import {BodyPart} from '../../model/enums/BodyPart.ts';

interface OutfitItemsProps {
    onSelectItem?: (item: Item) => void;
}

const OutfitItems: React.FC<OutfitItemsProps> = ({onSelectItem}) => {
    const [outfitItems, setOutfitItems] = useState<Item[]>([]);
    const data = [
        {
            label: 'Top',
            value: 'Top',
            icon: './src/assets/outfitClothesLogos/tshirt.png',
        },
        {
            label: 'Bottom',
            value: 'Bottom',
            icon: './src/assets/outfitClothesLogos/pants.png',
        },
        {
            label: 'Shoes',
            value: 'Shoes',
            icon: './src/assets/outfitClothesLogos/socks.png',
        },
        {
            label: 'Accessory',
            value: 'Accessory',
            icon: './src/assets/outfitClothesLogos/accessory.png',
        }
    ];

    const fetchOutfitItems = async () => {
        try {
            const response = await ItemApi.getAllItems();
            setOutfitItems(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOutfitItems();
    }, []);

    return (
        <Tabs value="Top">
            <TabsHeader>
                {data.map(({ label, value, icon }) => (
                    <Tab key={value} value={value}>
                        <div className="flex items-center gap-2">
                            <img src={icon} alt="clothes icon" className='w-5 h-5'/>
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value}) => (
                    <TabPanel key={value} value={value}>
                        <div>
                            {/*Clothes*/}
                            {outfitItems.map((item) => {
                                if (item.bodyPart === BodyPart[value.toUpperCase() as keyof typeof BodyPart]) {
                                    return (
                                        <div key={item.uuid} className="relative group ">
                                            <img
                                                src={`data:image/jpeg;base64,${item.image}`}
                                                alt="clothing item"
                                                className="w-40  rounded-lg shadow-lg"
                                            />
                                            {onSelectItem && (
                                                <div
                                                    className="w-40 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                                                    <button
                                                        onClick={() => onSelectItem(item)}
                                                        className="bg-teal-500 text-white py-2 px-4 rounded-lg"
                                                    >
                                                        Select
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
};

export default OutfitItems;
