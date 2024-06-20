const IS_PAIR = Symbol("pair");
const HEAD = Symbol("pair.head");
const TAIL = Symbol("pair.tail");

export function make(head, tail) {
    function self(method, input) {
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

export function is_pair(func) {
    if (typeof func !== "function") {
        return false;
    }
    return func(IS_PAIR);
}

export function head(pair, value) {
    if (!is_pair(pair)) {
        return;
    }
    return pair(HEAD, value);
}

export function tail(pair, value) {
    if (!is_pair(pair)) {
        return;
    }
    return pair(TAIL, value);
}

export function str(pair) {
    if(!is_pair(pair)) {
        return String(pair);
    }
    // no self-reference checks, be careful
    return `(${str(head(pair))}, ${str(tail(pair))})`;
}
