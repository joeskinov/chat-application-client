export function convertDate(date) {
    let mydate = new Date(date);
    return mydate.toISOString().slice(0,10).replace(/-/g,"/");
}

export function trunc(text) {
    return text.length > 80 ? `${text.substr(0, 80)}...` : text;
}