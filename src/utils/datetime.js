import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export const toDate = str => {
    if (str === undefined || str === null) {
        return "";
    }

    const datetime = new moment.utc(str, "YYYYMMDDHHmmssSSS").local();
    return datetime.format("YYYY.MM.DD");
};

export const toShortDateTime = (str, forced) => {
    if (str === undefined || str === null) {
        return "";
    }

    const datetime = new moment.utc(str, "YYYYMMDDHHmmssSSS").local();
    const now = new moment();

    if (
        (datetime.year() === now.year() &&
            datetime.month() === now.month() &&
            datetime.date() === now.date()) ||
        forced === true
    ) {
        return datetime.format("a h:mm");
    } else {
        return datetime.format("MM월 DD일");
    }
};

export const utcDateTime = () => {
    return moment.utc().format("YYYYMMDDHHmmssSSS");
};
