import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IList } from '../../models/IList';

export const listAPI = createApi({
    reducerPath: 'listAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        credentials: "include",
    }),
    tagTypes: ['List'],
    endpoints: (build) => ({
        fetchAll: build.query<IList[], void>({
            query: () => ({
                url: ''
            }),
            providesTags: result => ['List']
        }),
        getById: build.query<IList, IList>({
            query: (list) => ({
                url: `/${list._id}`,
            })
        }),
        create: build.mutation<IList, IList>({
            query: (list) => ({
                url: '',
                method: 'POST',
                body: list
            }),
            invalidatesTags: ['List'],
        }),
        update: build.mutation<IList, IList>({
            query: (list) => ({
                url: `/${list._id}`,
                method: 'PATCH',
                body: list
            }),
            invalidatesTags: ['List']
        }),
        delete: build.mutation<IList, IList>({
            query: (list) => ({
                url: `/${list._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['List']
        }),
        findByName: build.query<IList, IList>({
            query: (list) => ({
                url: `byname/${list.type}/${list.name}`,
            })
        }),
        findById: build.query<IList, string>({
            query: (listId) => {
                if (listId) {
                    return `byid/${listId}`;
                } else {
                    return '';
                }
            },
        }),
    }),
});