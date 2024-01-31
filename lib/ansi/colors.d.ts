import * as stdColors from "../deps/deno.land/std@0.170.0/fmt/colors.js";
type ExcludedColorMethods = "setColorEnabled" | "getColorEnabled";
type PropertyNames = keyof typeof stdColors;
type ColorMethods = Exclude<PropertyNames, ExcludedColorMethods>;
type Chainable<T, E extends keyof T | null = null> = {
    [P in keyof T]: P extends E ? T[P] : Chainable<T, E> & T[P];
};
/** Chainable colors instance returned by all ansi escape properties. */
export type ColorsChain = Chainable<typeof stdColors, ExcludedColorMethods> & {
    _stack: Array<ColorMethods>;
};
/** Create new `Colors` instance. */
export type ColorsFactory = () => Colors;
/**
 * Chainable colors module.
 * If invoked as method, a new `Colors` instance will be returned.
 */
export type Colors = ColorsFactory & ColorsChain;
export declare const colors: Colors;
export {};
