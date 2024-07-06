import {Link, useNavigate} from 'react-router-dom';
import {Button, Input, Typography} from '@material-tailwind/react';
import {AuthApi} from '../../apis/AuthApi.ts';
import {useState} from 'react';
import {toast} from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goBack = () => {
        navigate(-1);
    }

    const handleLoginRequest = () => {
        AuthApi.loginUser(email, password).then(response => {
            AuthApi.setAuthToken(response.accessToken);
            AuthApi.setUser(response.user);
            AuthApi.setRefreshToken(response.refreshToken);
            setTimeout(() => {
                navigate('/wardrobe');
            }, 1000);
            toast.success('User logged in');
        }).catch(error => {
            console.error(error);
            toast.error('Error logging in');
        })
    }

    return (
        <>
            <div className="mt-2 ml-10 absolute flex flex-col justify-center items-center gap-4">
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
                    <div className="w-full flex flex-col justify-center items-center gap-8">
                        <Typography className="text-4xl font-bold">
                            Welcome Back
                        </Typography>
                        <form onSubmit={handleLoginRequest} className="w-3/4 xl:w-1/2">
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <div className="w-3/4">
                                    <Input type="text" label="E-mail Address"
                                           value={email}
                                           onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="w-3/4">
                                    <Input type="password" label="Password"
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="w-3/4">
                                    <Button onClick={handleLoginRequest} className="w-full bg-tearose text-blue-gray-900">Log in</Button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <Typography
                                className="text-gray-500 mt-2 flex items-center gap-1 font-normal text-base"
                            >
                                New here?
                                <a href="/register" className="text-teal-300 underline">Create an account</a>
                            </Typography>
                        </div>
                    </div>
                    <div className="w-1/2 max-h-screen flex justify-end">
                        <img className="max-h-screen h-screen object-cover w-full"
                             src="src/assets/login_decor_img.png"
                             alt="Decor Image - fashionable glasses in pink drinks"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
