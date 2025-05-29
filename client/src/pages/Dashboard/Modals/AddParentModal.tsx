// src/pages/Dashboard/AddParentModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateParentMutation } from '../../../store/services/apiService';
import IconX from '../../../components/Icon/IconX';
import IconLoader from '../../../components/Icon/IconLoader';


interface Props {
  openModal: {
    isOpen: boolean;
    modalName: string;
    id: string;
  };
  handleCloseModal: () => void;
 
}

interface ParentFormData {
  Name: string;
}

const AddParentModal = ({ openModal, handleCloseModal }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<ParentFormData>({
    defaultValues: {
      Name: '',
    },
  });

  const [createParent, { isLoading: isCreating }] = useCreateParentMutation();
  
  
  const isLoading = isCreating;
  const isEditMode = openModal.modalName === "EDIT-PARENT";

  // Set form values when editing
  useEffect(() => {
    if (isEditMode && parent) {
      setValue('Name', parent.name);
    }
  }, [isEditMode, parent, setValue]);

  const handleAddParent = async (data: ParentFormData) => {
    try {
      
        const res =await createParent(data).unwrap();
        console.log('Parent created:', res);
        toast.success('Parent created successfully');
      
      reset();
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to process parent');
      console.error(error);
    }
  };

  const handleDiscard = () => {
    reset();
    handleCloseModal();
  };

  return (
    <Transition appear show={openModal.isOpen && (openModal.modalName === "ADD-PARENT" || openModal.modalName === "EDIT-PARENT")} as={Fragment}>
      <Dialog as="div" open={openModal.isOpen} onClose={handleCloseModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0" />
        </Transition.Child>
        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                  <h5 className="font-bold text-lg">{isEditMode ? 'Edit Parent' : 'Add New Parent'}</h5>
                  <button type="button" className="text-white-dark hover:text-dark" onClick={handleCloseModal}>
                    <IconX className="w-5 h-5" />
                  </button>
                </div>
                <form className="p-5" onSubmit={handleSubmit(handleAddParent)}>
                  <div className="flex flex-col gap-4">
                    <div className={`${errors.Name && "has-error"}`}>
                      <label htmlFor="Name" className="form-label">
                        Parent Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("Name", {
                          required: "Parent name is required",
                        })}
                        type="text"
                        placeholder="Enter parent name..."
                        className="form-input"
                      />
                      {errors.Name && (
                        <span className="text-red-500 text-xs">
                          {errors.Name.message}
                        </span>
                      )}
                    </div>

                    <div className="self-end flex justify-end items-center mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-4"
                        onClick={handleDiscard}
                        disabled={isLoading}
                      >
                        Discard
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <IconLoader className="animate-spin w-4 h-4" />
                            {isEditMode ? 'Updating...' : 'Creating...'}
                          </span>
                        ) : (
                          isEditMode ? 'Update Parent' : 'Create Parent'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddParentModal;