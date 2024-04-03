import {Button, Collapse, IconButton, Navbar, Typography} from '@material-tailwind/react';
import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';

const NavBar = () => {
    const [openNav, setOpenNav] = useState(false);
    const [isLoggedIn] = useState(false);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="lead"
                color="blue-gray"
                className="p-1 font-semibold"
            >
                <NavLink to="/about" className="navbar-link">
                    About
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="lead"
                color="blue-gray"
                className="p-1 font-semibold"
            >
                <NavLink to="/contact" className="navbar-link">
                    Contact
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="lead"
                color="blue-gray"
                className="p-1 font-semibold"
            >
                <NavLink to="/wardrobe" className="navbar-link">
                    Wardrobe
                </NavLink>
            </Typography>
        </ul>
    );

    return (
        <>
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 lg:px-10 py-0">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to={'/'} className='image-link'>
                        <img src="/src/assets/logos/froom_logo.png" className="w-28" alt="Froom logo"/>
                    </Link>
                    <div id="navList" className="mr-4 hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-4">
                        {!isLoggedIn ? (
                            <div className="flex items-center gap-x-2">
                                <NavLink to="/login" className="sign-button">
                                    <Button
                                        variant="outlined"
                                        size="lg"
                                        className="hidden lg:inline-block border-darkcyan"
                                    >
                                        <span>Log In</span>
                                    </Button>
                                </NavLink>
                                <NavLink to="/register" className="sign-button">
                                    <Button
                                        size="lg"
                                        className="hidden lg:inline-block bg-darkcyan"
                                    >
                                        <span>Sign In</span>
                                    </Button>
                                </NavLink>
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-2">
                                <Button
                                    variant="gradient"
                                    size="lg"
                                    className="hidden lg:inline-block"
                                >
                                    <span>Log Out</span>
                                </Button>
                            </div>
                        )}
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1 my-2">
                        <NavLink to="/login" >
                            <Button fullWidth variant="outlined" size="sm" className="">
                                <span>Log In</span>
                            </Button>
                        </NavLink>
                        <Button fullWidth variant="gradient" size="sm" className="">
                            <span>Sign in</span>
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;
