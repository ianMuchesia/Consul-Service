import { useForm } from 'react-hook-form';
import { ClientInput } from '../../@types/client';
import IconLoader from '../../components/Icon/IconLoader';

interface ClientFormProps {
    clientFormData?: ClientInput;
    onSubmit: (data: ClientInput) => void;
    isLoading: boolean;
}

const ClientForm = ({ clientFormData, onSubmit, isLoading }: ClientFormProps) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientInput>({
        defaultValues: {
            firstName: clientFormData?.firstName || '',
            middleName: clientFormData?.middleName || '',
            lastName: clientFormData?.lastName || '',
            phoneNumber: clientFormData?.phoneNumber || '',
            IDType: clientFormData?.IDType || '',
            IDNumber: clientFormData?.IDNumber || '',
            notes: clientFormData?.notes || '',
            nationality: clientFormData?.nationality || '',
            email: clientFormData?.email || '',
            address: clientFormData?.address || '',
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div className={`${errors.firstName && 'has-error'} mb-5`}>
                    <label htmlFor="firstName">
                        First Name<sup className="text-danger">*</sup>
                    </label>
                    <input {...register('firstName', { required: true })} autoComplete="off" id="firstName" type="text" placeholder="Enter First Name" className="form-input" />
                </div>
                <div className={` mb-5`}>
                    <label htmlFor="middleName">Middle Name</label>
                    <input {...register('middleName', { required: false })} id="middleName" type="text" placeholder="Enter Middle Name" className="form-input" autoComplete="off" />
                </div>
                <div className={`${errors.lastName && 'has-error'} mb-5`}>
                    <label htmlFor="lastName">
                        Last Name<sup className="text-danger">*</sup>
                    </label>
                    <input {...register('lastName', { required: true })} autoComplete="off" id="name" type="text" placeholder="Enter Last Name" className="form-input" />
                </div>
                <div className={`${errors.email && 'has-error'} mb-5`}>
                    <label htmlFor="email">Email</label>
                    <input id="email" {...register('email', { required: false,
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid Email',
                        },
                    })} autoComplete="off" type="email" placeholder="Enter Email" className="form-input" />
                    {
                        errors.email && <p className="text-danger">{errors.email.message}</p>
                    }
                </div>
                <div className={`${errors.phoneNumber && 'has-error'} mb-5`}>
                    <label htmlFor="phone">
                        Phone Number<sup className="text-danger">*</sup>
                    </label>
                    <input
                        id="phone"
                        {...register('phoneNumber', {
                            required: true,
                            pattern: {
                                value: /^0\d{9}$/,
                                message: 'Invalid Phone Number',
                            },

                        })}
                        autoComplete="off"
                        type="text"
                        placeholder="Enter Phone Number"
                        className="form-input"
                    />
                    {
                        errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>
                    }
                </div>

                <div className={`${errors.address && 'has-error'} mb-5`}>
                    <label htmlFor="address">
                        Address<sup className="text-danger">*</sup>
                    </label>
                    <input id="address" {...register('address', { required: true })} autoComplete="off" type="text" placeholder="Enter Address" className="form-input" />
                </div>

                <div className={`${errors.IDType && 'has-error'} mb-5`}>
                    <label htmlFor="IdType" className="form-label">
                        Id Type<sup className="text-danger">*</sup>
                    </label>
                    <select {...register('IDType', { required: true })} autoComplete="off" id="IdType" className="form-select">
                        <option value="NationalId">National Id</option>
                        <option value="Passport">Passport</option>
                    </select>
                </div>

                <div className={`${errors.IDNumber && 'has-error'} mb-5`}>
                    <label htmlFor="idNumber" className="form-label">
                        Id Number<sup className="text-danger">*</sup>{' '}
                    </label>
                    <input {...register('IDNumber', { required: true })} autoComplete="off" type="text" className="form-input" placeholder="Id Number" />
                </div>
                <div className={`${errors.nationality && 'has-error'} mb-5`}>
                    <label htmlFor="idNumber" className="form-label">
                        Nationality<sup className="text-danger">*</sup>{' '}
                    </label>
                    <input {...register('nationality', { required: true })} autoComplete="off" type="text" className="form-input" placeholder="Nationality" />
                </div>
                {!clientFormData?.firstName && (
                    <div className={`${errors.notes && 'has-error'} mb-5`}>
                        <label htmlFor="notes" className="form-label">
                            Matter Presented<sup className="text-danger">*</sup>
                        </label>
                        <textarea {...register('notes', { required: !clientFormData?.firstName })} autoComplete="off" id="notes" cols={30} rows={10} className="form-textarea"></textarea>
                    </div>
                )}
            </div>
            <div className="flex justify-end items-center mt-8">
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                        reset();
                    }}
                >
                    Cancel
                </button>
                <button className="btn btn-primary ltr:ml-4 rtl:mr-4">
                    {isLoading ? (
                        <span className="flex gap-4">
                            <IconLoader />
                            loading...
                        </span>
                    ) : (
                        'Save'
                    )}
                </button>
            </div>
        </form>
    );
};

export default ClientForm;
