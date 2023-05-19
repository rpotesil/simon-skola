import React from "react";

export interface IMoney {
    amount: number
    decimals?: number
    cssWrapper?: string
}

export const Money = (props: IMoney) => {

    return (
        <span className={props.cssWrapper}>{ MoneyStr(props.amount, props.decimals)}</span>
    )
    //en: <span className={props.cssWrapper}>&pound;{ isNegative && "-"}{value.toLocaleString('en', { minimumFractionDigits: decimals })}</span>
}

export const MoneyStr = (amount:number, decimals?:number) => {
    let isNegative = amount < 0 ? true : false;
    let value = Math.abs(amount);
    return (isNegative ? "-" : "") + value.toLocaleString('cs', { minimumFractionDigits: decimals || 0 }) + ' Kč'; 
}