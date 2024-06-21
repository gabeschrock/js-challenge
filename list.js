/**
 * @typedef {import("./pair.js").Pair} List
 */
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

/**
 * Construct an empty list.
 * @returns {List}  An empty list.
 */
export function make() {
    return make_pair(null, null);
}

/**
 * 
 * @param {List} list - The list to get the length of.
 * @returns {number}  - The length of the list.
 */
export function length(list) {
    if (!is_list(list)) { return; }

    let len = short(list);
    if (len < 3) { return len; }

    let debug = list;

    let result = 1;
    while (is_list(list)) {
        list = tail(list);
        result++;
    }
    console.log(`length of ${str(debug)}: ${result}`)
    return result;
}

/**
 * Get the value at an index of a list.
 * @param {List}   list  - The list to index.
 * @param {number} index - The index to find in the list.
 * @returns {any}          The value at the given index.
 */
export function index(list, index) {
    if (!is_list(list)) { return; }

    let len = short(list);
    switch (len) {
        case 0: return;
        case 1: return index === 0 ? head(list) : undefined;
        case 2: return index === 1 ? tail(list) : undefined;
    }
    
    list = get(list, index - 1);

    if (!is_list(list)) {
        return list;
    }

    let pair = tail(list);

    if (is_pair(pair)) { return head(list); }
    return pair;
}

/**
 * Append an item to a list.
 * @param {List} list  - The list to append to.
 * @param {*}    value - The value to append to the list.
 * @returns {number}     The length of the resulting list.
 */
export function append(list, value) {
    if (!is_list(list)) { return; }

    let len = short(list);
    switch (len) {
        case 0:
            head(list, value);
            return 1;
        case 1:
            tail(list, value);
            return 2;
        case 2:
            let last = tail(list);
            tail(list, make_pair(last, value));
            return 3;
    }

    let end = last(list);
    tail(end, make_pair(tail(end), value));

    return length(list);
}
