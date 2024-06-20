import { make as pair, str } from "./pair.js";
import { make as list, append, index } from "./list.js";

let foo = pair(1, pair(2, 3));
console.log(index(foo, 2));
