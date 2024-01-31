import { GenericInput, } from "./_generic_input.js";
import { bold, brightBlue, dim, stripColor } from "./deps.js";
import { Figures, getFiguresByKeys } from "./figures.js";
import { distance } from "../_utils/distance.js";
/** Generic list prompt representation. */
export class GenericList extends GenericInput {
    /**
     * Create list separator.
     * @param label Separator label.
     */
    static separator(label = "------------") {
        return { value: label, disabled: true };
    }
    getDefaultSettings(options) {
        const settings = super.getDefaultSettings(options);
        return {
            ...settings,
            listPointer: options.listPointer ?? brightBlue(Figures.POINTER),
            searchLabel: options.searchLabel ?? brightBlue(Figures.SEARCH),
            maxRows: options.maxRows ?? 10,
            options: this.mapOptions(options).map((option) => this.mapOption(options, option)),
            keys: {
                previous: options.search ? ["up"] : ["up", "u", "p", "8"],
                next: options.search ? ["down"] : ["down", "d", "n", "2"],
                previousPage: ["pageup", "left"],
                nextPage: ["pagedown", "right"],
                ...(settings.keys ?? {}),
            },
        };
    }
    mapOptions(options) {
        return options.options.map((option) => typeof option === "string" ? { value: option } : option).map((option) => this.mapOption(options, option));
    }
    /**
     * Set list option defaults.
     * @param option List option.
     */
    mapOption(_options, option) {
        return {
            value: option.value,
            name: typeof option.name === "undefined" ? option.value : option.name,
            disabled: !!option.disabled,
        };
    }
    match() {
        const input = this.getCurrentInputValue().toLowerCase();
        if (!input.length) {
            this.options = this.settings.options.slice();
        }
        else {
            this.options = this.settings.options
                .filter((option) => match(option.name) ||
                (option.name !== option.value && match(option.value)))
                .sort((a, b) => distance(a.name, input) - distance(b.name, input));
        }
        this.listIndex = Math.max(0, Math.min(this.options.length - 1, this.listIndex));
        this.listOffset = Math.max(0, Math.min(this.options.length - this.getListHeight(), this.listOffset));
        function match(value) {
            return stripColor(value)
                .toLowerCase()
                .includes(input);
        }
    }
    message() {
        let message = `${this.settings.indent}${this.settings.prefix}` +
            bold(this.settings.message) +
            this.defaults();
        if (this.settings.search) {
            message += " " + this.settings.searchLabel + " ";
        }
        this.cursor.x = stripColor(message).length + this.inputIndex + 1;
        return message + this.input();
    }
    /** Render options. */
    body() {
        return this.getList() + this.getInfo();
    }
    getInfo() {
        if (!this.settings.info) {
            return "";
        }
        const selected = this.listIndex + 1;
        const actions = [
            ["Next", getFiguresByKeys(this.settings.keys?.next ?? [])],
            ["Previous", getFiguresByKeys(this.settings.keys?.previous ?? [])],
            ["Next Page", getFiguresByKeys(this.settings.keys?.nextPage ?? [])],
            [
                "Previous Page",
                getFiguresByKeys(this.settings.keys?.previousPage ?? []),
            ],
            ["Submit", getFiguresByKeys(this.settings.keys?.submit ?? [])],
        ];
        return "\n" + this.settings.indent + brightBlue(Figures.INFO) +
            bold(` ${selected}/${this.options.length} `) +
            actions
                .map((cur) => `${cur[0]}: ${bold(cur[1].join(", "))}`)
                .join(", ");
    }
    /** Render options list. */
    getList() {
        const list = [];
        const height = this.getListHeight();
        for (let i = this.listOffset; i < this.listOffset + height; i++) {
            list.push(this.getListItem(this.options[i], this.listIndex === i));
        }
        if (!list.length) {
            list.push(this.settings.indent + dim("  No matches..."));
        }
        return list.join("\n");
    }
    /** Get options row height. */
    getListHeight() {
        return Math.min(this.options.length, this.settings.maxRows || this.options.length);
    }
    getListIndex(value) {
        return Math.max(0, typeof value === "undefined"
            ? this.options.findIndex((item) => !item.disabled) || 0
            : this.options.findIndex((item) => item.value === value) || 0);
    }
    getPageOffset(index) {
        if (index === 0) {
            return 0;
        }
        const height = this.getListHeight();
        return Math.floor(index / height) * height;
    }
    /**
     * Find option by value.
     * @param value Value of the option.
     */
    getOptionByValue(value) {
        return this.options.find((option) => option.value === value);
    }
    /** Read user input. */
    read() {
        if (!this.settings.search) {
            this.settings.tty.cursorHide();
        }
        return super.read();
    }
    /**
     * Handle user input event.
     * @param event Key event.
     */
    async handleEvent(event) {
        switch (true) {
            case this.isKey(this.settings.keys, "previous", event):
                this.selectPrevious();
                break;
            case this.isKey(this.settings.keys, "next", event):
                this.selectNext();
                break;
            case this.isKey(this.settings.keys, "nextPage", event):
                this.selectNextPage();
                break;
            case this.isKey(this.settings.keys, "previousPage", event):
                this.selectPreviousPage();
                break;
            default:
                await super.handleEvent(event);
        }
    }
    moveCursorLeft() {
        if (this.settings.search) {
            super.moveCursorLeft();
        }
    }
    moveCursorRight() {
        if (this.settings.search) {
            super.moveCursorRight();
        }
    }
    deleteChar() {
        if (this.settings.search) {
            super.deleteChar();
        }
    }
    deleteCharRight() {
        if (this.settings.search) {
            super.deleteCharRight();
            this.match();
        }
    }
    addChar(char) {
        if (this.settings.search) {
            super.addChar(char);
            this.match();
        }
    }
    /** Select previous option. */
    selectPrevious() {
        if (this.options.length < 2) {
            return;
        }
        if (this.listIndex > 0) {
            this.listIndex--;
            if (this.listIndex < this.listOffset) {
                this.listOffset--;
            }
            if (this.options[this.listIndex].disabled) {
                this.selectPrevious();
            }
        }
        else {
            this.listIndex = this.options.length - 1;
            this.listOffset = this.options.length - this.getListHeight();
            if (this.options[this.listIndex].disabled) {
                this.selectPrevious();
            }
        }
    }
    /** Select next option. */
    selectNext() {
        if (this.options.length < 2) {
            return;
        }
        if (this.listIndex < this.options.length - 1) {
            this.listIndex++;
            if (this.listIndex >= this.listOffset + this.getListHeight()) {
                this.listOffset++;
            }
            if (this.options[this.listIndex].disabled) {
                this.selectNext();
            }
        }
        else {
            this.listIndex = this.listOffset = 0;
            if (this.options[this.listIndex].disabled) {
                this.selectNext();
            }
        }
    }
    /** Select previous page. */
    selectPreviousPage() {
        if (this.options?.length) {
            const height = this.getListHeight();
            if (this.listOffset >= height) {
                this.listIndex -= height;
                this.listOffset -= height;
            }
            else if (this.listOffset > 0) {
                this.listIndex -= this.listOffset;
                this.listOffset = 0;
            }
        }
    }
    /** Select next page. */
    selectNextPage() {
        if (this.options?.length) {
            const height = this.getListHeight();
            if (this.listOffset + height + height < this.options.length) {
                this.listIndex += height;
                this.listOffset += height;
            }
            else if (this.listOffset + height < this.options.length) {
                const offset = this.options.length - height;
                this.listIndex += offset - this.listOffset;
                this.listOffset = offset;
            }
        }
    }
}
