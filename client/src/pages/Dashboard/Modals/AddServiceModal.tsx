// src/pages/Dashboard/AddServiceModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ServiceFormData, TagField } from '../../../@types/services';
import { useCreateParentWithServicesMutation, useCreateServiceMutation, useGetServiceByIdQuery, useUpdateServiceMutation } from '../../../store/services/apiService';
import IconX from '../../../components/Icon/IconX';
import IconLoader from '../../../components/Icon/IconLoader';

interface Props {
    openModal: {
        isOpen: boolean;
        modalName: string;
        id: string;
    };
    handleCloseModal: () => void;
    parentName?: string; // Optional parent name for prefilling or creating within parent
    // Optional parent name for prefilling or creating within parent
}

const AddServiceModal = ({ openModal, handleCloseModal, parentName }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors },
    } = useForm<ServiceFormData>({
        defaultValues: {
            Name: parentName || '',
            ID: '',
            Address: '',
            Port: 8080,
            tags: [],
            Meta: {},
            Check: {
                HTTP: '',
                Interval: '10s',
                Timeout: '5s',
            },
        },
    });

    const { data: service, isLoading: isServiceLoading } = useGetServiceByIdQuery(openModal.id, {
        skip: !openModal.isOpen || openModal.modalName !== 'EDIT-SERVICE',
    });

    console.log('Service data:', service);
    const [createService, { isLoading: isCreatingService }] = useCreateServiceMutation();
    const [createParentWithServices, { isLoading: isCreatingWithParent }] = useCreateParentWithServicesMutation();
    const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

    const isLoading = isCreatingService || isCreatingWithParent || isUpdating;
    const isEditMode = openModal.modalName === 'EDIT-SERVICE';

    // Field arrays for dynamic fields
    const {
        fields: tagFields,
        append: appendTag,
        remove: removeTag,
    } = useFieldArray<ServiceFormData, 'tags', 'id'>({
        control,
        name: 'tags',
    });

    const [metaEntries, setMetaEntries] = useState<Array<{ key: string; value: string }>>([]);
    const [checkEntries, setCheckEntries] = useState<Array<{ key: string; value: string }>>([
        { key: 'HTTP', value: '' },
        { key: 'Interval', value: '10s' },
        { key: 'Timeout', value: '5s' },
    ]);
    const [hasInitializedTags, setHasInitializedTags] = useState(false);


    useEffect(() => {
        if (isServiceLoading || !isEditMode || !service) return;

        // Set basic form fields
        setValue('Name', service.aid);
        setValue('ID', service.id);
        setValue('Address', service.address);
        setValue('Port', service.port);

        // Handle tags - completely reset them to avoid duplications
        // Only set tags once on initial load
         // Initialize tags ONLY ONCE
    if (!hasInitializedTags && service.tags && Array.isArray(service.tags)) {
        // Clear any existing tags (just in case)
        setValue('tags', []);
        
        // Add all tags from service in a single operation
        const tagObjects = service.tags.map(tag => ({
            id: `tag-${Date.now()}-${Math.random()}`,
            value: tag
        }));
        setValue('tags', tagObjects);
        
        // Mark tags as initialized so we don't do this again
        setHasInitializedTags(true);
    }
        // Set meta entries
        if (service.meta) {
            const metaKeys = Object.keys(service.meta);
            const newMetaEntries = metaKeys.map((key) => ({
                key,
                value: service.meta?.[key] || '',
            }));
            setMetaEntries(newMetaEntries);
        }

        // Set check entries
        if (service.check) {
            const checkKeys = Object.keys(service.check);
            const newCheckEntries = checkKeys.map((key) => ({
                key,
                value: service.check?.[key] || '',
            }));
            setCheckEntries(
                newCheckEntries.length
                    ? newCheckEntries
                    : [
                          { key: 'HTTP', value: '' },
                          { key: 'Interval', value: '10s' },
                          { key: 'Timeout', value: '5s' },
                      ]
            );
        }
    }, [isEditMode, service, isServiceLoading, setValue, tagFields]);

    console.log('Tag fields outside use effect:', tagFields);

    const addMetaEntry = () => {
        setMetaEntries([...metaEntries, { key: '', value: '' }]);
    };

    const removeMetaEntry = (index: number) => {
        const updatedEntries = [...metaEntries];
        updatedEntries.splice(index, 1);
        setMetaEntries(updatedEntries);
    };

    const updateMetaEntry = (index: number, field: 'key' | 'value', value: string) => {
        const updatedEntries = [...metaEntries];
        updatedEntries[index][field] = value;
        setMetaEntries(updatedEntries);
    };

    const addCheckEntry = () => {
        setCheckEntries([...checkEntries, { key: '', value: '' }]);
    };

    const removeCheckEntry = (index: number) => {
        // Keep at least the standard check fields
        if (checkEntries.length <= 3) return;

        const updatedEntries = [...checkEntries];
        updatedEntries.splice(index, 1);
        setCheckEntries(updatedEntries);
    };

    const updateCheckEntry = (index: number, field: 'key' | 'value', value: string) => {
        const updatedEntries = [...checkEntries];
        updatedEntries[index][field] = value;
        setCheckEntries(updatedEntries);
    };

    const handleAddService = async (data: ServiceFormData) => {
        try {
            // Process meta data from entries
            const metaObject: Record<string, string> = {};
            metaEntries.forEach((entry) => {
                if (entry.key.trim()) {
                    metaObject[entry.key] = entry.value;
                }
            });

            data.Meta = metaObject;

            // Process check data from entries
            const checkObject: Record<string, string> = {};
            checkEntries.forEach((entry) => {
                if (entry.key.trim()) {
                    checkObject[entry.key] = entry.value;
                }
            });

            data.Check = checkObject;

            console.log(tagFields);
            // Convert tag fields to simple string array
            data.tags = tagFields.map((field) => field.value) as unknown as TagField[];

            console.log(data.tags);

            if (isEditMode && service) {
                // Update existing service
                await updateService({
                    id: service.service_id,
                    data,
                }).unwrap();
                toast.success('Service updated successfully');
            } else if (parentName) {
                // Add service to existing parent
                await createService(data).unwrap();
                toast.success('Service created successfully');
            } else {
                // Create new parent with service
                await createParentWithServices(data).unwrap();
                toast.success('Service and parent created successfully');
            }

            reset();
            setMetaEntries([]);
            setCheckEntries([
                { key: 'HTTP', value: '' },
                { key: 'Interval', value: '10s' },
                { key: 'Timeout', value: '5s' },
            ]);
            handleCloseModal();
        } catch (error: any) {
            toast.error(error.data?.message || 'Failed to process service');
            console.error(error);
        }
    };

    const handleDiscard = () => {
        reset();
        setMetaEntries([]);
        setCheckEntries([
            { key: 'HTTP', value: '' },
            { key: 'Interval', value: '10s' },
            { key: 'Timeout', value: '5s' },
        ]);
        handleCloseModal();
    };

    return (
        <Transition appear show={openModal.isOpen && (openModal.modalName === 'ADD-SERVICE' || openModal.modalName === 'EDIT-SERVICE')} as={Fragment}>
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
                                    <h5 className="font-bold text-lg">{isEditMode ? 'Edit Service' : 'Add New Service'}</h5>
                                    <button type="button" className="text-white-dark hover:text-dark" onClick={handleCloseModal}>
                                        <IconX className="w-5 h-5" />
                                    </button>
                                </div>
                                <form className="p-5" onSubmit={handleSubmit(handleAddService)}>
                                    <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                                        {/* Name Field */}
                                        <div className={`${errors.Name && 'has-error'}`}>
                                            <label htmlFor="Name" className="form-label">
                                                Parent Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                {...register('Name', {
                                                    required: 'Parent name is required',
                                                })}
                                                type="text"
                                                placeholder="Enter parent name..."
                                                className="form-input"
                                                disabled={!!parentName} // Disable if parent name is provided
                                            />
                                            {errors.Name && <span className="text-red-500 text-xs">{errors.Name.message}</span>}
                                        </div>

                                        {/* ID Field */}
                                        <div className={`${errors.ID && 'has-error'}`}>
                                            <label htmlFor="ID" className="form-label">
                                                Service ID <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                {...register('ID', {
                                                    required: 'Service ID is required',
                                                })}
                                                type="text"
                                                placeholder="Enter service ID..."
                                                className="form-input"
                                                disabled={isEditMode} // Disable editing ID in edit mode
                                            />
                                            {errors.ID && <span className="text-red-500 text-xs">{errors.ID.message}</span>}
                                        </div>

                                        {/* Address Field */}
                                        <div className={`${errors.Address && 'has-error'}`}>
                                            <label htmlFor="Address" className="form-label">
                                                Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                {...register('Address', {
                                                    required: 'Address is required',
                                                })}
                                                type="text"
                                                placeholder="Enter service address..."
                                                className="form-input"
                                            />
                                            {errors.Address && <span className="text-red-500 text-xs">{errors.Address.message}</span>}
                                        </div>

                                        {/* Port Field */}
                                        <div className={`${errors.Port && 'has-error'}`}>
                                            <label htmlFor="Port" className="form-label">
                                                Port <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                {...register('Port', {
                                                    required: 'Port is required',
                                                    valueAsNumber: true,
                                                    validate: (value) => (!isNaN(value) && value > 0) || 'Port must be a positive number',
                                                })}
                                                type="number"
                                                placeholder="Enter port number..."
                                                className="form-input"
                                            />
                                            {errors.Port && <span className="text-red-500 text-xs">{errors.Port.message}</span>}
                                        </div>

                                        {/* Tags Field */}
                                        <div>
                                            <label className="form-label">Tags</label>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {tagFields.map((field, index) => (
                                                    <div key={field.id} className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                        <span className="mr-2">{field.value}</span>
                                                        <button type="button" onClick={() => removeTag(index)} className="text-red-500 text-sm">
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="text" className="form-input flex-1" placeholder="Add a tag..." id="new-tag" />
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => {
                                                        const input = document.getElementById('new-tag') as HTMLInputElement;
                                                        if (input.value.trim()) {
                                                            appendTag({
                                                                id: `tag-${Date.now()}`,
                                                                value: input.value.trim(),
                                                            });
                                                            input.value = '';
                                                        }
                                                    }}
                                                >
                                                    Add Tag
                                                </button>
                                            </div>
                                        </div>

                                        {/* Meta Object Field */}
                                        <div>
                                            <label className="form-label">Meta Data</label>
                                            {metaEntries.map((entry, index) => (
                                                <div key={index} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-input w-1/3"
                                                        placeholder="Key"
                                                        value={entry.key}
                                                        onChange={(e) => updateMetaEntry(index, 'key', e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="form-input flex-1"
                                                        placeholder="Value"
                                                        value={entry.value}
                                                        onChange={(e) => updateMetaEntry(index, 'value', e.target.value)}
                                                    />
                                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => removeMetaEntry(index)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addMetaEntry}>
                                                Add Meta Entry
                                            </button>
                                        </div>

                                        {/* Check Fields */}
                                        <div className="mt-2">
                                            <label className="form-label">
                                                Health Check <span className="text-red-500">*</span>
                                            </label>
                                            <div className="border border-gray-200 dark:border-gray-700 rounded p-3 mt-2">
                                                {checkEntries.map((entry, index) => (
                                                    <div key={index} className="flex gap-2 mb-2">
                                                        <input
                                                            type="text"
                                                            className="form-input w-1/3"
                                                            placeholder="Key"
                                                            value={entry.key}
                                                            onChange={(e) => updateCheckEntry(index, 'key', e.target.value)}
                                                            readOnly={index < 3} // Make default keys (HTTP, Interval, Timeout) readonly
                                                        />
                                                        <input
                                                            type="text"
                                                            className="form-input flex-1"
                                                            placeholder="Value"
                                                            value={entry.value}
                                                            onChange={(e) => updateCheckEntry(index, 'value', e.target.value)}
                                                        />
                                                        {index >= 3 && (
                                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => removeCheckEntry(index)}>
                                                                Remove
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addCheckEntry}>
                                                    Add Check Parameter
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center gap-2 mt-6">
                                        <button type="button" className="btn btn-outline-primary" onClick={handleDiscard} disabled={isLoading}>
                                            Discard
                                        </button>
                                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <IconLoader className="animate-spin w-4 h-4" />
                                                    {isEditMode ? 'Updating...' : 'Creating...'}
                                                </span>
                                            ) : isEditMode ? (
                                                'Update Service'
                                            ) : (
                                                'Create Service'
                                            )}
                                        </button>
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

export default AddServiceModal;
