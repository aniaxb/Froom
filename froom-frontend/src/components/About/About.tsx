import NavBar from '../NavBar/NavBar.tsx';
import {Typography} from '@material-tailwind/react';
import {Footer} from '../Footer/Footer.tsx';

const About = () => {

    return(
        <div className="min-h-screen flex flex-col w-screen">
            <NavBar />
            <div className="relative">
                <img className=" w-full h-80 object-cover"
                    src="https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt="Clothes on a rack"/>
                <Typography className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">About Us</Typography>
            </div>
            <div className="flex flex-col gap-16 flex-grow justify-center items-center mt-16 px-16">
                <div className="flex flex-col gap-16 lg:flex-row justify-evenly items-center p-10">
                    <div className="flex flex-col w-2/3 gap-8 justify-center text-center lg:text-start">
                        <Typography variant="h1">Who are we?</Typography>
                        <Typography variant="paragraph" className="text-lg">
                            <span className="font-bold text-amber-600 inline">Froom</span> is an app that allows users to manage their wardrobe virtually. It has proven to be a difficult
                            task to oversee all your clothes, so Froom comes to your aid!
                        </Typography>
                    </div>
                    <div className="flex justify-center">
                        <img className="w-full h-80"
                             src="/src/assets/undraw_shoppingbags.svg"
                             alt="Clothes on a rack"/>
                    </div>
                </div>
                <div className="flex flex-col gap-16 lg:flex-row justify-evenly items-center">
                    <div className="flex justify-center">
                        <img className="w-full h-80"
                             src="/src/assets/undraw_window_shopping.svg"
                             alt="Clothes on a rack"/>
                    </div>
                    <div className="flex flex-col w-2/3 gap-8 justify-center text-center lg:text-start">
                        <Typography variant="h1">What do we do?</Typography>
                        <Typography variant="paragraph" className="text-lg">
                            We provide a platform for users to upload their clothes, categorize them, and create
                            outfits. Froom also provides features to filter your clothes.</Typography>
                    </div>
                </div>
                <div className="flex flex-row mb-16 justify-evenly items-center">
                    <div className="flex flex-col gap-16 lg:flex-row justify-evenly items-center">
                        <div className="flex flex-col w-2/3 gap-8 justify-center text-center lg:text-start">
                            <Typography className="items-start" variant="h1">Fun fact</Typography>
                            <Typography className="text-lg" variant="paragraph">Did you know that the name <span
                                className="font-bold text-green-500 inline">Froom</span> originates from the
                                combination of "Fitting
                                Rooms", which refers to a changing room in a clothing store?</Typography>
                        </div>
                        <div className="flex justify-center">
                            <img className="w-full h-80 object-cover rounded-lg"
                                 src="https://images.unsplash.com/photo-1598775378121-e24f7062c151?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                 alt="Fitting Rooms Image"/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default About;
