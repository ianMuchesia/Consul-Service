import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/features/themeConfigSlice';
import { formatDate, useToggleModal } from '../../utils';
import Error500 from '../../components/Error500';
import Loader from '../../components/Loader';
import { DataTable } from 'mantine-datatable';
import { useGetUsersQuery } from '../../store/services/userService';
import { UserType } from '../../@types/user';

import BlockModal from './BlockModal';
import DeleteModal from './DeleteModal';

const Users = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Cases'));
    }, []);

    const {handleOpenModal, handleCloseModal,openModal} = useToggleModal();
    const { data, error, isLoading } = useGetUsersQuery();


    if (error) {
        return <Error500 />;
       
    }

    const recordsData = data?.responseEntity;
    

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
              
                <li className="befoAddClientre:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Users</span>
                </li>
            </ul>
           
            <div className="panel mt-6">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <div className="md:flex-auto flex-1"></div>
                        <div className="md:flex-auto flex-1"></div>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <button className="btn btn-primary" onClick={() => navigate('/add-user')}>
                            Add User
                        </button>
                    </div>
                </div>
                <div className="datatables pagination-padding">
                    <DataTable
                        withColumnBorders
                        striped
                        withTableBorder
                        borderRadius="sm"
                        highlightOnHover
                         fetching={isLoading}
                        loaderType="bars"
                        className="whitespace-nowrap table-hover invoice-table "
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'name',
                                title: 'Name',
                            },

                         
                            {
                                accessor: 'role',
                                title: 'Role',
                            },
                            {
                              accessor: 'verified',
                              title: 'Verification',
                              render: (row) => {
                                const rowVal = row as UserType;
                                return <span>{rowVal.isVerified ? 'Verified' : 'Not Verified'}</span>;
                            },
                          },
                            {
                                accessor: 'is_locked',
                                title: 'Locked',
                                render: (row) => {
                                    const rowVal = row as UserType;
                                    return <span>{rowVal.is_locked ? 'Blocked' : 'Active'}</span>;
                                },
                            },
                            {
                                accessor: 'createdAt',
                                title: 'Created At',

                                render: (row) => {
                                    const rowVal = row as UserType;

                                    return <span>{formatDate(rowVal.createdAt)}</span>;
                                },
                            },
                            {
                                accessor: 'id',
                                title: 'Action',

                                render: (row) => (
                                    <div className="flex gap-2 items-center">
                                        {/* <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/cases/${row.id}`)}>
                                            View
                                        </button> */}

                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() =>{handleOpenModal("BLOCK-USER",row.id)}}>
                                            Block
                                        </button>

                                        <button type="button" className="btn btn-sm btn-danger" onClick={() =>{handleOpenModal("DELETE-USER",row.id)}}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={recordsData?.count}
                        minHeight={200}
                    />
                </div>
            </div>
            <BlockModal openModal={openModal} handleCloseModal={handleCloseModal}/>
            <DeleteModal openModal={openModal} handleCloseModal={handleCloseModal}/>
        </div>
    );
};

export default Users;
