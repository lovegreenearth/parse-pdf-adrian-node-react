export const numberWithCommas = (num) => {
    return '€ ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const numberWithCommas2 = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}