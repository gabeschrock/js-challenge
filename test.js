import { make as pair, str } from "./pair.js";
import { make as list, append, index } from "./list.js";

let foo = pair(1, pair(2, 3));
console.log(append(foo, 5));
console.log(str(foo));
console.log(index(foo, 0));
