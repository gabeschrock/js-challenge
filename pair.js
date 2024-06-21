/**
 * @typedef {function(symbol, any): any} Pair
 * @typedef {string|number|boolean|null|object} not_undefined
 */
const IS_PAIR = Symbol("pair");
const HEAD = Symbol("pair.head");
const TAIL = Symbol("pair.tail");

/**
 * 
 * @param {not_undefined} head - The head of the pair, cannot be undefined.
 * @param {not_undefined} tail - The tail of the pair, cannot be undefined.
 * @returns {Pair}               The constructed pair.
 */
export function make(head, tail) {
    if (head === undefined) {
        head = null;
    }
    if (tail === undefined) {
        tail = null;
    }

    /**
     * Inner function. Do not call, instead use provided functions to access and modify pairs.
     * @param {symbol} method - Method to call, must be a symbol defined in the inner module scope.
     * @param {any}    input  - Input for the method.
     * @returns {any}           The result of the method.
     */
    function self(method, input=undefined) {
        switch (method) {
            case IS_PAIR:
                return true;
            
            case HEAD:
                if (input !== undefined) {
                    head = input;
                }
                return head;
            
            case TAIL:
                if (input !== undefined) {
                    tail = input;
                }
                return tail;
        
            default:
                return false;
        }
    }

    return self;
}

/**
 * Check if an input is a pair.
 * @param {any} data - Any input.
 * @returns {boolean}  If the given input is a pair.
 */

export function is_pair(data) {
    if (typeof data !== "function") {
        return false;
    }
    return func(IS_PAIR);
}

/**
 * Get or set the head of the pair.
 * @param {Pair} pair  - The pair to access the head of.
 * @param {any}  value - The value to set the head to. If undefined, get the head.
 * @returns {any}        The resulting head of the pair.
 */
export function head(pair, value=undefined) {
    if (!is_pair(pair)) {
        return;
    }
    return pair(HEAD, value);
}

/**
 * Get or set the tail of the pair.
 * @param {Pair} pair  - The pair to access the tail of.
 * @param {any}  value - The value to set the tail to. If undefined, get the tail.
 * @returns {any}        The resulting tail of the pair.
 */
export function tail(pair, value) {
    if (!is_pair(pair)) {
        return;
    }
    return pair(TAIL, value);
}

/**
 * Stringify a pair. Warning: Do not input self-referencing pairs.
 * @param {Pair} pair - The pair to stringify.
 * @returns {string}    The stringified pair.
 */
export function str(pair) {
    if(!is_pair(pair)) {
        return String(pair);
    }
    return `(${str(head(pair))}, ${str(tail(pair))})`;
}
