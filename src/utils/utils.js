import { statusDict, weekMap } from './constant'

export function playStatusFormat(status) {
    return statusDict[status];
}

export function toEastTime(timeStamp) {
    const date = new Date(timeStamp + 8 * 3600 * 1000);
    const monthDay = (date.getMonth() + 1).toString().padStart(2, 0) + '-' +
    date.getDate().toString().padStart(2, 0);
    const time = date.getHours().toString().padStart(2, 0) + ":" +
                 date.getMinutes().toString().padStart(2, 0);

    return [monthDay, time];
}

export function timeDetails(timeStamp) {
    const date = new Date(timeStamp + 8 * 3600 * 1000);
    const [year, month, day, week] = [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, 0),
        date.getDate().toString().padStart(2, 0),
        date.getDay()
    ]

    return {year, month, day, week};
}

export function playTV(status) {
    if (status === 'Played') {
        return '集锦';
    } else {
        return '懂球帝直播';
    }
}

export function summaryMatchList(list = []) {
    const formatList = {};
    list.map(item => {
        const { year, month, day, week } = timeDetails(item.sort_timestamp * 1000);
        const formatTime = `${year}-${month}-${day} ${weekMap[week]}`;
        if (!formatList[formatTime]) {
            formatList[formatTime] = [];
        }
        formatList[formatTime].push(item);
    })
    return formatList;
}