import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { purchaseAPI } from "../services/api/PurchaseServices";
import { listAPI } from "../services/api/ListServices";
import { authAPI } from "../services/api/AuthServices";
import { userAPI } from "../services/api/UserServices";
import { counterSlice } from "./slices/counterSlice";

const rootReducer = combineReducers({
    [purchaseAPI.reducerPath]: purchaseAPI.reducer,
    [listAPI.reducerPath]: listAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    counter: counterSlice.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            purchaseAPI.middleware,
            listAPI.middleware,
            authAPI.middleware,
            userAPI.middleware
        )
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];