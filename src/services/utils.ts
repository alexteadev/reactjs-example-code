function getListId(urlParam: string) {
    const parts = urlParam.split('/').filter(part => part !== '');
    let listId = '';
    if (parts.length > 1) {
        listId = parts[1];
    }
    return listId;
}

export function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
}

export { getListId };