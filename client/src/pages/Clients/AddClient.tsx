import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClientForm from './ClientForm'
import { useCreateClientMutation } from '../../store/services/clientService'
import toast from 'react-hot-toast'
import { ClientInput } from '../../@types/client'

const AddClient = () => {

  const navigate = useNavigate()
  const [ submitClient, {isLoading}] = useCreateClientMutation()

  const onSubmit = async(data: ClientInput) => {
    try {
      const res = await submitClient(data).unwrap()
      if(res.message === "Success")
      {
        toast.success("Client added successfully")
        navigate("/clients")
      }
    } catch (error:any) {
      console.log(error)
      if(error?.data)
      {
        toast.error(error.data.message)
      }else{
        toast.error("Something wrong happened")
        console.log(error)
      }

      
    }
  }
  return (
<div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/clients" className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        Clients
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add Client</span>
                </li>
            </ul>
            <div className="">
      <div className="panel p-5 mt-10  mx-auto">
        <ClientForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default AddClient