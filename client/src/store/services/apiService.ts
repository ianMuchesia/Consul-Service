import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Parent, Service, ServiceFormData } from '../../@types/services';
import { baseURL, serverURL } from '../../baseURL';

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  tagTypes: ['Parent', 'Service'],
  endpoints: (builder) => ({
    // Parent endpoints
    getParents: builder.query<Parent[], void>({
      query: () => '/parents',
      providesTags:["Parent"]
    }),
    
    getParentById: builder.query<Parent, string>({
      query: (id) => `/parents/${id}`,
      providesTags: (result, error, id) => [{ type: 'Parent', id }],
    }),
    
    createParent: builder.mutation<Parent, { Name: string }>({
      query: (data) => ({
        url: '/parents',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Parent"],
    }),
    
    createParentWithServices: builder.mutation<Parent, ServiceFormData>({
      query: (data) => ({
        url: '/parents/with-services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
      "Parent", "Service"
      ],
    }),
    
    // Service endpoints
    getServices: builder.query<Service[], void>({
      query: () => '/services',
      providesTags: ["Service"]
    }),
    
    getServiceById: builder.query<Service, string>({
      query: (id) => `/services/${id}`,
      providesTags: ["Service"]
    }),
    
    getServicesByParentId: builder.query<Service[], string>({
      query: (parentId) => `/services/parent/${parentId}`,
      providesTags: ["Service"]
    }),
    
    createService: builder.mutation<Service, ServiceFormData>({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
        invalidatesTags: [
       "Service", "Parent"
      ],
    }),
    
    updateService: builder.mutation<Service, { id: string; data: Partial<ServiceFormData> }>({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ["Service"]
    }),
    
    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
       "Service", "Parent" // Assuming deleting a service might affect the parent as well
      ],
    }),
  }),
});

// Export hooks for using the endpoints
export const {
  // Parent hooks
  useGetParentsQuery,
  useGetParentByIdQuery,
  useCreateParentMutation,
  useCreateParentWithServicesMutation,
  
  // Service hooks
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetServicesByParentIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = apiService;