/**
 * All internal non-test code, that is files that do not have `test` or `bench` in the name, must use the assertion functions within `_utils/asserts.ts` and not `testing/asserts.ts`. This is to create a separation of concerns between internal and testing assertions.
 */
export declare class DenoStdInternalError extends Error {
    constructor(message: string);
}
/** Make an assertion, if not `true`, then throw. */
export declare function assert(expr: unknown, msg?: string): asserts expr;
/** Use this to assert unreachable code. */
export declare function unreachable(): never;
