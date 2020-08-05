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

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}