import type { KeyCode } from "../keycode/key_code.js";
import { GenericPrompt, GenericPromptKeys, GenericPromptOptions, GenericPromptSettings } from "./_generic_prompt.js";
/** Generic prompt options. */
export interface ToggleOptions extends GenericPromptOptions<boolean, string> {
    active?: string;
    inactive?: string;
    keys?: ToggleKeys;
}
/** Toggle prompt settings. */
interface ToggleSettings extends GenericPromptSettings<boolean, string> {
    active: string;
    inactive: string;
    keys: ToggleKeys;
}
/** Toggle key options. */
export interface ToggleKeys extends GenericPromptKeys {
    active?: string[];
    inactive?: string[];
}
/** Toggle prompt representation. */
export declare class Toggle extends GenericPrompt<boolean, string> {
    protected readonly settings: ToggleSettings;
    protected status: string;
    /** Execute the prompt and show cursor on end. */
    static prompt(options: string | ToggleOptions): Promise<boolean>;
    constructor(options: string | ToggleOptions);
    protected getDefaultSettings(options: ToggleOptions): ToggleSettings;
    protected message(): string;
    /** Read user input from stdin, handle events and validate user input. */
    protected read(): Promise<boolean>;
    /**
     * Handle user input event.
     * @param event Key event.
     */
    protected handleEvent(event: KeyCode): Promise<void>;
    /** Set active. */
    protected selectActive(): void;
    /** Set inactive. */
    protected selectInactive(): void;
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    protected validate(value: string): boolean | string;
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    protected transform(value: string): boolean | undefined;
    /**
     * Format output value.
     * @param value Output value.
     */
    protected format(value: boolean): string;
    /** Get input value. */
    protected getValue(): string;
}
export {};
