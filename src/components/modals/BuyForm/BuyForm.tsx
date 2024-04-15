import React, { ChangeEvent, Dispatch, FC, MouseEventHandler, SetStateAction, useEffect } from 'react';
import styles from './BuyForm.module.scss';
import { ButtonPurchase, ButtonPurchaseType } from '../..';
import { Range, getTrackBackground } from 'react-range';

interface BuyFormProps {
    title: string;
    currentValue: number;
    amount: number;
    nameItem: string;
    setActive: Dispatch<SetStateAction<boolean>>;
    handleAction: MouseEventHandler<HTMLButtonElement>;
    setAmount: Dispatch<SetStateAction<number>>;
}

const BuyForm: FC<BuyFormProps> = ({ title, currentValue, amount, nameItem, setActive, handleAction, setAmount }) => {
    return (
        <div className={styles.form}>
            <div className={styles.text}>
                How much did you buy <span className={styles.item_name}>{nameItem}</span>?
            </div>

            <div className={styles.range}>
                <Range
                    step={1}
                    min={0}
                    max={amount}
                    values={[currentValue]}
                    onChange={(values) => setAmount(values[0])}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values: [currentValue],
                                    colors: ["#548BF4", "#ccc"],
                                    min: 0,
                                    max: amount
                                }),
                                alignSelf: "center"
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '28px',
                                width: '28px',
                                borderRadius: '28px',
                                backgroundColor: '#999',
                                boxShadow: "0px 2px 6px #AAA",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                color: "#fff",
                            }}
                        >
                            <div>
                                {currentValue}
                            </div>
                        </div>
                    )}
                />
            </div>

            <div className={styles.actions}>
                <ButtonPurchase text="Cancel" type={ButtonPurchaseType.CANCEL} onClick={() => setActive(false)} />
                <ButtonPurchase text="Buy" type={ButtonPurchaseType.DELETE} onClick={handleAction} />
            </div>
        </div>
    );
};

export { BuyForm };