import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useToggleModal } from '../../utils'
import IconX from '../../components/Icon/IconX'
import { useDeleteUserMutation, useGetUsersQuery } from '../../store/services/userService'
import toast from 'react-hot-toast'
import IconLoader from '../../components/Icon/IconLoader'

interface DeleteModalProps {
    openModal: {
        isOpen: boolean;
        modalName: string;
        id: string;
    }   
    handleCloseModal: () => void;
    
}

const DeleteModal = ({openModal,handleCloseModal}:DeleteModalProps) => {

    const [ deleteUser, { isLoading} ] = useDeleteUserMutation()


    const handleDeleteUser = async() => {
        try {
            const res = await deleteUser(openModal.id).unwrap()
            if (res.message === 'Success') {
                toast.success(res.responseEntity);
                handleCloseModal()
                
            }
            
        } catch (error:any) {
            if (error?.data) {
                toast.error(error.data.message);
            } else {
                toast.error('Something wrong happened');
                console.log(error);
            }
            
        }
    }
   
  return (
    <Transition appear show={openModal.isOpen && openModal.modalName === "DELETE-USER"} as={Fragment}>
    <Dialog as="div" open={openModal.isOpen && openModal.modalName === "DELETE-USER"} onClose={handleCloseModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
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
                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark" >
                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                            <h5 className="font-bold text-lg">Delete User</h5>
                            <button type="button" className="text-white-dark hover:text-dark" onClick={handleCloseModal}>
                                
                                <IconX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5">
                            <p>
                                Are you sure you want to delete this user? This action <span className='text-danger'>CANNOT</span> be undone.
                            </p>
                            <div className="flex justify-end items-center mt-8">
                                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>
                                    Discard
                                </button>
                                <button  className="btn btn-outline-danger ltr:ml-4 rtl:mr-4" onClick={handleDeleteUser}>
                                {isLoading ? (
                                    <span className="flex gap-4">
                                        <IconLoader />
                                        Deleting...
                                    </span>
                                ) : (
                                    'Delete User'
                                )}
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </div>
    </Dialog>
</Transition>
  )
}

export default DeleteModal