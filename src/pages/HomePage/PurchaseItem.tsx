import React, { FC, useState } from 'react';
import { purchaseAPI } from "../../services/api/PurchaseServices";
import { IPurchase } from '../../models/IPurchase';
import styles from './styles/PurchaseItem.module.scss';
import { ButtonPurchase, ButtonPurchaseType, BuyForm, ConfirmForm, InputPurchase, ModalWindow, SelectPurchaseType } from '../../components';
import { PurchaseType } from '../../models/PurchaseType';

interface PurchaseItemProps {
    purchase: IPurchase;
    iterable: number;
}

const PurchaseItem: FC<PurchaseItemProps> = ({ purchase, iterable }) => {
    const [updatePurchase, { }] = purchaseAPI.useUpdateMutation();
    const [deletePurchase, { }] = purchaseAPI.useDeleteMutation();
    const [buyPurchase, { }] = purchaseAPI.useStatusMutation();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [modalBuy, setModalBuy] = useState<boolean>(false);
    const [editButtonName, setEditButtonName] = useState<string>('Edit');

    const [name, setName] = useState<string>(purchase.name);
    const [amount, setAmount] = useState<number>(purchase.amount ? purchase.amount : 0);
    const [amountPurchase, setAmountPurchase] = useState<number>(purchase.amountPurchase ? purchase.amountPurchase : 0);
    const [price, setPrice] = useState<number>(purchase.price ? purchase.price : 0);
    const [type, setType] = useState<PurchaseType>(purchase.type ? purchase.type : PurchaseType.Count);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleAmountPurchaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPurchase(Number(e.target.value));
    };

    const handlePurchaseType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as PurchaseType);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    };

    const handleRemove = (event: React.MouseEvent) => {
        deletePurchase(purchase);
        setModalDelete(false);
    }

    const handleBuy = (event: React.MouseEvent) => {
        buyPurchase({ ...purchase, amountPurchase });
        setModalBuy(false);
        // console.log('handlabuy');
        // setAmountPurchase(amount);
    }

    const handleUpdate = (event: React.MouseEvent) => {
        if (isEdit) {
            updatePurchase({ ...purchase, name, price, amount, amountPurchase, type });
            setIsEdit(false);
            setEditButtonName('Edit');
        } else {
            setIsEdit(true);
            setEditButtonName('Save');
        }
    }

    return (
        <tr className={purchase.purchased ? styles.purchased : ''}>
            <td>{iterable + 1}</td>
            <td><InputPurchase edit={isEdit} type="text" name="name" value={name} onChange={handleNameChange} /></td>
            <td><InputPurchase edit={isEdit} type="number" name="count" value={amount} onChange={handleAmountChange} /></td>
            <td><InputPurchase edit={isEdit} type="number" name="amountPurchase" value={amountPurchase} onChange={handleAmountPurchaseChange} /></td>
            <td><SelectPurchaseType edit={isEdit} name="type" value={type} onChange={handlePurchaseType} /></td>
            <td><InputPurchase edit={isEdit} type="number" name="price" value={price} onChange={handlePriceChange} /></td>
            <td>
                { !purchase.purchased ?
                    <>
                        <ModalWindow active={modalBuy} setActive={setModalBuy}>
                            <BuyForm title="buy" nameItem={name} currentValue={amountPurchase} amount={amount} setActive={setModalBuy} handleAction={handleBuy} setAmount={setAmountPurchase} />
                        </ModalWindow>
                        <ButtonPurchase text="Buy" type={ButtonPurchaseType.BUY} onClick={() => setModalBuy(true)} />
                    </>
                    : <div className={styles.purchased_title}>Purchased</div>
                }
            </td>
            <td><ButtonPurchase text={editButtonName} type={ButtonPurchaseType.EDIT} onClick={handleUpdate} /></td>
            <td>
                <ModalWindow active={modalDelete} setActive={setModalDelete}>
                    <ConfirmForm title="delete" nameItem={name} setActive={setModalDelete} handleAction={handleRemove} />
                </ModalWindow>
                <ButtonPurchase text="Delete" type={ButtonPurchaseType.DELETE} onClick={() => setModalDelete(true)} />
            </td>
        </tr>
    );
};

export default PurchaseItem;