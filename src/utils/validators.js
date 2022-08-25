export const required = value => (value ? undefined : 'Field is required')

export const maxLengthCreator = maxLength => value => {
    if (value && value.length > maxLength)
        return `Max length is ${maxLength} symbols`
    return undefined
}

export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)