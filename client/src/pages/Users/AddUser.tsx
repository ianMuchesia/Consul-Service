import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserTypeInput } from '../../@types/user';
import { useForm } from 'react-hook-form';
import { useCreateUserMutation } from '../../store/services/userService';
import IconLoader from '../../components/Icon/IconLoader';

const AddUser = () => {
    const navigate = useNavigate();
    const [submitUser, { isLoading }] = useCreateUserMutation();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<UserTypeInput>({
        defaultValues: {
            name: '',
            role: '',
            email: '',
            phoneNumber: '',
        },
    });

    const onSubmit = async (data: UserTypeInput) => {
        try {
            const res = await submitUser(data).unwrap();
            if (res.message === 'Success') {
                toast.success(res.responseEntity);
                navigate('/users');
            }
        } catch (error: any) {
            if (error?.data) {
                toast.error(error.data.message);
            } else {
                toast.error('Something wrong happened');
                console.log(error);
            }
        }
    };
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/users" className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add User</span>
                </li>
            </ul>
           
            <div className="">
                <div className="panel p-5 mt-10  mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                            <div className={`${errors.name && 'has-error'} mb-5`}>
                                <label htmlFor="firstName">
                                    Name<sup className="text-danger">*</sup>
                                </label>
                                <input  autoComplete='off' {...register('name', { required: true })} id="firstName" type="text" placeholder="Enter FullName " className="form-input" />
                            </div>

                            <div className={`${errors.email && 'has-error'} mb-5`}>
                                <label htmlFor="email">Email</label>
                                <input  autoComplete='off' id="email" {...register('email', { required: true })} type="email" placeholder="Enter Email" className="form-input" />
                            </div>
                            <div className={`${errors.phoneNumber && 'has-error'} mb-5`}>
                                <label htmlFor="phone">
                                    Phone Number<sup className="text-danger">*</sup>
                                </label>
                                <input  autoComplete='off' id="phone" {...register('phoneNumber', { required: true })} type="text" placeholder="Enter Phone Number" className="form-input" />
                            </div>

                            <div className={`${errors.role && 'has-error'} mb-5`}>
                                <label htmlFor="IdType" className="form-label">
                                    Role<sup className="text-danger">*</sup>
                                </label>
                                <select {...register('role', { required: true })} id="IdType" className="form-select">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-8">
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => {
                                    reset();
                                }}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                {isLoading ? (
                                    <span className="flex gap-4">
                                        <IconLoader />
                                        loading...
                                    </span>
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
