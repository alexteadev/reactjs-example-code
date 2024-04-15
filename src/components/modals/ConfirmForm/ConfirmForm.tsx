import React, { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import styles from './ConfirmForm.module.scss';
import { ButtonPurchase, ButtonPurchaseType } from '../..';

interface ConfirmFormProps {
    title: string;
    nameItem: string | undefined;
    setActive: Dispatch<SetStateAction<boolean>>;
    handleAction: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmForm: FC<ConfirmFormProps> = ({ title, nameItem, setActive, handleAction }) => {
    return (
        <div className={styles.form}>
            <div className={styles.text}>
                Do you really want to {title} <span className={styles.item_name}>{nameItem}</span>?
            </div>

            <div className={styles.actions}>
                <ButtonPurchase text="Cancel" type={ButtonPurchaseType.CANCEL} onClick={() => setActive(false)} />
                <ButtonPurchase text="Confirm" type={ButtonPurchaseType.DELETE} onClick={handleAction} />
            </div>
        </div>
    );
};

export { ConfirmForm };