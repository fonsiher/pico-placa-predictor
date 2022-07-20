import date from 'date-and-time';

const provinceCodes = ["A", "B", "C", "E", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const licencePattern = /[A-Z]{3}[-][0-9]{4}/

const td = new Date();
const today = () => {
    var nf = date.format(td, 'YYYY-MM-D')
    return nf;
}

const actualtime = () => {
    var ttime = td.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return ttime;
}

export { provinceCodes, today, licencePattern, actualtime }