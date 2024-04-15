import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { IError } from "../models/IError";

type ErrorList = {
    [key: string]: string;
};

const errorMessages: ErrorList = {
    'InterServError': 'Internal server error',
    'PassOrEmailNotCorrect': 'Your Password or Email is not correct',
};

function getErrorText(errorCode: string): string {
    return errorMessages[errorCode] || 'unidentified error';
}

export function handleError(result: FetchBaseQueryError | SerializedError) {
    const errorResponse = result as | IError | undefined;

    if (errorResponse) {
        return getErrorText(errorResponse.data.errorCode);
    }

    return 'unidentified error';
}