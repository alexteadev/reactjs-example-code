import React, { ChangeEventHandler, FC, PropsWithChildren, useState } from 'react';
import { forIn, map } from 'lodash';
import { PurchaseType } from '../../../models/PurchaseType';

interface SelectPurchaseTypeProps {
    edit: boolean;
    name: string;
    value: PurchaseType;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

function SelectPurchaseType(props: PropsWithChildren<SelectPurchaseTypeProps>): JSX.Element {
    const { name, edit, value, onChange } = props;
    return (
        <>
            {
                edit
                    ?
                    <select name={name} value={value} onChange={onChange}>
                        {map(PurchaseType, (value, key) => {
                            return <option value={value} key={key}>{value}</option>;
                        })}
                    </select>
                    : value
            }
        </>
    );
}

export { SelectPurchaseType };