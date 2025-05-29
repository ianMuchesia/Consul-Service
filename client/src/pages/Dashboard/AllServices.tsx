// src/pages/Dashboard/AllServices.tsx
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToggleModal } from '../../utils';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrash from '../../components/Icon/IconTrash';

import { Service } from '../../@types/services';
import { useGetServicesQuery } from '../../store/services/apiService';
import AddServiceModal from './Modals/AddServiceModal';


const AllServices = () => {
  const { handleOpenModal, openModal, handleCloseModal } = useToggleModal();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { data: services, isLoading, isFetching } = useGetServicesQuery();



  const handleEdit = (service: Service) => {
    setSelectedService(service);
    handleOpenModal("EDIT-SERVICE", service.id);
  };

  const handleConfirmDelete = (service: Service) => {
    setSelectedService(service);
    handleOpenModal("DELETE-SERVICE", service.id);
  };

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>All Services</span>
        </li>
      </ul>
      
      <div className="panel my-4">
        <h1 className="text-3xl">All Services</h1>
      </div>
      
      <div className="panel mt-6">
        <div className="datatables pagination-padding">
          <DataTable
            withColumnBorders
            striped
            withTableBorder
            borderRadius="sm"
            highlightOnHover
            fetching={isLoading || isFetching}
            loaderType="bars"
            loaderColor="#4361ee"
            className="whitespace-nowrap table-hover"
            records={services || []}
            columns={[
              {
                accessor: 'id',
                title: 'Service ID',
                sortable: true,
              },
              {
                accessor: 'parent.name',
                title: 'Parent Name',
                sortable: true,
                render: (row) => (
                  <Link 
                    to={`/parents/${row.parent_id}/services`} 
                    className="text-blue-500 hover:underline"
                  >
                    {row.parent?.name}
                  </Link>
                ),
              },
              {
                accessor: 'address',
                title: 'Address',
                sortable: true,
              },
              {
                accessor: 'port',
                title: 'Port',
                sortable: true,
              },
              {
                accessor: 'tags',
                title: 'Tags',
                render: (row) => (
                  <div className="flex flex-wrap gap-1">
                    {row.tags?.map((tag, index: number) => (
                      <span key={index} className="badge bg-info p-1.5 text-xs">
                         {tag}
                      </span>
                    )) || 'No tags'}
                  </div>
                ),
              },
              {
                accessor: 'action',
                title: 'Action',
                render: (row) => (
                  <div className="flex gap-2 items-center">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleEdit(row)}
                    >
                      <IconEdit className="w-4 h-4" />
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleConfirmDelete(row)}
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>
                ),
              },
            ]}
            totalRecords={services?.length || 0}
            minHeight={200}
            emptyState={
              <div className="flex flex-col items-center p-4">
                <div className="text-lg font-medium">No services found</div>
                <div className="text-sm text-gray-500">No services have been added yet</div>
              </div>
            }
            page={1}
            onPageChange={() => {}}
            recordsPerPage={services?.length || 0}
            onRecordsPerPageChange={() => {}}
            recordsPerPageOptions={[]}

          />
        </div>
      </div>

      {/* Edit Service Modal */}
      {openModal.isOpen && openModal.modalName === "EDIT-SERVICE" && selectedService && (
        <AddServiceModal 
          openModal={openModal} 
          handleCloseModal={handleCloseModal}
         
        />
      )}

      {/* Delete Confirmation Modal */}
      {/* {openModal.isOpen && openModal.modalName === "DELETE-SERVICE" && selectedService && (
        <DeleteConfirmationModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          title="Delete Service"
          message={`Are you sure you want to delete service "${selectedService.id}"?`}
          onConfirm={() => handleDelete(selectedService.service_id)}
          isLoading={isDeleting}
        />
      )} */}
    </div>
  );
};

export default AllServices;