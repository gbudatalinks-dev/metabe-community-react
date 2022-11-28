export function numberToString(num) {
    if (num >= 1000000) {
        if (num === 1000000) {
            return "1M";
        }
        return `${Math.floor(num / 100000) / 10}K+`;
    } else if (num >= 1000) {
        if (num === 1000) {
            return "1K";
        }
        return `${Math.floor(num / 100) / 10}K+`;
    } else {
        return num;
    }
}

export function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
