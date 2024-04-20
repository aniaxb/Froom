import { Typography } from '@material-tailwind/react';

export function Footer() {
    return (
        <footer className="w-full bg-lightblue p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
                <img src="/src/assets/logos/froom_logo_black.png" alt="logo-ct" className="w-28" />
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="/"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-darkcyan focus:text-darkcyan"
                        >
                            Home
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="/about"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-darkcyan focus:text-darkcyan"
                        >
                            About Us
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="/contact"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-darkcyan focus:text-darkcyan"
                        >
                            Contact Us
                        </Typography>
                    </li>
                </ul>
            </div>
            <hr className="my-8 border-blue-gray-50"/>
            <Typography color="blue-gray" className="text-center font-normal">
                &copy; 2024 Froom
            </Typography>
        </footer>
    );
}
