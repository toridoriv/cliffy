import { brightBlue, underline } from "./deps.js";
import { GenericList, } from "./_generic_list.js";
import { GenericPrompt } from "./_generic_prompt.js";
/** Select prompt representation. */
export class Select extends GenericList {
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
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "listIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "listOffset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.settings = this.getDefaultSettings(options);
        this.options = this.settings.options.slice();
        this.listIndex = this.getListIndex(this.settings.default);
        this.listOffset = this.getPageOffset(this.listIndex);
    }
    getDefaultSettings(options) {
        return {
            ...super.getDefaultSettings(options),
            options: this.mapOptions(options).map((option) => this.mapOption(options, option)),
        };
    }
    input() {
        return underline(brightBlue(this.inputValue));
    }
    /**
     * Render select option.
     * @param item        Select option settings.
     * @param isSelected  Set to true if option is selected.
     */
    getListItem(item, isSelected) {
        let line = this.settings.indent;
        line += isSelected ? `${this.settings.listPointer} ` : "  ";
        line += `${isSelected && !item.disabled
            ? this.highlight(item.name, (val) => val)
            : this.highlight(item.name)}`;
        return line;
    }
    /** Get value of selected option. */
    getValue() {
        return this.options[this.listIndex]?.value ?? this.settings.default;
    }
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    validate(value) {
        return typeof value === "string" &&
            value.length > 0 &&
            this.options.findIndex((option) => option.value === value) !== -1;
    }
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    transform(value) {
        return value.trim();
    }
    /**
     * Format output value.
     * @param value Output value.
     */
    format(value) {
        return this.getOptionByValue(value)?.name ?? value;
    }
}
