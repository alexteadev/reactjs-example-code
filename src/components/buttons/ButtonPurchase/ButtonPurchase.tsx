import { MouseEventHandler, PropsWithChildren } from 'react';

import styles from './ButtonPurchase.module.scss';

enum ButtonPurchaseType {
    DELETE,
    BUY,
    EDIT,
    CREATE,
    CANCEL
}

interface ButtonPurchaseProps {
    text: string;
    type: ButtonPurchaseType;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

function ButtonPurchase(props: PropsWithChildren<ButtonPurchaseProps>): JSX.Element {
    const { text, type, onClick, children } = props;

    let buttonStyle = styles.button;

    switch (type) {
        case ButtonPurchaseType.DELETE:
            buttonStyle = `${buttonStyle} ${styles.delete_button}`;
            break;
        case ButtonPurchaseType.BUY:
            buttonStyle = `${buttonStyle} ${styles.buy_button}`;
            break;
        case ButtonPurchaseType.EDIT:
            buttonStyle = `${buttonStyle} ${styles.edit_button}`;
            break;
        case ButtonPurchaseType.CREATE:
            buttonStyle = `${buttonStyle} ${styles.create_button}`;
            break;
        default:
            buttonStyle = `${buttonStyle} ${styles.default_button}`;
            break;
    }

    return (
        <button className={buttonStyle} onClick={onClick}>
            {text}
            {/* {children} */}
        </button>
    );
}

export { ButtonPurchase, ButtonPurchaseType };