export interface KeyCode {
    name?: string;
    sequence?: string;
    code?: string;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    char?: string;
}
/**
 * Parse ansi escape sequence.
 *
 * @param data Ansi escape sequence.
 *
 * ```ts
 * import { parse } from "./mod.ts";
 *
 * parse("\x04\x18");
 * ```
 *
 * ```json
 * [
 *   KeyCode { name: "d", sequence: "\x04", ctrl: true, meta: false, shift: false },
 *   KeyCode { name: "x", sequence: "\x18", ctrl: true, meta: false, shift: false },
 * ]
 * ```
 */
export declare function parse(data: Uint8Array | string): KeyCode[];
