import TransparentNavBar from '../NavBar/TransparentNavBar.tsx';
import {Button, Card, List, ListItem, ListItemPrefix, Typography} from '@material-tailwind/react';
import {Link} from 'react-router-dom';
import {Footer} from '../Footer/Footer.tsx';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col w-screen ">
            <div className="min-h-screen relative">
                <div className="absolute inset-0">
                    <img className="w-full h-screen object-cover" alt="Landing Image"
                         src="/src/assets/landing_rack.png"/>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <Typography variant="h1" className="text-6xl w-1/2 text-center">Manage Your Wardrobe Virtually with
                        Froom</Typography>
                </div>
                <TransparentNavBar/>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row flex-grow text-center w-full justify-center items-center p-16">
                    <div>
                        <Typography variant="h2">Features</Typography>
                        <Card className="flex flex-col gap-4 mt-8 text-start drop-shadow ">
                            <List>
                                <ListItem className="p-4 bg-tearose">
                                    <ListItemPrefix className="lg:inline hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"/>
                                        </svg>
                                    </ListItemPrefix>
                                    <span className="font-bold mr-2">Virtual Wardrobe Organization:</span> Keep track of
                                    all your clothing items in one convenient place. Easily categorize your wardrobe by
                                    clothing type, color, season, and more.</ListItem>
                                <ListItem className="p-4 bg-lightblue">
                                    <ListItemPrefix className="lg:inline hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                                        </svg>
                                    </ListItemPrefix>
                                    <span className="font-bold mr-2">Outfit Generator:</span> Mix and match your
                                    clothing items to create stylish outfits. Save your favorite outfits for easy access
                                    later.</ListItem>
                                <ListItem className="p-4 bg-indigo-100">
                                    <ListItemPrefix className="lg:inline hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"/>
                                        </svg>
                                    </ListItemPrefix>
                                    <span className="font-bold mr-2">Data Analysis:</span> Use data analysis to automate
                                    the process of adding clothing items to your wardrobe. Froom will help you keep your
                                    wardrobe up-to-date with minimal effort.</ListItem>
                                <ListItem className="p-4 bg-timberwolf">
                                <ListItemPrefix className="lg:inline hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
                                        </svg>
                                    </ListItemPrefix>
                                    <span className="font-bold mr-2">Accessibility:</span> Access your wardrobe anytime,
                                    anywhere. Never forget what you own and make outfit planning a breeze.</ListItem>
                            </List>
                        </Card>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 flex-grow text-center bg-lightblue w-full justify-center items-center p-16">
                    <div>
                        <Typography variant="h2">How it Works</Typography>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 w-full">
                        <div className="lg:w-1/5 bg-tearose p-8 rounded-lg flex flex-col gap-4 shadow-lg">
                            <Typography variant="h3">Step 1: Sign Up</Typography>
                            <Typography variant="paragraph">Create your Froom account in seconds. Simply provide your
                                email address and set a password to get started.</Typography>
                        </div>
                        <div className="lg:w-1/5 bg-tearose p-8 rounded-lg flex flex-col gap-4 shadow-lg">
                            <Typography variant="h3">Step 2: Add Your Clothing</Typography>
                            <Typography variant="paragraph">Begin by adding your clothing items to your
                                wardrobe. You can manually input item details or use data analysis to automate this
                                feature.</Typography>
                        </div>
                        <div className="lg:w-1/5 bg-tearose p-8 rounded-lg flex flex-col gap-4 shadow-lg">
                            <Typography variant="h3">Step 3: Organize Clothes</Typography>
                            <Typography variant="paragraph">Filter your wardrobe by categories and attributes to streamline outfit planning. </Typography>
                        </div>
                        <div className="lg:w-1/5 bg-tearose p-8 rounded-lg flex flex-col gap-4 shadow-lg">
                            <Typography variant="h3">Step 4: Explore Outfit Generator</Typography>
                            <Typography variant="paragraph">Use our visual outfit creator to mix and match clothing items and create stylish ensembles.</Typography>
                        </div>
                        <div className="lg:w-1/5 bg-tearose p-8 rounded-lg flex flex-col gap-4 shadow-lg">
                            <Typography variant="h3">Step 5: Enjoy Your Virtual Wardrobe</Typography>
                            <Typography variant="paragraph">Enjoy the convenience of managing your wardrobe virtually. Access your wardrobe anytime, anywhere, and never worry about forgetting what you own.</Typography>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-16 lg:flex-row flex-grow text-center w-full justify-evenly items-center p-16">
                    <div className="flex flex-col gap-8 justify-center items-center ">
                        <Typography variant="h2">Sign Up Now</Typography>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                             stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"/>
                        </svg>
                        <Link to="/register" className="w-full">
                            <Button className="shadow-lg w-full bg-tearose text-blue-gray-900">Register here</Button>
                        </Link>
                    </div>
                    <div>
                        <img className="h-80" src="/src/assets/undraw_sign_up.svg" alt="Sign Up Icon"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Landing;
