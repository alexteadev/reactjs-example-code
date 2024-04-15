import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { INewUser } from '../../models/INewUser';

export interface User {
    email: string;
    sub: string;
    createdAt: string;
}

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api'
    }),
    endpoints: (build) => ({
        create: build.mutation<INewUser, INewUser>({
            query: (user) => ({
                url: `auth/register`,
                method: 'POST',
                body: user
            }),
        }),
        me: build.query<User, void>({
            query: () => ({
                url: `users/me`,
                credentials: "include",
            }),
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: `auth/logout`,
                method: 'POST',
                credentials: "include",
            }),
        }),
    })
});