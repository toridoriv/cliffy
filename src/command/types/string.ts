import { string } from "../../flags/types/string.js";
import { Type } from "../type.js";
import type { ArgumentValue } from "../types.js";

/** String type. Allows any value. */
export class StringType extends Type<string> {
  /** Complete string type. */
  public parse(type: ArgumentValue): string {
    return string(type);
  }
}
