import type { Chain } from "./chain.js";
/** Ansi instance returned by all ansi escape properties. */
export interface AnsiChain extends Chain<AnsiChain> {
    /** Get ansi escape sequence. */
    (): string;
    /** Get ansi escape sequence. */
    toString(): string;
    /** Get ansi escape sequence as Uint8Array. */
    toBuffer(): Uint8Array;
}
/** Create new `Ansi` instance. */
export type AnsiFactory = () => Ansi;
/**
 * Chainable ansi escape sequences.
 * If invoked as method, a new Ansi instance will be returned.
 */
export type Ansi = AnsiFactory & AnsiChain;
/**
 * Chainable ansi escape sequences.
 * If invoked as method, a new Ansi instance will be returned.
 *
 * ```ts
 * import { ansi } from "./mod.ts";
 *
 * await Deno.stdout.write(
 *   new TextEncoder().encode(
 *     ansi.cursorTo(0, 0).eraseScreen(),
 *   ),
 * );
 * ```
 *
 * Or shorter:
 *
 * ```ts
 * import { ansi } from "./mod.ts";
 *
 * await Deno.stdout.write(
 *   ansi.cursorTo(0, 0).eraseScreen.toBuffer(),
 * );
 * ```
 */
export declare const ansi: Ansi;
