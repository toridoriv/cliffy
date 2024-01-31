import { GenericPrompt } from "./_generic_prompt.js";
import { GenericSuggestions, } from "./_generic_suggestions.js";
import { parseNumber } from "./_utils.js";
/** Number prompt representation. */
export class Number extends GenericSuggestions {
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
        const settings = super.getDefaultSettings(options);
        return {
            ...settings,
            min: options.min ?? -Infinity,
            max: options.max ?? Infinity,
            float: options.float ?? false,
            round: options.round ?? 2,
            files: false,
            keys: {
                increaseValue: ["up", "u", "+"],
                decreaseValue: ["down", "d", "-"],
                ...(settings.keys ?? {}),
            },
        };
    }
    success(value) {
        this.saveSuggestions(value);
        return super.success(value);
    }
    /**
     * Handle user input event.
     * @param event Key event.
     */
    async handleEvent(event) {
        switch (true) {
            case this.settings.suggestions &&
                this.isKey(this.settings.keys, "next", event):
                if (this.settings.list) {
                    this.selectPreviousSuggestion();
                }
                else {
                    this.selectNextSuggestion();
                }
                break;
            case this.settings.suggestions &&
                this.isKey(this.settings.keys, "previous", event):
                if (this.settings.list) {
                    this.selectNextSuggestion();
                }
                else {
                    this.selectPreviousSuggestion();
                }
                break;
            case this.isKey(this.settings.keys, "increaseValue", event):
                this.increaseValue();
                break;
            case this.isKey(this.settings.keys, "decreaseValue", event):
                this.decreaseValue();
                break;
            default:
                await super.handleEvent(event);
        }
    }
    /** Increase input number. */
    increaseValue() {
        this.manipulateIndex(false);
    }
    /** Decrease input number. */
    decreaseValue() {
        this.manipulateIndex(true);
    }
    /** Decrease/increase input number. */
    manipulateIndex(decrease) {
        if (this.inputValue[this.inputIndex] === "-") {
            this.inputIndex++;
        }
        if (this.inputValue.length && (this.inputIndex > this.inputValue.length - 1)) {
            this.inputIndex--;
        }
        const decimalIndex = this.inputValue.indexOf(".");
        const [abs, dec] = this.inputValue.split(".");
        if (dec && this.inputIndex === decimalIndex) {
            this.inputIndex--;
        }
        const inDecimal = decimalIndex !== -1 &&
            this.inputIndex > decimalIndex;
        let value = (inDecimal ? dec : abs) || "0";
        const oldLength = this.inputValue.length;
        const index = inDecimal
            ? this.inputIndex - decimalIndex - 1
            : this.inputIndex;
        const increaseValue = Math.pow(10, value.length - index - 1);
        value = (parseInt(value) + (decrease ? -increaseValue : increaseValue))
            .toString();
        this.inputValue = !dec
            ? value
            : (this.inputIndex > decimalIndex
                ? abs + "." + value
                : value + "." + dec);
        if (this.inputValue.length > oldLength) {
            this.inputIndex++;
        }
        else if (this.inputValue.length < oldLength &&
            this.inputValue[this.inputIndex - 1] !== "-") {
            this.inputIndex--;
        }
        this.inputIndex = Math.max(0, Math.min(this.inputIndex, this.inputValue.length - 1));
    }
    /**
     * Add char to input.
     * @param char Char.
     */
    addChar(char) {
        if (isNumeric(char)) {
            super.addChar(char);
        }
        else if (this.settings.float &&
            char === "." &&
            this.inputValue.indexOf(".") === -1 &&
            (this.inputValue[0] === "-" ? this.inputIndex > 1 : this.inputIndex > 0)) {
            super.addChar(char);
        }
    }
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    validate(value) {
        if (!isNumeric(value)) {
            return false;
        }
        const val = parseFloat(value);
        if (val > this.settings.max) {
            return `Value must be lower or equal than ${this.settings.max}`;
        }
        if (val < this.settings.min) {
            return `Value must be greater or equal than ${this.settings.min}`;
        }
        return true;
    }
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    transform(value) {
        const val = parseFloat(value);
        if (this.settings.float) {
            return parseFloat(val.toFixed(this.settings.round));
        }
        return val;
    }
    /**
     * Format output value.
     * @param value Output value.
     */
    format(value) {
        return value.toString();
    }
    /** Get input input. */
    getValue() {
        return this.inputValue;
    }
}
function isNumeric(value) {
    return typeof value === "number" || (!!value && !isNaN(parseNumber(value)));
}
