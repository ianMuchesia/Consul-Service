import React from 'react';
import { ClientType } from '../../@types/client';
import { formatDate } from '../../utils';

interface ClientDetailsProps {
    client: ClientType;
}

const ClientDetails = ({ client }: ClientDetailsProps) => {
    
    return (
        <div className="panel">
            <div className="mb-5">
                <h5 className="font-semibold text-lg mb-4">Client Details</h5>
                <p>
                    All details of this client are listed here. 
                </p>
            </div>
            
            <div className="mb-5">
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">FirstName</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.firstName}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Middle Name</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.middleName || "N/A"}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Last Name</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.lastName}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Address</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.address}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Nationality</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.nationality || "N/A"}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Phone Number</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.phoneNumber}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Email</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.email || "N/A"}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">FirstName</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.firstName}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Identification Type</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{client.IDType}</span>
                        </div>
                    </div>
                </div>
                <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                    <div className="flex items-start justify-between py-3">
                        <h6 className="text-[#515365] font-bold dark:text-white-dark text-[15px]">Registration Date</h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                            <span className="block text-white-dark dark:text-white-light font-normal ">{formatDate(client.createdAt)}</span>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
    );
};

export default ClientDetails;
