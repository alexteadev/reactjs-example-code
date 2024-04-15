import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin } from '../../models/ILogin';
import { IUser } from '../../models/IUser';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        // credentials: "include",
    }),
    endpoints: (build) => ({
        login: build.mutation<IUser, ILogin>({
            query: (auth) => ({
                url: `login`,
                method: 'POST',
                body: auth,
                credentials: "include",
            }),
        }),
    })
});