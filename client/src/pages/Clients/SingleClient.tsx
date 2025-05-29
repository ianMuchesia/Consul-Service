import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetClientQuery } from '../../store/services/clientService';
import Error500 from '../../components/Error500';
import ClientDetails from './ClientDetails';
import Loader from '../../components/Loader';
import ClientCaseDetail from './ClientCaseDetail';
import { useAppDispatch } from '../../store/hooks';
import { setPageTitle } from '../../store/features/themeConfigSlice';
import { useToggleModal } from '../../utils';

const SingleClient = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Client Details'));
    }, []);

    if (!id) {
        return <Error500 />;
    }

    const { data, error, isLoading } = useGetClientQuery(id);

    if (isLoading) {
        return <Loader />;
    }

    if (!data || error) {
        return <Error500 />;
    }

    return (
        <div className="">
            <div className="panel flex justify-between items-center my-6">
                <h1 className="text-3xl ">Client Details</h1>
            </div>
            <div className="panel mt-6">
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                        <ClientDetails client={data?.responseEntity} />

                        <ClientCaseDetail caseRecords={data.responseEntity.cases} clientId={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleClient;
