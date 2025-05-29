// src/pages/Dashboard/DeleteConfirmationModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import IconX from '../../../components/Icon/IconX';
import { useDeleteServiceMutation } from '../../../store/services/apiService';
import toast from 'react-hot-toast';
import IconLoader from '../../../components/Icon/IconLoader';


interface Props {
  openModal: {
    isOpen: boolean;
    modalName: string;
    id: string;
  };
  handleCloseModal: () => void;

}

const DeleteConfirmationModal = ({ openModal, handleCloseModal }: Props) => {

  const [deleteService, { isLoading }] = useDeleteServiceMutation();


  const handleDelete = async () => {
    try {
      await deleteService(openModal.id).unwrap();
      toast.success('Service deleted successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };
  return (
    <Transition appear show={openModal.isOpen && (openModal.modalName == 'DELETE-SERVICE')} as={Fragment}>
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
              <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-md my-8 text-black dark:text-white-dark">
                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                  <h5 className="font-bold text-lg">
                    Delete Confirmation
                  </h5>
                  <button type="button" className="text-white-dark hover:text-dark" onClick={handleCloseModal}>
                    <IconX className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex flex-col gap-4">
                    <p>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>

                    <div className="flex justify-end items-center gap-4 mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleCloseModal}
                        disabled={false}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <IconLoader className="animate-spin w-4 h-4" />
                            Deleting...
                          </span>
                        ) : (
                          'Delete'
                        )}
                       
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteConfirmationModal;