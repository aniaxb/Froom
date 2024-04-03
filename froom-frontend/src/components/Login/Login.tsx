import {Link, useNavigate} from 'react-router-dom';
import {Input, Typography} from '@material-tailwind/react';
const Login = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
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
                        <div className="w-1/2">
                            <Input type="text" label="E-mail Address"/>
                        </div>
                        <div className="w-1/2">
                            <Input type="password" label="Password"/>
                        </div>
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
