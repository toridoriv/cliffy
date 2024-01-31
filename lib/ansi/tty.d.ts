import * as dntShim from "../_dnt.shims.js";
import type { Chain } from "./chain.js";
import { Cursor } from "./cursor_position.js";
/** Create new `Ansi` instance. */
export interface TtyOptions {
    writer?: dntShim.Deno.WriterSync;
    reader?: dntShim.Deno.ReaderSync & {
        readonly rid: number;
        setRaw(mode: boolean, options?: dntShim.Deno.SetRawOptions): void;
    };
}
/** Ansi instance returned by all ansi escape properties. */
export interface TtyChain extends Exclude<Chain<TtyChain>, "cursorPosition"> {
    /** Write ansi escape sequence. */
    (): void;
    /** Get current cursor position. */
    getCursorPosition(): Cursor;
}
/** Create new `Tty` instance. */
export type TtyFactory = (options?: TtyOptions) => Tty;
/**
 * Chainable ansi escape sequences.
 * If invoked as method, a new Tty instance will be returned.
 */
export type Tty = TtyFactory & TtyChain;
/**
 * Chainable ansi escape sequences.
 * If invoked as method, a new Tty instance will be returned.
 *
 * ```ts
 * import { tty } from "./mod.ts";
 *
 * tty.cursorTo(0, 0).eraseScreen();
 * ```
 */
export declare const tty: Tty;
