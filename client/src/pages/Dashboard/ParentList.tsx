// src/pages/Dashboard/ParentsList.tsx
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, useToggleModal } from '../../utils';
import IconEdit from '../../components/Icon/IconEdit';
import IconTrash from '../../components/Icon/IconTrash';

import IconLoader from '../../components/Icon/IconLoader';
import { Parent } from '../../@types/services';
import { useGetParentsQuery } from '../../store/services/apiService';

import AddParentModal from './Modals/AddParentModal';

const ParentsList = () => {
  const navigate = useNavigate();
  const { handleOpenModal, openModal, handleCloseModal } = useToggleModal();
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  const { data: parents, isLoading, isFetching,error } = useGetParentsQuery();

  // console.log('Parents:', error);


//   const handleDelete = async (id: string) => {
//     try {
//       await deleteParent(id).unwrap();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Failed to delete parent:', error);
//     }
//   };

  const handleViewServices = (parentId: string) => {
    navigate(`/parents/${parentId}/services`);
  };

  const handleEdit = (parent: Parent) => {
    setSelectedParent(parent);
    handleOpenModal("EDIT-PARENT", parent.id);
  };

  const handleConfirmDelete = (parent: Parent) => {
    setSelectedParent(parent);
    handleOpenModal("DELETE-PARENT", parent.id);
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
          <span>Parents</span>
        </li>
      </ul>
      
      <div className="panel my-4">
        <h1 className="text-3xl">Service Parents</h1>
      </div>
      
      <div className="panel mt-6">
        <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
          <div className="flex items-center gap-5">
            <div className="md:flex-auto flex-1"></div>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <button 
              className="btn btn-primary" 
              onClick={() => {
                setSelectedParent(null);
                handleOpenModal("ADD-PARENT", "");
              }}
            >
              Add Parent
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
            records={parents || []}
            columns={[
              {
                accessor: 'name',
                title: 'Parent Name',
                sortable: true,
              },
              {
                accessor: 'services',
                title: 'Services Count',
                render: (row) => (
                  <span className="badge bg-success">{row.services?.length || 0}</span>
                ),
              },
              {
                accessor: 'id',
                title: 'Action',
                render: (row) => (
                  <div className="flex gap-2 items-center">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleViewServices(row.id)}
                    >
                      View Services
                    </button>
                    {/* <button 
                      type="button" 
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleEdit(row)}
                    >
                      <IconEdit className="w-4 h-4" />
                    </button> */}
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
            totalRecords={parents?.length || 0}
            minHeight={200}
            emptyState={
              <div className="flex flex-col items-center p-4">
                <div className="text-lg font-medium">No parents found</div>
                <div className="text-sm text-gray-500">Add a parent to get started</div>
              </div>
            }
            page={1}
            onPageChange={() => {}}
            recordsPerPage={10}
            onRecordsPerPageChange={() => {}}
            recordsPerPageOptions={[10, 20, 50]}
          />
        </div>
      </div>

      {/* Add/Edit Parent Modal */}
      {openModal.isOpen && (openModal.modalName === "ADD-PARENT" || openModal.modalName === "EDIT-PARENT") && (
        <AddParentModal
          openModal={openModal}
           
          handleCloseModal={handleCloseModal} 
         
        />
      )}

{/*    
      {openModal.isOpen && openModal.modalName === "DELETE-PARENT" && selectedParent && (
        <DeleteConfirmationModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
         
        />
      )} */}
    </div>
  );
};

export default ParentsList;