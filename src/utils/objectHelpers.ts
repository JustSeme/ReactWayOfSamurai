export const updateObjectInArray = (items: Array<any>, itemId: number, objPropName: string, newObjectProps: any) => {
    return items.map(item => {
        if (item[objPropName] === itemId) {
            return { ...item, ...newObjectProps }
        }
        return item
    })
}