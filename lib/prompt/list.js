import { GenericPrompt } from "./_generic_prompt.js";
import { GenericSuggestions, } from "./_generic_suggestions.js";
import { dim, normalize, underline } from "./deps.js";
/** List prompt representation. */
export class List extends GenericSuggestions {
    /** Execute the prompt and show cursor on end. */
    static prompt(options) {
        return new this(options).prompt();
    }
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Input value.
     */
    static inject(value) {
        GenericPrompt.inject(value);
    }
    constructor(options) {
        super();
        Object.defineProperty(this, "settings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof options === "string") {
            options = { message: options };
        }
        this.settings = this.getDefaultSettings(options);
    }
    getDefaultSettings(options) {
        return {
            ...super.getDefaultSettings(options),
            separator: options.separator ?? ",",
            minLength: options.minLength ?? 0,
            maxLength: options.maxLength ?? Infinity,
            minTags: options.minTags ?? 0,
            maxTags: options.maxTags ?? Infinity,
        };
    }
    input() {
        const oldInput = this.inputValue;
        const tags = this.getTags(oldInput);
        const separator = this.settings.separator + " ";
        if (this.settings.files && tags.length > 1) {
            tags[tags.length - 2] = normalize(tags[tags.length - 2]);
        }
        this.inputValue = tags.join(separator);
        const diff = oldInput.length - this.inputValue.length;
        this.inputIndex -= diff;
        this.cursor.x -= diff;
        return tags
            .map((val) => underline(val))
            .join(separator) +
            dim(this.getSuggestion());
    }
    getTags(value = this.inputValue) {
        return value.trim().split(this.regexp());
    }
    /** Create list regex.*/
    regexp() {
        return new RegExp(this.settings.separator === " " ? ` +` : ` *${this.settings.separator} *`);
    }
    success(value) {
        this.saveSuggestions(...value);
        return super.success(value);
    }
    /** Get input value. */
    getValue() {
        // Remove trailing comma and spaces.
        const input = this.inputValue.replace(/,+\s*$/, "");
        if (!this.settings.files) {
            return input;
        }
        return this.getTags(input)
            .map(normalize)
            .join(this.settings.separator + " ");
    }
    getCurrentInputValue() {
        return this.getTags().pop() ?? "";
    }
    /** Add char. */
    addChar(char) {
        switch (char) {
            case this.settings.separator:
                if (this.inputValue.length &&
                    this.inputValue.trim().slice(-1) !== this.settings.separator) {
                    super.addChar(char);
                }
                this.suggestionsIndex = -1;
                this.suggestionsOffset = 0;
                break;
            default:
                super.addChar(char);
        }
    }
    /** Delete char left. */
    deleteChar() {
        if (this.inputValue[this.inputIndex - 1] === " ") {
            super.deleteChar();
        }
        super.deleteChar();
    }
    async complete() {
        const tags = this.getTags().slice(0, -1);
        tags.push(await super.complete());
        return tags.join(this.settings.separator + " ");
    }
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    validate(value) {
        if (typeof value !== "string") {
            return false;
        }
        const values = this.transform(value);
        for (const val of values) {
            if (val.length < this.settings.minLength) {
                return `Value must be longer than ${this.settings.minLength} but has a length of ${val.length}.`;
            }
            if (val.length > this.settings.maxLength) {
                return `Value can't be longer than ${this.settings.maxLength} but has a length of ${val.length}.`;
            }
        }
        if (values.length < this.settings.minTags) {
            return `The minimum number of tags is ${this.settings.minTags} but got ${values.length}.`;
        }
        if (values.length > this.settings.maxTags) {
            return `The maximum number of tags is ${this.settings.maxTags} but got ${values.length}.`;
        }
        return true;
    }
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    transform(value) {
        return this.getTags(value).filter((val) => val !== "");
    }
    /**
     * Format output value.
     * @param value Output value.
     */
    format(value) {
        return value.join(`, `);
    }
}
