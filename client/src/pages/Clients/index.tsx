import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPageTitle } from '../../store/features/themeConfigSlice';
import { Link, useNavigate } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import { usePaginateClientsQuery } from '../../store/services/clientService';
import Loader from '../../components/Loader';
import Error500 from '../../components/Error500';
import { ClientType } from '../../@types/client';
import { formatDate, usePagination, useToggleModal } from '../../utils';
import DeleteModalClient from './DeleteModalClient';

const Clients = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setPageTitle('Clients'));
    }, []);

    const { queryParams, handlePageChange, handlePageSizeChange, PAGE_SIZES, handleSearch, page } = usePagination();
    const { handleOpenModal, handleCloseModal, openModal } = useToggleModal();
    const user = useAppSelector((state) => state.auth.user);

    const { data, error, isLoading } = usePaginateClientsQuery(queryParams);

    if (error) {
        return <Error500 />;
    }

    const recordsData = data?.responseEntity;

    console.log(recordsData);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/clients" className="text-primary hover:underline">
                        Clients
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Clients</span>
                </li>
            </ul>
            <div className="panel">
                <h1 className="text-3xl ">Clients</h1>
            </div>

            <div className="panel mt-6">
                <div className="mb-4.5 flex md:items-center md:flex-row  flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <div className="md:flex-auto flex-1">
                            {/* <input
                                type="text"
                                value={""}
                                // onChange={(e) => {
                                //     setMinAge(e.target.value);
                                // }}
                                className="form-input"
                                placeholder="Minimum age..."
                            /> */}
                        </div>

                        <div className="md:flex-auto flex-1">
                            <input type="text" value={queryParams.search} onChange={handleSearch} className="form-input" placeholder="Name..." />
                        </div>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <button className="btn btn-primary" onClick={() => navigate('/add-client')}>
                            Add Client
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
                        records={recordsData?.rows}
                        columns={[
                            {
                                accessor: 'fullName',
                                title: 'Name',
                            },

                            {
                                accessor: 'phoneNumber',
                                title: 'Phone Number',
                            },
                            {
                                accessor: 'case',
                                title: 'Cases',
                                render: (row) => {
                                    const rowVal = row as ClientType;
                                    return <span>{rowVal.cases.length}</span>;
                                },
                            },

                            {
                                accessor: 'nationality',
                                title: 'Nationality',
                            },
                            {
                                accessor: 'createdAt',
                                title: 'registrationDate',

                                render: (row) => {
                                    const rowVal = row as ClientType;

                                    return <span>{formatDate(rowVal.createdAt)}</span>;
                                },
                            },
                            {
                                accessor: 'id',
                                title: 'Action',

                                render: (row) => (
                                    <div className="flex gap-2 items-center">
                                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/clients/${row.id}`)}>
                                            View
                                        </button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => navigate(`/update-client/${row.id}`)}>
                                            Update
                                        </button>
                                        {user.role !== 'user' && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => {
                                                    handleOpenModal('DELETE-CLIENT', row.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        )}

                                        {/* <button type="button" className="btn btn-sm btn-outline-primary">
                                            Payment
                                        </button> */}
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={recordsData?.count}
                        recordsPerPage={queryParams.limit}
                        page={page}
                        onPageChange={handlePageChange}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={handlePageSizeChange}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
            <DeleteModalClient openModal={openModal} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default Clients;
