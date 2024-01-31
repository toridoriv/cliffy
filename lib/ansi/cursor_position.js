import * as dntShim from "../_dnt.shims.js";
import { cursorPosition } from "./ansi_escapes.js";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
/**
 * Get cursor position.
 * @param options  Options.
 *
 * ```ts
 * import { Cursor, getCursorPosition } from "./mod.ts";
 *
 * const cursor: Cursor = getCursorPosition();
 * console.log(cursor); // { x: 0, y: 14}
 * ```
 */
export function getCursorPosition({ reader = dntShim.Deno.stdin, writer = dntShim.Deno.stdout, } = {}) {
    const data = new Uint8Array(8);
    reader.setRaw(true);
    writer.writeSync(encoder.encode(cursorPosition));
    reader.readSync(data);
    reader.setRaw(false);
    const [y, x] = decoder
        .decode(data)
        .match(/\[(\d+);(\d+)R/)
        ?.slice(1, 3)
        .map(Number) ?? [0, 0];
    return { x, y };
}
