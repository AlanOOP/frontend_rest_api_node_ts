export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ES', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount)
}

export const toBoolean = (str: string): boolean => {
    return str.toLowerCase() === 'true';
}