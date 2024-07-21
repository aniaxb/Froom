import NavBar from '../NavBar/NavBar.tsx';
import {Button, Card, CardBody, Dialog, Input, Typography} from '@material-tailwind/react';
import {useEffect, useState} from 'react';
import {UserApi} from '../../apis/UserApi.ts';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
    const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);

    const handleOpenPassword = () => setIsChangePasswordDialogOpen(!isChangePasswordDialogOpen);
    const handleOpenDelete = () => setIsDeleteUserDialogOpen(!isDeleteUserDialogOpen);

    const handleCancel = () => {
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirmation('');
        setIsChangePasswordDialogOpen(false);
    }

    const fetchUserData = () => {
        UserApi.getUser().then(response => {
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setUsername(response.username);
            setEmail(response.email)
        }).catch(error => {
            console.error(error);
            toast.error('Error fetching User data');
        })
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdateUserRequest = () => {
        UserApi.updateUser(firstName, lastName, username, email).then(response => {
            console.log(response);
            toast.success('User data updated');
        }).catch(error => {
            console.error(error);
            toast.error('Error updating User data');
        });
    }

    const handleUpdatePasswordRequest = () => {
        UserApi.updatePassword(oldPassword, newPassword, newPasswordConfirmation).then(response => {
            console.log(response);
            toast.success('Password updated');
            fetchUserData();
        }).catch(error => {
            console.error(error);
            toast.error('Error updating password');
        });
    }

    const handleDeleteUserRequest = () => {
        UserApi.deleteUser().then(response => {
            console.log(response);
            toast.success('User deleted');
        }).catch(error => {
            console.error(error);
            toast.error('Error deleting User');
        });
    }

    return (
        <div className="min-h-screen flex flex-col w-screen bg-gray-200">
            <NavBar/>
            <div className="flex flex-grow justify-center items-center">
                <Card className="w-3/4 xl:w-1/2 shadow-2xl xl:p-4">
                    <CardBody>
                        <div className="flex flex-col gap-4 justify-center items-center mb-4">
                            <img src="/src/assets/undraw_avatar.svg" alt="Avatar" className="w-28"/>
                            <Typography variant="lead" className="font-bold">
                                {username}
                            </Typography>
                        </div>
                        <form onSubmit={handleUpdateUserRequest}>
                            <div className="flex flex-col gap-4">
                                <Input type="text" label="First Name"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Input type="text" label="Last Name"
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                />
                                <Input type="text" label="Username"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                />
                                <Input type="email" label="E-mail"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="flex flex-col lg:flex-row w-full gap-4">
                                    <Button className="w-full bg-darkcyan" onClick={handleUpdateUserRequest}>Save Changes</Button>
                                </div>
                            </div>
                        </form>
                        <form>
                            <Typography className="font-bold my-4">Password</Typography>
                            <div className="flex flex-col lg:flex-row gap-4 w-full">
                                <Input className="w-full" type="password" disabled label="Password" value="********"/>
                                <Button className="w-full" onClick={handleOpenPassword}>Change Password Dialog</Button>
                            </div>
                            <Dialog open={isChangePasswordDialogOpen} handler={handleOpenPassword} className="p-10">
                                <form onSubmit={handleUpdatePasswordRequest}>
                                    <div className="flex flex-col gap-4">
                                        <Input type="password" label="Current Password"
                                               value={oldPassword}
                                               onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <Input type="password" label="New Password"
                                               value={newPassword}
                                               onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <Input type="password" label="Confirm New Password"
                                               value={newPasswordConfirmation}
                                               onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                                        />
                                        <div className="flex flex-col lg:flex-row w-full gap-4">
                                            <Button className="w-full bg-darkcyan" onClick={handleUpdatePasswordRequest}>Change Password</Button>
                                            <Button color={'red'} className="w-full" onClick={handleCancel}>Cancel</Button>
                                        </div>
                                    </div>
                                </form>
                            </Dialog>
                        </form>
                        <div className="flex flex-col mt-4 gap-4">
                            <Typography className="font-bold">Other actions</Typography>
                            <Button color="red" className="w-full" onClick={handleOpenDelete}>Delete User</Button>
                            <Dialog open={isDeleteUserDialogOpen} handler={handleOpenDelete} className="p-10">
                                <div className="flex flex-col gap-8">
                                    <Typography variant="h3" className="text-blue-gray-900 text-center font-bold">Are you sure?</Typography>
                                    <div className="flex flex-col lg:flex-row w-full gap-4">
                                        <Button className="w-full bg-darkcyan" onClick={handleDeleteUserRequest}>Yes</Button>
                                        <Button color={'red'} className="w-full" onClick={handleOpenDelete}>No</Button>
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
