import React from 'react'

const useToggleModal = () => {
 
    const [ openModal, setCloseModal] = React.useState({
        modalName: '',
        isOpen: false,
        id:"",
    
    })

    const handleOpenModal = (modalName: string,id:string) => {
        setCloseModal({
            modalName,
            isOpen: true,
            id
        })
    }


    const handleCloseModal = () => {
        setCloseModal({
            modalName: '',
            isOpen: false,
            id:""
        })
    }

    return { openModal, handleOpenModal, handleCloseModal }
}

export default useToggleModal