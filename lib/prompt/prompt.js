// deno-lint-ignore-file no-explicit-any ban-types
import * as dntShim from "../_dnt.shims.js";
import { tty } from "../ansi/tty.js";
import { GenericPrompt, } from "./_generic_prompt.js";
let injected = {};
/**
 * Inject prompt values. Can be used for unit tests.
 *
 * In the following example, the `prompt()` method only asks for the color.
 * The values for `name' and `age' are selected from the values injected by the
 * `inject()' method and the prompts are skipped.
 *
 * ```ts
 * import { inject, prompt } from "./prompt.ts";
 * import { Input } from "./input.ts";
 * import { Number } from "./number.ts";
 * import { Confirm } from "./confirm.ts";
 * import { Checkbox } from "./checkbox.ts";
 *
 * inject({
 *   name: "Joe",
 *   age: 34,
 * });
 *
 * const result = await prompt([{
 *   name: "name",
 *   message: "What's your name?",
 *   type: Input,
 * }, {
 *   name: "age",
 *   message: "How old are you?",
 *   type: Confirm,
 * }, {
 *   name: "color",
 *   message: "Whats your favorit color?",
 *   type: Checkbox,
 *   options: ["red", "green", "blue"],
 * }]);
 * ```
 * @param values Input values object.
 */
export function inject(values) {
    injected = values;
}
/**
 * Runs an array of prompts.
 *
 * ```ts
 * import { prompt } from "./prompt.ts";
 * import { Input } from "./input.ts";
 * import { Confirm } from "./confirm.ts";
 * import { Checkbox } from "./checkbox.ts";
 *
 * const result = await prompt([{
 *   name: "name",
 *   message: "What's your name?",
 *   type: Input,
 * }, {
 *   name: "age",
 *   message: "How old are you?",
 *   type: Confirm,
 * }, {
 *   name: "color",
 *   message: "Whats your favorit color?",
 *   type: Checkbox,
 *   options: ["red", "green", "blue"],
 * }]);
 *
 * console.log(result);
 * ```
 *
 * @param prompts Array of prompt options.
 * @param options Global prompt options.
 *
 * @returns Returns an object with the result of all prompts.
 */
export function prompt(prompts, options) {
    return new PromptList(prompts, options).run(options?.initial);
}
class PromptList {
    get prompt() {
        return this.prompts[this.index];
    }
    constructor(prompts, options) {
        Object.defineProperty(this, "prompts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: prompts
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "result", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "names", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isInBeforeHook", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "tty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.names = this.prompts.map((prompt) => prompt.name);
        this.tty = tty({
            writer: options?.writer ?? dntShim.Deno.stdout,
        });
    }
    async run(name) {
        this.index = -1;
        this.result = {};
        this.isInBeforeHook = false;
        await this.next(name);
        return this.result;
    }
    async next(name) {
        if (this.updateIndex(name)) {
            await this.runBeforeHook(async () => {
                this.isInBeforeHook = false;
                await this.runPrompt();
                await this.runAfterHook();
            });
        }
    }
    updateIndex(name) {
        if (name && typeof name === "string") {
            this.index = this.names.indexOf(name);
            if (this.index === -1) {
                throw new Error(`Invalid prompt name: ${name}, allowed prompt names: ${this.names.join(", ")}`);
            }
        }
        else if (typeof name === "number") {
            if (name < 0 || name > this.names.length) {
                throw new Error(`Invalid prompt index: ${name}, prompt length: ${this.names.length}`);
            }
            this.index = name;
        }
        else if (name === true && !this.isInBeforeHook) {
            this.index++;
            if (this.index < this.names.length - 1) {
                this.index++;
            }
        }
        else {
            this.index++;
        }
        this.isInBeforeHook = false;
        if (this.index < this.names.length) {
            return true;
        }
        else if (this.index === this.names.length) {
            return false;
        }
        else {
            throw new Error("next() called multiple times");
        }
    }
    async runBeforeHook(run) {
        this.isInBeforeHook = true;
        const next = async (name) => {
            if (name || typeof name === "number") {
                return this.next(name);
            }
            await run();
        };
        if (this.options?.before) {
            await this.options.before(this.prompt.name, this.result, async (name) => {
                if (name || typeof name === "number") {
                    return this.next(name);
                }
                else if (this.prompt.before) {
                    await this.prompt.before(this.result, next);
                }
                else {
                    await run();
                }
            });
            return;
        }
        else if (this.prompt.before) {
            await this.prompt.before(this.result, next);
            return;
        }
        await run();
    }
    async runPrompt() {
        const prompt = this.prompt.type;
        if (typeof injected[this.prompt.name] !== "undefined") {
            if (prompt.inject) {
                prompt.inject(injected[this.prompt.name]);
            }
            else {
                GenericPrompt.inject(injected[this.prompt.name]);
            }
        }
        try {
            this.result[this.prompt.name] = await prompt.prompt({
                reader: this.options?.reader,
                writer: this.options?.writer,
                cbreak: this.options?.cbreak,
                ...this.prompt,
            });
        }
        finally {
            this.tty.cursorShow();
        }
    }
    async runAfterHook() {
        if (this.options?.after) {
            await this.options.after(this.prompt.name, this.result, async (name) => {
                if (name) {
                    return this.next(name);
                }
                else if (this.prompt.after) {
                    await this.prompt.after(this.result, (name) => this.next(name));
                }
                else {
                    await this.next();
                }
            });
        }
        else if (this.prompt.after) {
            await this.prompt.after(this.result, (name) => this.next(name));
        }
        else {
            await this.next();
        }
    }
}
