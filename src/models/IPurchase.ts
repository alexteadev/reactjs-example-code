import { PurchaseType } from "./PurchaseType";

export interface IPurchase {
    purchaseListId: string;
    name: string;
    purchased?: boolean;
    price?: number;
    amount?: number;
    amountPurchase?: number;
    type?: PurchaseType;
    _id: string;
    createdAt: string;
}