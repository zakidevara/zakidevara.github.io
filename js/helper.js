function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function formatDate(date){
    let d = parseISOString(date);
    const dtf = new Intl.DateTimeFormat('id', { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
    });
    const [{ value: da },,{ value: mo },,{ value: ye },,{value:hour},,{value:min}] = dtf.formatToParts(d);
    const formattedDate = `${da} ${mo} ${ye} - ${hour}:${min}`;
    return formattedDate;
}