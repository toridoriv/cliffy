import { number } from "../../flags/types/number.js";
import { Type } from "../type.js";
import type { ArgumentValue } from "../types.js";

/** Number type. */
export class NumberType extends Type<number> {
  /** Parse number type. */
  public parse(type: ArgumentValue): number {
    return number(type);
  }
}
