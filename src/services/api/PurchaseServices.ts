import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPurchase } from '../../models/IPurchase';

export const purchaseAPI = createApi({
    reducerPath: 'purchaseAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/buylist',
        credentials: "include",
    }),
    tagTypes: ['Purchase'],
    endpoints: (build) => ({
        fetchAll: build.query<IPurchase[], string>({
            query: (listId) => ({
                url: `/${listId}`,
            }),
            providesTags: result => ['Purchase'],
        }),
        getById: build.query<IPurchase, IPurchase>({
            query: (purchase) => ({
                url: `/${purchase._id}`,
            })
        }),
        create: build.mutation<IPurchase, IPurchase>({
            query: (purchase) => ({
                url: ``,
                method: 'POST',
                body: purchase
            }),
            invalidatesTags: ['Purchase']
        }),
        update: build.mutation<IPurchase, IPurchase>({
            query: (purchase) => ({
                url: `/${purchase._id}`,
                method: 'PATCH',
                body: purchase
            }),
            invalidatesTags: ['Purchase']
        }),
        delete: build.mutation<IPurchase, IPurchase>({
            query: (purchase) => ({
                url: `/${purchase._id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Purchase']
        }),
        status: build.mutation<IPurchase, IPurchase>({
            query: (purchase) => ({
                url: `/status/${purchase._id}`,
                method: 'PATCH',
                body: purchase
            }),
            invalidatesTags: ['Purchase']
        }),
    })
});