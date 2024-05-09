import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.tsx';
import {Button, Card, CardBody, CardFooter, Input, Textarea, Tooltip, Typography} from '@material-tailwind/react';

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col w-screen bg-lightblue">
            <NavBar/>
            <div className="flex flex-grow justify-center items-center">
                <Card className="w-3/4 xl:w-1/2 shadow-2xl xl:p-4">
                    <CardBody className="px-4 py-2 lg:p-6">
                        <div className="flex justify-between items-end">
                            <Typography variant="h1" color="blue-gray" className="mb-4 text-3xl lg:text-4xl">
                                Contact
                            </Typography>
                            <img src="/src/assets/logos/froom_logo.png" alt="Froom logo" className="w-28 h-28"/>
                        </div>
                        <Typography className="xl:w-2/3">
                            Ready to bring your ideas to life? Let's connect! Reach out for any inquiries or
                            collaborations, and let's make something great together.
                        </Typography>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex flex-row gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
                                </svg>
                                <Typography variant="h6" color="blue-gray" className="text-sm lg:text-base">
                                    Phone number: </Typography>
                                <Typography>123123123</Typography>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"/>
                                </svg>
                                <Typography variant="h6" color="blue-gray" className="text-sm lg:text-base">
                                    Address: </Typography>
                                <Typography>Wólczańska 121</Typography>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                                </svg>
                                <Typography variant="h6" color="blue-gray" className="text-sm lg:text-base">
                                    E-mail: </Typography>
                                <Typography>support@froom.com</Typography>
                                <Tooltip
                                    content={
                                        <div className="w-80">
                                            <Typography color="white" className="font-medium">
                                                Caution
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="white"
                                                className="font-normal opacity-80"
                                            >
                                                This e-mail address is not real, it&apos;s just a placeholder
                                            </Typography>
                                        </div>
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-5 w-5 cursor-pointer text-blue-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                        />
                                    </svg>
                                </Tooltip>
                            </div>
                        </div>
                        <Link to={'/about'} className='image-link inline-block mt-4 w-full'>
                            <Button size="sm" variant="outlined"
                                    className="flex items-center justify-center gap-2 w-full md:w-auto">
                                Learn More About Froom
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </Link>
                    </CardBody>
                    <div className="flex justify-center mt-2">
                        <hr className="w-11/12 "/>
                    </div>
                    <CardFooter className="px-4 py-2 mb-2 lg:p-6 pt-0">
                        <div className="flex flex-col gap-4 mt-2">
                            <Typography variant="h2" color="blue-gray" className="text-2xl lg:text-4xl">Send us a
                                message</Typography>
                            <Input label="Topic"/>
                            <Textarea size="lg" label="Message"/>
                            <Button>Send Message</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Contact;
