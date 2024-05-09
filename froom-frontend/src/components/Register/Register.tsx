import {Link, useNavigate} from 'react-router-dom';
import {Input, Typography} from '@material-tailwind/react';
import {useState} from 'react';
import {UserApi} from '../../apis/UserApi.ts';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goBack = () => {
        navigate(-1);
    }

    const handleRegisterRequest = () => {
       UserApi.registerUser(firstName, lastName, username, email, password).then(response => {
            console.log(response);
            navigate('/');
        }).catch(error => {
            console.error(error);

       });
    }
    return (
        <>
            <div className="mt-2 right-10 absolute flex flex-col justify-center items-center gap-4">
                <Link to={'/'} className='image-link'>
                    <img src="/src/assets/logos/froom_logo.png" className="w-28" alt="Froom logo"/>
                </Link>
                <button onClick={goBack} className="bg-tearose">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </button>
            </div>
            <div className="min-h-screen flex flex-col w-screen">
                <div className="flex flex-row">
                    <div className="w-1/2 max-h-screen flex justify-start">
                        <img className="max-h-screen h-screen object-cover w-full"
                             src="src/assets/register_decor_img.png"
                             alt="Decor Image - fashionable glasses in blue drinks"/>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-8">
                        <Typography className="w-full justify-center text-2xl mt-8 lg:text-4xl font-bold flex gap-2.5">
                            Welcome To
                            <a className="text-indigo-200">Froom</a>
                        </Typography>
                        <form onSubmit={handleRegisterRequest} className="w-full xl:w-1/2">
                            <div className="flex flex-col gap-8 justify-center items-center">
                                <div className="flex flex-col xl:flex-row gap-8 w-3/4 lg:w-1/2">
                                    <div>
                                        <Input type="text" label="First Name"
                                               value={firstName}
                                               onChange={e => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Input type="text" label="Last Name"
                                               value={lastName}
                                               onChange={e => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-3/4 lg:w-1/2">
                                    <Input type="text" label="Username"
                                           value={username}
                                           onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="w-3/4 lg:w-1/2">
                                    <Input type="text" label="E-mail Address"
                                           value={email}
                                           onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="w-3/4 lg:w-1/2">
                                    <Input type="password" label="Password"
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="mt-2 flex items-center gap-1 font-normal"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="-mt-px h-4 w-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Use at least 8 characters, one uppercase, one lowercase and one number.
                                    </Typography>
                                </div>
                            </div>
                        </form>
                        <div>
                            <Typography
                                className="text-gray-500 mt-2 flex items-center gap-1 font-normal text-base"
                            >
                                Have an account?
                                <a href="/login" className="text-teal-300 underline">Log in here</a>
                            </Typography>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Register;
