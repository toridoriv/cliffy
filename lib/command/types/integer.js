import { Type } from "../type.js";
import { integer } from "../../flags/types/integer.js";
/** Integer type. */
export class IntegerType extends Type {
    /** Parse integer type. */
    parse(type) {
        return integer(type);
    }
}
