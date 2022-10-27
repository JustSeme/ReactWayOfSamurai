export const required = (value: string) => (value ? undefined : 'Field is required')

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength)
        return `Max length is ${maxLength} symbols`
    return undefined
}

export const composeValidators = (...validators: any) => (value: string) =>
    validators.reduce((error: string, validator: any) => error || validator(value), undefined)