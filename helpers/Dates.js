export function isBetween(dateFrom, dateTo, dateCheck) {

    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var c = dateCheck.split("/");

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    return check >= from && check <= to
}

export function CompareDates(date_one, date_two, operation) {

    var d1 = date_two.split("/");
    var c = date_one.split("/");

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    if (operation == '>') {
        return check > from
    } else if (operation == '<') {
        return check < from
    } else if (operation == '=') {
        let tmp_d1 = date_one.split('/');
        let tmp_d2 = date_two.split('/');
        
        return new Date(`${tmp_d1[1]}/${tmp_d1[0]}/${tmp_d1[2]}`).getTime() == new Date(`${tmp_d2[1]}/${tmp_d2[0]}/${tmp_d2[2]}`).getTime()
    } else if (operation == '>=') {
        return check >= from
    } else if (operation == '<=') {
        return check <= from
    }
}