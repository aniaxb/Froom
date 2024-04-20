import NavBar from '../NavBar/NavBar.tsx';
import {Button, Card, CardBody, Input, Typography} from '@material-tailwind/react';

const Profile = () => {
    return (
        <div className="min-h-screen flex flex-col w-screen bg-timberwolf">
            <NavBar/>
            <div className="flex flex-grow justify-center items-center">
                <Card className="w-3/4 xl:w-1/2 shadow-2xl xl:p-4">
                    <CardBody>
                        <div className="flex flex-col gap-4 justify-center items-center mb-4">
                            <img src="/src/assets/undraw_avatar.svg" alt="Avatar" className="w-28"/>
                            <Typography variant="lead">
                                Username
                            </Typography>
                        </div>
                        <form>
                            <div className="flex flex-col gap-4">
                                <Input type="text" label="First Name" value="Jane"/>
                                <Input type="text" label="Last Name" value="Smith"/>
                                <Input type="text" label="Username" value="Bambi"/>
                                <Input type="email" label="Em-ail" value="bambi@example.com"/>
                                <div className="flex flex-col lg:flex-row w-full gap-4">
                                    <Button className="w-full lg:w-1/2 bg-darkcyan">Save changes</Button>
                                    <Button color="red" className="w-full lg:w-1/2">Cancel changes</Button>
                                </div>
                            </div>
                        </form>
                        <form>
                            <Typography variant="small" className="font-bold my-4">Password</Typography>
                            <div className="flex flex-col lg:flex-row gap-4 w-full">
                                <Input className="w-full" type="password" disabled label="Password" value="pass123"/>
                                <Button className="w-full">Change password</Button>
                            </div>
                        </form>
                        <div className="flex flex-col mt-4 gap-4">
                            <Typography variant="h3" color="blue-gray" className="font-bold">Other actions</Typography>
                            <Button color="red" className="w-full">Delete user</Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
