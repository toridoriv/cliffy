import { Type } from "../type.js";
import type { ArgumentValue } from "../types.js";
import { integer } from "../../flags/types/integer.js";

/** Integer type. */
export class IntegerType extends Type<number> {
  /** Parse integer type. */
  public parse(type: ArgumentValue): number {
    return integer(type);
  }
}
