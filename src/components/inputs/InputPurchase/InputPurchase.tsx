import { ChangeEventHandler, PropsWithChildren } from 'react';

import styles from './InputPurchase.module.scss';

interface InputPurchaseProps {
    name: string;
    type: string;
    edit: boolean;
    value: string | number;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function InputPurchase(props: PropsWithChildren<InputPurchaseProps>): JSX.Element {
    const { name, type, edit, value, onChange } = props;

    return (
        <>
            {
                edit 
                ? <input className={type == 'number' ? styles.input_purchase : ''} name={name} type={type} value={value} onChange={onChange} /> 
                : <div className={styles.value}>{value}</div>
            }
        </>
    );
}

export { InputPurchase };