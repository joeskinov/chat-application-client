export function convertDate(date) {
    let d = new Date(date);
    if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d.getTime())) {  // d.valueOf() could also work
          // date is not valid
        } else {
          // date is valid
          return d.toISOString().slice(0,10).replace(/-/g,"/");
        }
      } else {
        // not a date
      }
}

export function trunc(text) {
    return text.length > 80 ? `${text.substr(0, 80)}...` : text;
}