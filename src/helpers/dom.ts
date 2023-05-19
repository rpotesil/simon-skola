export const ed = (selector: string):any => {
    return document.getElementById("#" + selector);
}

export const ec = (selector: string, node: any = null) => {
    if (!node) node = document;
    return node.getElementsByClassName(selector)[0] ? node.getElementsByClassName(selector)[0] : null;
}

export const eq = (selector: string, node: any = null) => {
    if (!node) node = document;
    return node.querySelectorAll(selector);
}