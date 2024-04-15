import { purchaseAPI } from "../../services/api/PurchaseServices";
import PurchaseItem from "./PurchaseItem";
import styles from './styles/PurchaseList.module.scss';
import { IPurchase } from '../../models/IPurchase';
import { PropsWithChildren, useState } from "react";
import { ButtonPurchase, ButtonPurchaseType } from "../../components";
import { PurchaseType } from "../../models/PurchaseType";

interface ListProps {
    listId: string;
}

function PurchaseList(props: PropsWithChildren<ListProps>) {

    const { listId } = props;

    const { data: purchases, error, isLoading } = purchaseAPI.useFetchAllQuery(listId);

    const [createPurchase, { }] = purchaseAPI.useCreateMutation();

    const [name, setName] = useState<string>('');
    const [type, setType] = useState<PurchaseType>(PurchaseType.Count);
    const [amount, setAmount] = useState<number | string>('');
    const [amountPurchase, setAmountPurchase] = useState<number | string>('');
    const [price, setPrice] = useState<number | string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleAmountPurchaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPurchase(Number(e.target.value));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as PurchaseType);
    };

    const handleCreate = async () => {
        await createPurchase({ purchaseListId: listId, name, price, amount, amountPurchase, type } as IPurchase);
        setName('');
        setAmount('');
        setPrice('');
        setAmountPurchase('');
        setType(PurchaseType.Count);
    }

    const totalPrice = purchases && purchases.reduce((acc, item) => { return acc + (item.price ? item.price : 0); }, 0);

    return (
        <>
            <table className={styles.purchase_list}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Amount Purchase</th>
                        <th>Type</th>
                        <th>Price: {totalPrice}</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input name="name" type="text" value={name} onChange={handleNameChange} /></td>
                        <td><input className={styles.number_width} name="amount" type="number" value={amount} onChange={handleAmountChange} /></td>
                        <td><input className={styles.number_width} name="amountPurchase" type="number" value={amountPurchase} onChange={handleAmountPurchaseChange}/></td>
                        <td>
                            <select name="type" value={type} onChange={handleTypeChange}>
                                <option value={PurchaseType.Count}>{PurchaseType.Count}</option>
                                <option value={PurchaseType.Kg}>{PurchaseType.Kg}</option>
                                <option value={PurchaseType.Litr}>{PurchaseType.Litr}</option>
                                <option value={PurchaseType.Pound}>{PurchaseType.Pound}</option>
                                <option value={PurchaseType.Gallon}>{PurchaseType.Gallon}</option>
                                <option value={PurchaseType.Another}>{PurchaseType.Another}</option> 
                            </select>
                        </td>
                        <td><input className={styles.number_width} name="price" type="number" value={price} onChange={handlePriceChange} /></td>
                        <td></td>
                        <td></td>
                        <td><ButtonPurchase text="Create" type={ButtonPurchaseType.CREATE} onClick={handleCreate} /></td>
                    </tr>
                    {purchases && purchases.map((purchase, i) =>
                        <PurchaseItem key={purchase._id} purchase={purchase} iterable={i} />
                    )}
                </tbody>
            </table >
        </>
    );
}

export default PurchaseList;