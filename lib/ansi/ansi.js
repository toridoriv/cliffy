import * as ansiEscapes from "./ansi_escapes.js";
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
export const ansi = factory();
const encoder = new TextEncoder();
function factory() {
    let result = [];
    let stack = [];
    const ansi = function (...args) {
        if (this) {
            if (args.length) {
                update(args);
                return this;
            }
            return this.toString();
        }
        return factory();
    };
    ansi.text = function (text) {
        stack.push([text, []]);
        return this;
    };
    ansi.toArray = function () {
        update();
        const ret = result;
        result = [];
        return ret;
    };
    ansi.toString = function () {
        return this.toArray().join("");
    };
    ansi.toBuffer = function () {
        return encoder.encode(this.toString());
    };
    const methodList = Object.entries(ansiEscapes);
    for (const [name, method] of methodList) {
        Object.defineProperty(ansi, name, {
            get() {
                stack.push([method, []]);
                return this;
            },
        });
    }
    return ansi;
    function update(args) {
        if (!stack.length) {
            return;
        }
        if (args) {
            stack[stack.length - 1][1] = args;
        }
        result.push(...stack.map(([prop, args]) => typeof prop === "string" ? prop : prop.call(ansi, ...args)));
        stack = [];
    }
}
