import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetClientQuery, useUpdateClientMutation } from '../../store/services/clientService';
import Loader from '../../components/Loader';
import Error404 from '../Error404';
import ClientForm from './ClientForm';
import { ClientInput } from '../../@types/client';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../store/hooks';
import { setPageTitle } from '../../store/features/themeConfigSlice';

const UpdateClient = () => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Update Client'));
    }, []);

    const { id } = useParams() as { id: string };

   

    const [submitClient, { isLoading: loading }] = useUpdateClientMutation();

    const { data, isLoading, error } = useGetClientQuery(id);

    if (isLoading) {
        return <Loader />;
    }

    if (error || !data) {
        return <Error404 />;
    }

    const client = data.responseEntity;

 

    const onSubmit = async (data: ClientInput) => {
        try {
            const res = await submitClient({ id, data }).unwrap();

            if (res.message === 'Success') {
                toast.success('Client updated successfully');
                navigate('/clients');
            }
        } catch (error: any) {
            console.log(error);
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
                    <Link to="/clients" className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        Clients
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Update Client</span>
                </li>
            </ul>
            <div className="panel">
            <h1 className="text-3xl ">Update Client</h1>
            </div>
            <div className="">
                <div className="panel p-5 mt-10  mx-auto">{client && <ClientForm onSubmit={onSubmit} isLoading={loading} clientFormData={{ ...client, notes: '' }} />}</div>
            </div>
        </div>
    );
};

export default UpdateClient;
