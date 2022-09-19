export const updateObjectInArray = (items, itemId, objPropName, newObjectProps) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return { ...item, ...newObjectProps }
        }
        return item
    })
}