import * as dntShim from "../_dnt.shims.js";
/** Cursor position. */
export interface Cursor {
    x: number;
    y: number;
}
/** Cursor position options. */
export interface CursorPositionOptions {
    writer?: dntShim.Deno.WriterSync;
    reader?: dntShim.Deno.ReaderSync & {
        readonly rid: number;
        setRaw(mode: boolean, options?: dntShim.Deno.SetRawOptions): void;
    };
}
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
export declare function getCursorPosition({ reader, writer, }?: CursorPositionOptions): Cursor;
