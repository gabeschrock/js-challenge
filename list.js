import { make as make_pair, head, tail, is_pair, str } from "./pair.js"

function get(list, index) {
    while (is_list(list) && index > 0) {
        list = tail(list);
        index--;
    }
    if (index <= 0) {
        return list;
    }
}

function last(list) {
    let list_old;
    while (is_list(list)) {
        list_old = list;
        list = tail(list);
    }
    return list_old;
}

function short(list) {
    if (head(list) === null)  { return 0; }
    if (tail(list) === null)  { return 1; }
    if (!is_pair(tail(list))) { return 2; }
    return 3;
}

export let is_list = is_pair;

export function make() {
    return make_pair(null, null);
}

export function index(list, index) {
    if (!is_list(list)) {
        return;
    }
    let length = short(list);
    if (length === 0) { return; }
    if (length === 1) {
        return index === 0 ? head(list) : undefined;
    }
    if (length === 2) {
        return index === 1 ? tail(list) : undefined;
    }

    list = get(list, index - 1);

    if (!is_list(list)) {
        return list;
    }

    let pair = tail(list);

    if (is_pair(pair)) { return; }
    return pair;
}

export function append(list, value) {
    if (!is_list(list)) { return; }
    let end = last(list);
    tail(end, make_pair(tail(end), value));
}
