import * as dntShim from "../_dnt.shims.js";
import * as ansiEscapes from "./ansi_escapes.js";
import { getCursorPosition } from "./cursor_position.js";
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
export const tty = factory();
const encoder = new TextEncoder();
function factory(options) {
    let result = "";
    let stack = [];
    const writer = options?.writer ?? dntShim.Deno.stdout;
    const reader = options?.reader ?? dntShim.Deno.stdin;
    const tty = function (...args) {
        if (this) {
            update(args);
            writer.writeSync(encoder.encode(result));
            return this;
        }
        return factory(args[0] ?? options);
    };
    tty.text = function (text) {
        stack.push([text, []]);
        update();
        writer.writeSync(encoder.encode(result));
        return this;
    };
    tty.getCursorPosition = () => getCursorPosition({ writer, reader });
    const methodList = Object.entries(ansiEscapes);
    for (const [name, method] of methodList) {
        if (name === "cursorPosition") {
            continue;
        }
        Object.defineProperty(tty, name, {
            get() {
                stack.push([method, []]);
                return this;
            },
        });
    }
    return tty;
    function update(args) {
        if (!stack.length) {
            return;
        }
        if (args) {
            stack[stack.length - 1][1] = args;
        }
        result = stack.reduce((prev, [cur, args]) => prev + (typeof cur === "string" ? cur : cur.call(tty, ...args)), "");
        stack = [];
    }
}
