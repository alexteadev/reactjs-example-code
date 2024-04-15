import { ChangeEventHandler, Dispatch, PropsWithChildren, SetStateAction } from 'react';
import styles from './ModalWindow.module.scss';
import ReactDOM from 'react-dom';
import cn from 'classnames';

const modalRootElement = document.querySelector('#modal');

interface ModalWindowProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

function ModalWindow(props: PropsWithChildren<ModalWindowProps>): JSX.Element {
    const { active, setActive, children } = props;

    if (active) {
        return modalRootElement ? ReactDOM.createPortal(
            <div className={active ? cn(styles.modal, styles.active) : styles.modal} onClick={() => setActive(false)}>
                <div className={styles.content} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>,
            modalRootElement
        ) : <></>;
    } else {
        return <></>;
    }
}

export { ModalWindow };