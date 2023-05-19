export const Formatted = (amount:number, decimals?:number) => {
    let isNegative = amount < 0 ? true : false;
    let value = Math.abs(amount);
    return (isNegative ? "-" : "") + value.toLocaleString('cs', { minimumFractionDigits: decimals || 0 }) + ''; 
}