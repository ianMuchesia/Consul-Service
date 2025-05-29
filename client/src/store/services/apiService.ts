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
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Parent' as const, id })),
              { type: 'Parent', id: 'LIST' }
            ]
          : [{ type: 'Parent', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'Parent', id: 'LIST' }],
    }),
    
    createParentWithServices: builder.mutation<Parent, ServiceFormData>({
      query: (data) => ({
        url: '/parents/with-services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Parent', id: 'LIST' },
        { type: 'Service', id: 'LIST' }
      ],
    }),
    
    // Service endpoints
    getServices: builder.query<Service[], void>({
      query: () => '/services',
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ service_id }) => ({ type: 'Service' as const, id: service_id })),
              { type: 'Service', id: 'LIST' }
            ]
          : [{ type: 'Service', id: 'LIST' }],
    }),
    
    getServiceById: builder.query<Service, string>({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: 'Service', id }],
    }),
    
    getServicesByParentId: builder.query<Service[], string>({
      query: (parentId) => `/services/parent/${parentId}`,
      providesTags: (result, error, parentId) => 
        result
          ? [
              ...result.map(({ service_id }) => ({ type: 'Service' as const, id: service_id })),
              { type: 'Service', id: `parent-${parentId}` }
            ]
          : [{ type: 'Service', id: `parent-${parentId}` }],
    }),
    
    createService: builder.mutation<Service, ServiceFormData>({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
        invalidatesTags: [
        { type: 'Parent', id: 'LIST' },
        { type: 'Service', id: 'LIST' }
      ],
    }),
    
    updateService: builder.mutation<Service, { id: string; data: Partial<ServiceFormData> }>({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Service', id }],
    }),
    
    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Service', id },
        { type: 'Service', id: 'LIST' }
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