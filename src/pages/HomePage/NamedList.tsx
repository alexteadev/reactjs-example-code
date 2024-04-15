import { PropsWithChildren, useState } from "react";
import { listAPI } from "../../services/api/ListServices";
import styles from './styles/NamedList.module.scss';
import { IList } from "../../models/IList";
import { ListType } from "../../models/ListType";
import { NavLink } from "react-router-dom";
import { ConfirmForm, InputPurchase, ModalWindow } from "../../components";

interface ListProps {
    listId: string;
}

function NamedList(props: PropsWithChildren<ListProps>) {

    const { listId } = props;

    const { data: lists, error, isLoading } = listAPI.useFetchAllQuery();

    const typeList = ListType.List;
    const [createList, { }] = listAPI.useCreateMutation();
    const [updateList, { }] = listAPI.useUpdateMutation();
    const [deleteList, { }] = listAPI.useDeleteMutation();

    const [nameNew, setNameNew] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editButtonName, setEditButtonName] = useState<string>('Edit');
    const [modalDelete, setModalDelete] = useState<IList | null>(null);

    const handleNameNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameNew(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleCreate = async () => {
        await createList({ name: nameNew, type: ListType.List } as IList);
        setNameNew('');
    }
    const handleEdit = (event: React.MouseEvent, list: IList) => {
        if (isEdit) {
            updateList({ ...list, name });
            setIsEdit(false);
            setEditButtonName('Edit');
        } else {
            setIsEdit(true);
            setEditButtonName('Save');
        }
    }
    const handleRemove = (event: React.MouseEvent, list: IList | null) => {
        if (list) {
            deleteList(list);
        }
        setModalDelete(null);
    }

    const handleDeleteClick = (list: IList) => {
        setModalDelete(list);
    };

    return (
        <div className={styles.list}>
            <div className={styles.list_create}>
                <input name="name" type="text" value={nameNew} onChange={handleNameNewChange} />
                <button onClick={handleCreate}>Create</button>
            </div>
            <div className={styles.list_show}>
                {lists && lists.map((list, i) => {
                    const isActive = listId === list._id ? styles.active : '';

                    return <div className={styles.list_element} key={list._id}>
                        <NavLink className={isActive} to={'/' + typeList.toLowerCase() + '/' + list._id}>
                            <InputPurchase edit={isEdit} type="text" name="name" value={list.name} onChange={handleNameChange} />    
                        </NavLink>
                        <div className={styles.list_button}>
                            <button onClick={(e) => handleEdit(e, list)}>{editButtonName}</button>
                            <ModalWindow active={!!modalDelete} setActive={() => setModalDelete(null)}>
                                <ConfirmForm title="delete" nameItem={modalDelete?.name} setActive={() => setModalDelete(null)} handleAction={(e) => handleRemove(e, modalDelete)} />
                            </ModalWindow>
                            <button onClick={() => handleDeleteClick(list)}>Delete</button>
                        </div>
                    </div>;
                })}
            </div>
        </div>

    );
}

export default NamedList;