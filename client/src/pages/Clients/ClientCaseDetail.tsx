import React from 'react'
import { CaseType } from '../../@types/case'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ClientCaseDetailProps{
    caseRecords: CaseType[];
    clientId: string;
}
const ClientCaseDetail = ({caseRecords,clientId}:ClientCaseDetailProps) => {

    const navigate = useNavigate()
  
  return (
    <div className="panel">
    <div className="mb-5">
        <h5 className="font-semibold text-lg mb-4">Cases</h5>
        <p>
           All cases related to this client are listed here. You can view the details of each case by clicking on the view button.
        </p>
    </div>
    <div className="mb-5">
       
        {
            caseRecords.map(record=>(
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]" key={record.id}>
                <div className="flex items-start justify-between py-3 gap-4">
                    
                    <h6 className="text-[#515365] font-bold uppercase dark:text-white-dark text-[15px]">
                        {record.status}
                        <span className="block text-white-dark dark:text-white-light font-normal text-xs mt-1  lowercase">{record.notes}</span>
                    </h6>
                    <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                        <button className="btn btn-dark" onClick={()=>{navigate(`/cases/${record.id}`)}}>View</button>
                    </div>
                </div>
            </div>
            ))
        }
    </div>
    <button className="btn btn-primary" onClick={()=>{navigate(`/add-case/${clientId}  `)}}>Add New Case</button>
</div>
  )
}

export default ClientCaseDetail