import { dim, underline } from "./deps.js";
import { GenericPrompt, } from "./_generic_prompt.js";
/** Toggle prompt representation. */
export class Toggle extends GenericPrompt {
    /** Execute the prompt and show cursor on end. */
    static prompt(options) {
        return new this(options).prompt();
    }
    constructor(options) {
        super();
        Object.defineProperty(this, "settings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof options === "string") {
            options = { message: options };
        }
        this.settings = this.getDefaultSettings(options);
        this.status = typeof this.settings.default !== "undefined"
            ? this.format(this.settings.default)
            : "";
    }
    getDefaultSettings(options) {
        const settings = super.getDefaultSettings(options);
        return {
            ...settings,
            active: options.active || "Yes",
            inactive: options.inactive || "No",
            keys: {
                active: ["right", "y", "j", "s", "o"],
                inactive: ["left", "n"],
                ...(settings.keys ?? {}),
            },
        };
    }
    message() {
        let message = super.message() + " " + this.settings.pointer + " ";
        if (this.status === this.settings.active) {
            message += dim(this.settings.inactive + " / ") +
                underline(this.settings.active);
        }
        else if (this.status === this.settings.inactive) {
            message += underline(this.settings.inactive) +
                dim(" / " + this.settings.active);
        }
        else {
            message += dim(this.settings.inactive + " / " + this.settings.active);
        }
        return message;
    }
    /** Read user input from stdin, handle events and validate user input. */
    read() {
        this.settings.tty.cursorHide();
        return super.read();
    }
    /**
     * Handle user input event.
     * @param event Key event.
     */
    async handleEvent(event) {
        switch (true) {
            case event.sequence === this.settings.inactive[0].toLowerCase():
            case this.isKey(this.settings.keys, "inactive", event):
                this.selectInactive();
                break;
            case event.sequence === this.settings.active[0].toLowerCase():
            case this.isKey(this.settings.keys, "active", event):
                this.selectActive();
                break;
            default:
                await super.handleEvent(event);
        }
    }
    /** Set active. */
    selectActive() {
        this.status = this.settings.active;
    }
    /** Set inactive. */
    selectInactive() {
        this.status = this.settings.inactive;
    }
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    validate(value) {
        return [this.settings.active, this.settings.inactive].indexOf(value) !== -1;
    }
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    transform(value) {
        switch (value) {
            case this.settings.active:
                return true;
            case this.settings.inactive:
                return false;
        }
    }
    /**
     * Format output value.
     * @param value Output value.
     */
    format(value) {
        return value ? this.settings.active : this.settings.inactive;
    }
    /** Get input value. */
    getValue() {
        return this.status;
    }
}
