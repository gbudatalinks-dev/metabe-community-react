export function strContains(str, contains) {
    return str && str.length > 0 && str.indexOf(contains) > -1;
}

export function strReplace(str, old, replace) {
    return str.split(old).join(replace);
}

export function strStartsWith(str, starts) {
    return str && str.indexOf(starts) === 0;
}

export function isEmptyStr(str) {
    return str === null || str === undefined || str.trim() === '' || str.trim() === 'null';
}
