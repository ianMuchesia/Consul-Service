// src/pages/Dashboard/ParentServices.tsx
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useToggleModal } from '../../utils';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrash from '../../components/Icon/IconTrash';


import IconLoader from '../../components/Icon/IconLoader';
import { useGetParentByIdQuery, useGetServicesByParentIdQuery } from '../../store/services/apiService';
import { Service } from '../../@types/services';
import AddServiceModal from './Modals/AddServiceModal';

const ParentServices = () => {
  const { parentId } = useParams<{ parentId: string }>();
  const { handleOpenModal, openModal, handleCloseModal } = useToggleModal();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { data: parent, isLoading: isParentLoading } = useGetParentByIdQuery(parentId || '');
  const { data: services, isLoading, isFetching } = useGetServicesByParentIdQuery(parentId || '');


  const handleEdit = (service: Service) => {
    setSelectedService(service);
    handleOpenModal("EDIT-SERVICE", service.id);
  };

  const handleConfirmDelete = (service: Service) => {
    setSelectedService(service);
    handleOpenModal("DELETE-SERVICE", service.id);
  };

  if (isParentLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <IconLoader className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!parent) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Parent not found</h1>
        <Link to="/parents" className="mt-4 text-blue-500 hover:underline">
          Back to Parents List
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <Link to="/" className="text-primary hover:underline">
            Parents
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{parent.name} services</span>
        </li>
      </ul>
      
      <div className="panel my-4">
        <h1 className="text-3xl">{parent.name} Services</h1>
      </div>
      
      <div className="panel mt-6">
        <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
          <div className="ltr:ml-auto rtl:mr-auto">
            <button 
              className="btn btn-primary" 
              onClick={() => handleOpenModal("ADD-SERVICE", parentId || '')}
            >
              Add Service
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
                <div className="text-sm text-gray-500">Add a service to get started</div>
              </div>
            }
            page={1}
            onPageChange={() => {}}
            recordsPerPage={10}
            onRecordsPerPageChange={() => {}}
            recordsPerPageOptions={[10, 20, 50]}
           
            paginationSize="sm"
          />
        </div>
      </div>

      {/* Add/Edit Service Modal */}
      {openModal.isOpen && (openModal.modalName === "ADD-SERVICE" || openModal.modalName === "EDIT-SERVICE") && (
        <AddServiceModal 
          openModal={openModal} 
          handleCloseModal={handleCloseModal}
          parentName={parent.name}
         
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

export default ParentServices;